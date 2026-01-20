import 'react-native-gesture-handler';
import '../polyfills';
import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Slot, useRouter, useSegments} from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import {LCGLoader, LCGToast} from '../src/components';
import {UI, User} from '../src/reduxStates';
import {CommonUtils, EnumUtils, ErrorBoundary} from '../src/utils';
import config from '../src/config';

// Initial Layout with Providers
function RootLayoutNav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();

  const isUserLoggedIn = useSelector(User.selectIsUserLoggedIn);
  const isSplashLoading = useSelector(UI.selectIsSplashLoading);

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

  return (
    <>
      <Slot />
      <LCGToast />
      <LCGLoader />
    </>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Provider store={config.store}>
        <RootLayoutNav />
      </Provider>
    </ErrorBoundary>
  );
}
