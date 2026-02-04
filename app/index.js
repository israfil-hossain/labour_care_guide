import {Redirect} from 'expo-router';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useAuthStore from '../src/stores/useAuthStore';
import useUIStore from '../src/stores/useUIStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  const { isSplashLoading } = useUIStore();

  // Show splash screen while loading
  if (isSplashLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Labour Care Guide</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
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
