import React from 'react';
import {Drawer} from 'expo-router/drawer';
import {styles} from '../../src/navigations/NavigationsStyles';
import {Drawer as DrawerContent} from '../../src/screens';
import { MainDrawer } from '../../src/navigations/mainAppNavigators';

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerStyle: styles.drawer,
      }}
    >
       <MainDrawer/>
    </Drawer>
   
  );
}
