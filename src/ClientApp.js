import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import config from './config';


const ClientApp = () => {
  return (
    <Provider store={config.store}>
      <App />
    </Provider>
  );
};

export default ClientApp;
