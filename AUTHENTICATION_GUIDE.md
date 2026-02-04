# Authentication System Guide

## Overview

This application uses a professional authentication system with:

- **Automatic Token Refresh**: Tokens are automatically refreshed on 401 errors
- **State Management**: Zustand with AsyncStorage persistence + Redux sync
- **API State**: React Query for caching and optimistic updates
- **Type Safety**: Full TypeScript support (if enabled)

## Architecture

```
┌─────────────────┐
│   Components    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  Auth Hooks     │◄────►│ Zustand Store│
│  (useAuth.js)   │      │ (Persistent)  │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  React Query    │◄────►│  apiClient   │
│  (useCommon*)   │      │ (Auto Refresh)│
└─────────────────┘      └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │  Backend API │
                         └──────────────┘
```

## Available Hooks

### Authentication

#### `useLogin()`
Login user with email and password.

```javascript
import { useLogin } from '../hooks/useAuth';

function LoginScreen() {
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = () => {
    login({
      email: 'user@example.com',
      password: 'password123'
    });
  };

  return (
    <LCGButton
      onPress={handleLogin}
      disabled={isPending}
      buttonText={isPending ? 'Logging in...' : 'Login'}
    />
  );
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "suprime_admin",
      "avatar": "https://...",
      "isActive": true
    }
  }
}
```

---

#### `useLogout()`
Logout user and clear all auth state.

```javascript
import { useLogout } from '../hooks/useAuth';

function ProfileScreen() {
  const { mutate: logout } = useLogout();

  return (
    <LCGButton
      onPress={() => logout()}
      buttonText="Logout"
    />
  );
}
```

---

#### `useProfile()`
Get authenticated user profile (auto-refreshes every 5 minutes).

```javascript
import { useProfile } from '../hooks/useAuth';

function ProfileScreen() {
  const { data: profile, isLoading, error, refetch } = useProfile();

  if (isLoading) return <LCGLoader />;
  if (error) return <Text>Error loading profile</Text>;

  return (
    <View>
      <Text>Name: {profile?.data?.user?.name}</Text>
      <Text>Email: {profile?.data?.user?.email}</Text>
      <Text>Role: {profile?.data?.user?.role}</Text>
      <LCGButton onPress={() => refetch()} buttonText="Refresh" />
    </View>
  );
}
```

---

#### `useRefreshToken()`
Manually refresh access token (automatically handled by apiClient).

```javascript
import { useRefreshToken } from '../hooks/useAuth';

function App() {
  const { mutate: refreshToken } = useRefreshToken();
  const { getRefreshToken } = useAuthStore();

  const handleManualRefresh = () => {
    const token = getRefreshToken();
    refreshToken({ refreshToken: token });
  };

  // Usually you don't need this - automatic refresh happens on 401
}
```

---

### Password Management

#### `useForgotPassword()`
Send password reset email.

```javascript
import { useForgotPassword } from '../hooks/useAuth';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = () => {
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          // Show success modal or navigate to reset screen
          navigation.navigate('ResetPassword', { email });
        }
      }
    );
  };

  return (
    <LCGButton
      onPress={handleSubmit}
      disabled={isPending}
      buttonText="Send Reset Link"
    />
  );
}
```

---

#### `useValidateResetToken(token)`
Validate password reset token.

```javascript
import { useValidateResetToken } from '../hooks/useAuth';

function ResetPasswordScreen({ route }) {
  const { token } = route.params;
  const { data, isLoading, error } = useValidateResetToken(token);

  if (isLoading) return <LCGLoader />;
  if (error) return <Text>Invalid or expired token</Text>;

  return <ResetPasswordForm />;
}
```

---

#### `useResetPassword()`
Reset password with token.

```javascript
import { useResetPassword } from '../hooks/useAuth';

function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = () => {
    resetPassword(
      {
        password,
        confirmPassword
      },
      {
        onSuccess: () => {
          navigation.navigate('Login');
        }
      }
    );
  };

  return (
    <LCGButton
      onPress={handleSubmit}
      disabled={isPending}
      buttonText="Reset Password"
    />
  );
}
```

---

#### `useChangePassword()`
Change password for authenticated user.

```javascript
import { useChangePassword } from '../hooks/useAuth';

function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: changePassword, isPending } = useChangePassword();

  const handleSubmit = () => {
    changePassword(
      {
        currentPassword,
        password: newPassword,
        confirmPassword
      },
      {
        onSuccess: () => {
          navigation.goBack();
        }
      }
    );
  };

  return (
    <LCGButton
      onPress={handleSubmit}
      disabled={isPending}
      buttonText="Change Password"
    />
  );
}
```

---

## State Management

### Zustand Store (useAuthStore)

The auth store is persisted to AsyncStorage automatically.

```javascript
import useAuthStore from '../stores/useAuthStore';

function Component() {
  const {
    user,              // Current user object
    authToken,         // Access token
    refreshToken,      // Refresh token
    isAuthenticated,   // Boolean auth status
    login,             // Login function
    logout,            // Logout function
    getToken,          // Get access token
    getRefreshToken,   // Get refresh token
    updateUser         // Update user data
  } = useAuthStore();

  return (
    <View>
      <Text>User: {user?.name}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
    </View>
  );
}
```

---

## API Client Features

### Automatic Token Refresh

The apiClient automatically:
1. Detects 401 Unauthorized responses
2. Attempts to refresh the access token
3. Retries the original request with new token
4. Logs out user if refresh fails

```javascript
// This happens automatically - no code needed!
// When a request returns 401:
// 1. apiClient calls /auth/refresh-token
// 2. Updates tokens in Zustand store
// 3. Retries original request
// 4. Returns response or throws error
```

### Request Interceptors

All authenticated requests automatically include the `Authorization` header:

```javascript
// Automatically added to all requests where requiresAuth: true
headers: {
  'Authorization': 'Bearer eyJhbGc...'
}
```

---

## Error Handling

### API Errors

```javascript
const { mutate: login, error } = useLogin();

// Error object structure:
{
  name: 'ApiError',
  message: 'Invalid credentials',
  status: 400,
  data: { /* response data */ }
}
```

### Network Errors

```javascript
{
  name: 'ApiError',
  message: 'Network request failed',
  status: 0,
  data: { error: 'Network request failed' }
}
```

### Custom Error Handling

```javascript
const { mutate: login } = useLogin();

login(
  { email, password },
  {
    onError: (error) => {
      if (error.status === 401) {
        Alert.alert('Invalid credentials');
      } else if (error.status === 0) {
        Alert.alert('Network error', 'Please check your connection');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  }
);
```

---

## Configuration

### API Base URL

Set in `src/config/environments/env.json`:

```json
{
  "API_URL": "http://192.168.1.169:8000/api"
}
```

For production, update to your production API URL.

### Token Expiration

Tokens are automatically refreshed. Configure timeouts in your backend:
- Access Token: 15 minutes (recommended)
- Refresh Token: 7 days (recommended)

---

## Best Practices

### 1. Always Check Loading State

```javascript
const { data, isLoading } = useProfile();

if (isLoading) return <LCGLoader />;
```

### 2. Handle Errors Gracefully

```javascript
const { mutate: login } = useLogin();

login(
  credentials,
  {
    onError: (error) => {
      // Show user-friendly error message
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message
      });
    }
  }
);
```

### 3. Use Optimistic Updates

```javascript
const { mutate: updateProfile } = useUpdateProfile();
const queryClient = useQueryClient();

updateProfile(
  newData,
  {
    onMutate: async (newData) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries(['profile']);

      // Snapshot previous value
      const previous = queryClient.getQueryData(['profile']);

      // Optimistically update
      queryClient.setQueryData(['profile'], (old) => ({
        ...old,
        data: { ...old.data, ...newData }
      }));

      return { previous };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(['profile'], context.previous);
    }
  }
);
```

### 4. Disable Buttons During Mutations

```javascript
const { mutate: login, isPending } = useLogin();

<LCGButton
  onPress={handleLogin}
  disabled={isPending}
  buttonText={isPending ? 'Loading...' : 'Login'}
/>
```

---

## Troubleshooting

### "Session expired" Error
- **Cause**: Refresh token expired or invalid
- **Solution**: User needs to login again

### Network Request Failed
- **Cause**: Backend not reachable
- **Solution**: Check API_URL in env.json, ensure backend is running

### Token Not Being Sent
- **Cause**: `requiresAuth: false` in hook options
- **Solution**: Remove or set to `true` for authenticated endpoints

### Profile Not Loading
- **Cause**: Not authenticated or token expired
- **Solution**: Check `isAuthenticated` state, re-login if needed

---

## Migration from Redux-Saga

The new system replaces:
- ✅ Redux-Saga → React Query
- ✅ Redux state → Zustand (with Redux sync)
- ✅ Manual token handling → Automatic refresh
- ✅ API service → apiClient with interceptors

Old code still works due to Redux sync, but use new hooks for new features.

---

## API Endpoints Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/login` | POST | No | Login user |
| `/auth/logout` | POST | Yes | Logout user |
| `/auth/profile` | GET | Yes | Get user profile |
| `/auth/refresh-token` | POST | No | Refresh access token |
| `/auth/forgot-password` | POST | No | Send reset email |
| `/auth/reset-password/validate` | GET | No | Validate reset token |
| `/auth/reset-password` | POST | No | Reset password |
| `/auth/change-password` | POST | Yes | Change password |

---

## Support

For issues or questions:
1. Check this guide
2. Review `src/hooks/useAuth.js` documentation
3. Check `src/apiconfig/apiClient.js` for API logic
4. Review React Query documentation for advanced usage
