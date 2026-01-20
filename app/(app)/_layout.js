import React from 'react';
import {Drawer} from 'expo-router/drawer';
import {styles} from '../../src/navigations/NavigationsStyles';
import {Drawer as DrawerContent} from '../../src/screens';

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: styles.drawer,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: 'Home',
        }}
      />
    </Drawer>
  );
}
