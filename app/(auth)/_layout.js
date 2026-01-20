import {Stack} from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{headerShown: false}} />
      <Stack.Screen name="mobile" options={{headerShown: false}} />
      <Stack.Screen name="otp" options={{headerShown: false}} />
      <Stack.Screen name="createAccount" options={{headerShown: false}} />
      <Stack.Screen name="forgotPassword" options={{headerShown: false}} />
    </Stack>
  );
}
