import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotron} from '../../reactotron-config';
import * as ReduxStates from '../reduxStates';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['user'], // persisted reducers
};

/* boolean if environment is dev then true otherwise false */
const isDevEnvironment = process.env.NODE_ENV !== 'production';

/* configuring store with reducer, middleware, devTools enable and enhancers */
const store = configureStore({
  reducer: persistReducer(persistConfig, ReduxStates.reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: isDevEnvironment,
  // Redux Toolkit 2.x requires enhancers to be a callback function
  enhancers: (getDefaultEnhancers) => {
    const enhancers = getDefaultEnhancers();
    if (isDevEnvironment && reactotron && typeof reactotron.createEnhancer === 'function') {
      return enhancers.concat(reactotron.createEnhancer());
    }
    return enhancers;
  },
});

const persistor = persistStore(store);

export {persistor, store};
