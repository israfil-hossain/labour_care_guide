import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import config from "../../../config";
import {
  CreateAccount,
  Login,
  Mobile,
  OTP,
  ProfileSetup,
  AddPatient,
  ForgotPassowrd,
  ResetPassword,
} from "../../../screens";
import { LCGCustomHeader } from "../../../components";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();

  const getCustomHeader = ({ route, isToShowTitle, title }) => {
    return (
      <LCGCustomHeader
        route={route}
        onPressLeftAccessory={() => navigation.goBack()}
        leftAccessoryName={config.iconNames.LEFT_CHEVRON}
        isToShowTitle={isToShowTitle}
        title={title}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={config.routes.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={config.routes.CREATE_ACCOUNT}
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={config.routes.MOBILE}
        component={Mobile}
        options={({ route }) => ({
          header: () => getCustomHeader({ route, isToShowTitle: false }),
        })}
      />
      <Stack.Screen
        name={config.routes.OTP}
        component={OTP}
        options={({ route }) => ({
          header: () => getCustomHeader({ route, isToShowTitle: false }),
        })}
      />
      <Stack.Screen
        name={config.routes.FORGOT_PASSWORD}
        component={ForgotPassowrd}
        options={({ route }) => ({
          header: () => getCustomHeader({ route, isToShowTitle: false }),
        })}
      />
      <Stack.Screen
        name={config.routes.RESET_PASSWORD}
        component={ResetPassword}
        options={({ route }) => ({
          header: () =>
            getCustomHeader({
              route,
              isToShowTitle: true,
              title: config.screenNames.RESET_PASSWORD,
            }),
        })}
      />
      <Stack.Screen
        name={config.routes.PROFILE_SETUP}
        component={ProfileSetup}
        options={({ route }) => ({
          header: () =>
            getCustomHeader({
              route,
              isToShowTitle: true,
              title: config.screenNames.PROFILE_SETUP_SCREEN,
            }),
        })}
      />
      <Stack.Screen
        name={config.routes.ADD_PATIENT}
        component={AddPatient}
        options={({ route }) => ({
          header: () =>
            getCustomHeader({
              route,
              isToShowTitle: true,
              title: config.screenNames.ADD_PATIENT_SCREEN,
            }),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
