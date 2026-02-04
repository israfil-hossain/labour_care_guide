import { create } from 'zustand';

const useUIStore = create((set) => ({
  // State
  isLoading: false,
  isInternetConnected: false,
  isSplashLoading: true,

  // Actions
  showLoader: (isLoading) => {
    set({ isLoading });
  },

  changeInternetConnectivityState: (isInternetConnected) => {
    set({ isInternetConnected });
  },

  saveIsSplashLoading: (isSplashLoading) => {
    set({ isSplashLoading });
  },

  // Reset for signout
  signOut: () => {
    set({ isLoading: false, isSplashLoading: false });
  },
}));

export default useUIStore;
