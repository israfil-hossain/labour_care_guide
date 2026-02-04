import 'react-native-gesture-handler';
import '../polyfills';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Slot, useRouter, useSegments, SplashScreen} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import {LCGLoader, LCGToast} from '../src/components';
import {CommonUtils, EnumUtils, ErrorBoundary} from '../src/utils';
import config from '../src/config';
import {QueryProvider} from '../src/providers/QueryProvider';
import useAuthStore from '../src/stores/useAuthStore';
import useUIStore from '../src/stores/useUIStore';
import {store} from '../src/config/store';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initial Layout with Providers
function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();

  const { isAuthenticated } = useAuthStore();
  const { isSplashLoading, changeInternetConnectivityState, saveIsSplashLoading } = useUIStore();

  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Lato-Thin': require('../src/assets/fonts/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('../src/assets/fonts/Lato-ThinItalic.ttf'),
    'Lato-Light': require('../src/assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('../src/assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('../src/assets/fonts/Lato-Regular.ttf'),
    'Lato-Italic': require('../src/assets/fonts/Lato-Italic.ttf'),
    'Lato-Bold': require('../src/assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('../src/assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Black': require('../src/assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('../src/assets/fonts/Lato-BlackItalic.ttf'),
    'lcg': require('../src/assets/fonts/lcg.ttf'),
  });

  // Handle internet connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const {isConnected} = state;
      changeInternetConnectivityState(isConnected);
      if (isConnected === false) {
        CommonUtils.showToast({
          type: EnumUtils.toastTypes.WARNING,
          text2: config.customMessages.MSG_INTERNET_CONNECTION_ERROR,
        });
      }
      return true;
    });
    return () => {
      unsubscribe();
    };
  }, [changeInternetConnectivityState]);

  // Handle splash screen - hide after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      saveIsSplashLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle authentication routing
  useEffect(() => {
    if (isSplashLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth if not logged in
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to app if logged in
      router.replace('/(app)');
    }
  }, [isAuthenticated, segments, isSplashLoading, router]);

  // Handle font loading - hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render until fonts are loaded (after all hooks have been called)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" size={30}/>
      <Slot />
      <LCGToast />
      <LCGLoader />
    </>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryProvider>
          <Provider store={store}>
            <RootLayoutNav />
          </Provider>
        </QueryProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
