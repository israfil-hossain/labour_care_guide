import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      authToken: null,
      refreshToken: null,
      fcmDeviceToken: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) => {
        console.log('Setting user:', user);
        set({ user, isAuthenticated: !!user });
      },

      setAuthToken: (token) => {
        console.log('Setting auth token');
        set({ authToken: token, isAuthenticated: !!token });
      },

      setRefreshToken: (token) => {
        console.log('Setting refresh token');
        set({ refreshToken: token });
      },

      setFCMToken: (token) => {
        console.log('Setting FCM token');
        set({ fcmDeviceToken: token });
      },

      login: (userData, accessToken, refreshToken) => {
        console.log('User logged in');
        set({
          user: userData,
          authToken: accessToken,
          refreshToken: refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        console.log('User logged out');
        set({
          user: null,
          authToken: null,
          refreshToken: null,
          fcmDeviceToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        set({ user: { ...currentUser, ...userData } });
      },

      // Getters
      getToken: () => get().authToken,
      getRefreshToken: () => get().refreshToken,
      getUser: () => get().user,
      isLoggedIn: () => get().isAuthenticated && !!get().authToken,
    }),
    {
      name: 'auth-storage', // name of the item in the storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
      partialize: (state) => ({
        user: state.user,
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        fcmDeviceToken: state.fcmDeviceToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
