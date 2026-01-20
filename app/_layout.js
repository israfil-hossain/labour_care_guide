import 'react-native-gesture-handler';
import '../polyfills';
import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Slot, useRouter, useSegments, SplashScreen} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import {LCGLoader, LCGToast} from '../src/components';
import {UI, User} from '../src/reduxStates';
import {CommonUtils, EnumUtils, ErrorBoundary} from '../src/utils';
import config from '../src/config';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initial Layout with Providers
function RootLayoutNav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();

  const isUserLoggedIn = useSelector(User.selectIsUserLoggedIn);
  const isSplashLoading = useSelector(UI.selectIsSplashLoading);

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
      dispatch(UI.changeInternetConnectivityState(isConnected));
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
  }, [dispatch]);

  // Handle splash screen
  useEffect(() => {
    if (isSplashLoading) {
      setTimeout(() => {
        dispatch(UI.saveIsSplashLoading(false));
      }, 1500);
    }
  }, [isSplashLoading, dispatch]);

  // Handle authentication routing
  useEffect(() => {
    if (isSplashLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isUserLoggedIn && !inAuthGroup) {
      // Redirect to auth if not logged in
      router.replace('/(auth)/login');
    } else if (isUserLoggedIn && inAuthGroup) {
      // Redirect to app if logged in
      router.replace('/(app)');
    }
  }, [isUserLoggedIn, segments, isSplashLoading, router]);

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
        <Provider store={config.store}>
          <RootLayoutNav />
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
