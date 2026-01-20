import React from 'react';
import {Tabs} from 'expo-router';
import {useDispatch} from 'react-redux';
import {LCGBottomTabBar} from '../../../src/components';
import config from '../../../src/config';

// Import SVG icons as components
import HomeIcon from '../../../assets/navicon/home.svg';
import NurseIcon from '../../../assets/navicon/nurse.svg';
import AddIcon from '../../../assets/navicon/add.svg';
import PiechartIcon from '../../../assets/navicon/piechart.svg';
import UserIcon from '../../../assets/navicon/user.svg';

const TabIconComp = (IconComponent, size = 30) => {
  return ({tintColor, color}) => (
    <IconComponent
      width={size}
      height={size}
      fill={tintColor || color || config.colors.appTheme1}
      color={tintColor || color || config.colors.appTheme1}
    />
  );
};

export default function TabLayout() {
  const dispatch = useDispatch();

  const onTabPress = (route, index) => {
    if (route?.name === 'addPatient' && index === 2) {
      dispatch({type: 'clearRegisterPatientForm'});
    }
  };

  return (
    <Tabs
      tabBar={(props) => <LCGBottomTabBar {...props} onTabPress={onTabPress} isTabLabel />}
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: config.screenNames.DASHBOARD_SCREEN,
          tabBarIcon: TabIconComp(HomeIcon, 30),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: config.screenNames.PATIENTS_LIST_SCREEN,
          tabBarIcon: TabIconComp(NurseIcon, 30),
        }}
      />
      <Tabs.Screen
        name="addPatient"
        options={{
          title: config.screenNames.ADD_PATIENT_SCREEN,
          tabBarIcon: TabIconComp(AddIcon, 28),
        }}
      />
      <Tabs.Screen
        name="rounds"
        options={{
          title: config.screenNames.ROUND_SCREEN,
          tabBarIcon: TabIconComp(PiechartIcon, 30),
        }}
      />
      <Tabs.Screen
        name="myAccount"
        options={{
          title: config.screenNames.MY_ACCOUNT_SCREEN,
          tabBarIcon: TabIconComp(UserIcon, 30),
        }}
      />
    </Tabs>
    // <MainBottomTab onTabPress={onTabPress} />
  );
}
