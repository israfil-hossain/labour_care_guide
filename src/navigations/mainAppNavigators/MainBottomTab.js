import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  DashboardStack,
  WardsStack,
  AddPatientStack,
  StaffStack,
  PatientsStack,
  RoundsStack,
  MyAccountStack,
} from "../stackNavigators";
import config from "../../config";
import { LCGIcon, LCGBottomTabBar } from "../../components";

const Tab = createBottomTabNavigator();

const placeholder = () => <View />;

const TabIconComp = (iconName, iconColor) => {
  return <LCGIcon name={iconName} color={iconColor} />;
};

const MainBottomTab = () => {
  const dispatch = useDispatch();

  const isTabbarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? route?.name ?? "";
    if (
      [
        config.routes.DASHBOARD_STACK,
        // config.routes.ADD_PATIENT_STACK,
        config.routes.PATIENTS_LIST_STACK,
        config.routes.DASHBOARD,
        config.routes.PATIENTS_LIST,
        config.routes.ROUND_STACK,
        config.routes.ROUND,
        config.routes.MY_ACCOUNT,
        config.routes.MY_ACCOUNT_STACK,
      ].includes(routeName)
    ) {
      return true;
    }

    return false;
  };

  const onTabPress = (route, index) => {
    if (route?.name === config.routes.REGISTER_PATIENT_STACK && index === 2) {
      dispatch({ type: "clearRegisterPatientForm" });
    }
  };

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <LCGBottomTabBar {...props} onTabPress={onTabPress} isTabLabel />
      )}
      initialRouteName={config.routes.DASHBOARD_STACK}
      screenOptions={{ headerShown: false }}
      backBehavior="none"
    >
      <Tab.Screen
        name={config.routes.DASHBOARD_STACK}
        component={DashboardStack}
        options={({ route }) => ({
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.DASHBOARD_SCREEN,
          tabBarIcon: ({ tintColor }) =>
            TabIconComp(config.iconNames.TAB_HOME, tintColor),
        })}
      />

      <Tab.Screen
        name={config.routes.PATIENTS_LIST_STACK}
        component={PatientsStack}
        options={({ route }) => ({
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.PATIENTS_LIST_SCREEN,
          tabBarIcon: ({ tintColor }) =>
            TabIconComp(config.iconNames.TAB_PATIENT, tintColor),
        })}
      />

      {/* <Tab.Screen
        name={config.routes.WARDS_LIST_STACK}
        component={WardsStack}
        options={({route}) => ({
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.WARDS_LIST_SCREEN,
          tabBarIcon: ({tintColor}) =>
            TabIconComp(config.iconNames.PIE_CHART_2_CUT, tintColor),
        })}
      /> */}
      <Tab.Screen
        name={config.routes.ADD_PATIENT_STACK}
        component={AddPatientStack}
        options={({ route }) => ({
          isSpecialRoundTab: true,
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.ADD_PATIENT_SCREEN,
          tabBarIcon: () =>
            TabIconComp(config.iconNames.ADD, config.colors.white),
        })}
      />
      <Tab.Screen
        name={config.routes.ROUND_STACK}
        component={RoundsStack}
        options={({ route }) => ({
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.ROUND_SCREEN,
          tabBarIcon: ({ tintColor }) =>
            TabIconComp(config.iconNames.PIE_CHART_1_CUT, tintColor),
        })}
      />
      <Tab.Screen
        name={config.routes.MY_ACCOUNT_STACK}
        component={MyAccountStack}
        options={({ route }) => ({
          tabBarVisible: ((subRoute) => isTabbarVisible(subRoute))(route),
          tabBarLabel: config.screenNames.MY_ACCOUNT_SCREEN,
          tabBarIcon: ({ tintColor }) =>
            TabIconComp(config.iconNames.ACCOUNT, tintColor),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
