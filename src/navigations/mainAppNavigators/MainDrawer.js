import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottomTab from './MainBottomTab';
import config from '../../config';
import {styles} from '../NavigationsStyles';
import {Drawer} from '../../screens';


const DrawerNav = createDrawerNavigator();

const MainDrawer = () => (
  <DrawerNav.Navigator
    drawerContent={props => <Drawer {...props} />}
    drawerStyle={styles.drawer}
    screenOptions={{headerShown: false,swipeEnabled: false}}
    backBehavior="none"
  >
    <DrawerNav.Screen
      name={config.routes.MAIN_BOTTOM_TAB}
      component={MainBottomTab}
    />
   
  </DrawerNav.Navigator>
);

export default MainDrawer;
