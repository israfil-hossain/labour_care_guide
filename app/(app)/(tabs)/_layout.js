import React from 'react';
import {Image} from 'react-native';
import {Tabs} from 'expo-router';
import {useDispatch} from 'react-redux';
import {LCGBottomTabBar} from '../../../src/components';
import config from '../../../src/config';

const navIcons = {
  home: require('../../../assets/navicon/home.png'),
  nurse: require('../../../assets/navicon/nurse.png'),
  add: require('../../../assets/navicon/add.png'),
  piechart: require('../../../assets/navicon/piechart.png'),
  user: require('../../../assets/navicon/user.png'),
};

const TabIconComp = (iconSource, tintColor, size = 20) => {
  return (
    <Image
      source={iconSource}
      style={{width: size, height: size, tintColor}}
      resizeMode="contain"
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
          tabBarIcon: ({color}) => TabIconComp(navIcons.home, color),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: config.screenNames.PATIENTS_LIST_SCREEN,
          tabBarIcon: ({color}) => TabIconComp(navIcons.nurse, color),
        }}
      />
      <Tabs.Screen
        name="addPatient"
        options={{
          title: config.screenNames.ADD_PATIENT_SCREEN,
          tabBarIcon: () => TabIconComp(navIcons.add, null, 24),
        }}
      />
      <Tabs.Screen
        name="rounds"
        options={{
          title: config.screenNames.ROUND_SCREEN,
          tabBarIcon: ({color}) => TabIconComp(navIcons.piechart, color),
        }}
      />
      <Tabs.Screen
        name="myAccount"
        options={{
          title: config.screenNames.MY_ACCOUNT_SCREEN,
          tabBarIcon: ({color}) => TabIconComp(navIcons.user, color),
        }}
      />
    </Tabs>
  );
}
