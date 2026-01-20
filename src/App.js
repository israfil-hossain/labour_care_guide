/* eslint-disable import/no-extraneous-dependencies */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import RootNavigator from './navigations';
import {LCGLoader, LCGToast} from './components';
import {UI} from './reduxStates';
import {CommonUtils, EnumUtils, ErrorBoundary} from './utils';
import config from './config';

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <RootNavigator />
        <LCGToast />
        <LCGLoader />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
