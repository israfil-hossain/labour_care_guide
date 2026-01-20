import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {MainDrawer} from './mainAppNavigators';
import {AuthStack} from './stackNavigators';
import config from '../config';
import {UI, User} from '../reduxStates';

// Safe import of Splash component
let Splash;
try {
  Splash = require('../screens/splash/Splash').default;
} catch (error) {
  console.warn('Failed to import Splash component:', error);
  Splash = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>Labour Care Guide</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(User.selectIsUserLoggedIn);
  const isSplashLoading = useSelector(UI.selectIsSplashLoading);

  /**
   * To handle the splash show/hide actions
   */
  const handleSplashLoading = useCallback(() => {
    if (isSplashLoading) {
      setTimeout(() => {
        dispatch(UI.saveIsSplashLoading(false));
      }, 1500);
    }
  }, [isSplashLoading, dispatch]);

  useEffect(() => {
    handleSplashLoading();
  }, [handleSplashLoading]);

  const navigationStack = () => {
    if (isSplashLoading) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name={config.routes.SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return isUserLoggedIn ? <MainDrawer /> : <AuthStack />;
  };

  return navigationStack();
};

export default RootNavigation;
