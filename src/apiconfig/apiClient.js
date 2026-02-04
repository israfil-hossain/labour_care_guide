import environment from "../config/environments/env.json";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  constructor() {
    this.baseURL = environment?.API_URL || "http://localhost:8000/api";
    this.refreshTokenPromise = null;
    this.authStore = null;
  }

  // Set auth store reference for token management
  setAuthStore(store) {
    this.authStore = store;
  }

  getHeaders(token, isFormData = false) {
    const headers = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "*/*";
    }

    // Add client type header for all requests
    headers["x-client-type"] = "mobile";

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async refreshAccessToken() {
    // Prevent multiple refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = this.authStore?.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-client-type": "mobile",

          },
          body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Token refresh failed");
        }

        // Update tokens in store
        if (this.authStore && data.data) {
          const { accessToken, refreshToken: newRefreshToken, user } = data.data;
          this.authStore.login(user, accessToken, newRefreshToken);
        }

        return data.data.accessToken;
      } catch (error) {
        // Clear auth on refresh failure
        if (this.authStore) {
          this.authStore.logout();
        }
        throw error;
      } finally {
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  async request(endpoint, options = {}) {
    const { token, isFormData, skipAuth = false, ...fetchOptions } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(token, isFormData);

    console.log(`API ${fetchOptions.method || "GET"} ${url}`);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers,
        },
      });

      const responseData = await response.json().catch(() => ({}));

      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && !skipAuth && this.authStore) {
        console.log("Token expired, attempting refresh...");

        try {
          const newAccessToken = await this.refreshAccessToken();

          // Retry the original request with new token
          const retryHeaders = this.getHeaders(newAccessToken, isFormData);
          const retryResponse = await fetch(url, {
            ...fetchOptions,
            headers: {
              ...retryHeaders,
              ...fetchOptions.headers,
            },
          });

          const retryData = await retryResponse.json().catch(() => ({}));

          if (!retryResponse.ok) {
            throw new ApiError(
              retryData.message || `Request failed with status ${retryResponse.status}`,
              retryResponse.status,
              retryData
            );
          }

          return retryData;
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          throw new ApiError(
            "Session expired. Please login again.",
            401,
            responseData
          );
        }
      }

      if (!response.ok) {
        // Only log server errors (5xx) as errors, client errors (4xx) are expected
        const isServerError = response.status >= 500;
        const logMethod = isServerError ? console.error : console.log;

        if (isServerError || __DEV__) {
          logMethod(`API ${response.status}:`, responseData.message || responseData);
        }

        throw new ApiError(
          responseData.message || `Request failed with status ${response.status}`,
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      // Only log network errors in development
      if (__DEV__) {
        console.log("Network Error:", error.message);
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0,
        { error: error.message }
      );
    }
  }

  async get(endpoint, token) {
    return this.request(endpoint, { method: "GET", token });
  }

  async post(endpoint, data, token, isFormData = false) {
    return this.request(endpoint, {
      method: "POST",
      body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
      token,
      isFormData,
    });
  }

  async put(endpoint, data, token, isFormData = false) {
    return this.request(endpoint, {
      method: "PUT",
      body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
      token,
      isFormData,
    });
  }

  async delete(endpoint, token) {
    return this.request(endpoint, { method: "DELETE", token });
  }
}

export const apiClient = new ApiClient();
