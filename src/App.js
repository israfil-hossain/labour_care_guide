/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigations';
import {LCGLoader, LCGToast} from './components';
import {ErrorBoundary} from './utils';

const App = () => {
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
