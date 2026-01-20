import {Redirect} from 'expo-router';
import React from 'react';
import {useSelector} from 'react-redux';
import {User, UI} from '../src/reduxStates';
import {View, Text, StyleSheet} from 'react-native';

export default function Index() {
  const isUserLoggedIn = useSelector(User.selectIsUserLoggedIn);
  const isSplashLoading = useSelector(UI.selectIsSplashLoading);

  // Show splash screen while loading
  if (isSplashLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Labour Care Guide</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (isUserLoggedIn) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
