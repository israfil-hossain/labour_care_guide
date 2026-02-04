/* eslint-disable import/no-extraneous-dependencies */
// @flow
import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  LCGDrawerHeader,
  LCGDrawerCell,
  LCGDrawerFooter,
} from "../../components";
import { styles } from "./DrawerStyles";
// import {drawerCellAction} from './SideDrawerActions';
import config from "../../config";
import { User, DutyStatus, NotfStatus, ProfileStaff } from "../../reduxStates";
import Constants from 'expo-constants';
import { useLogout } from "../../hooks/useAuth";

const DrawerContent = (
  props
) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [status, setStatus] = React.useState(false);
  const [notfStatus, setNotfStatus] = React.useState(true);

  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);
  const { mutate: logout } = useLogout();


  React.useEffect(() => {
    if (ProfileStaffResponse?.success == true) {
      setNotfStatus(ProfileStaffResponse?.data?.isNotificationOn);
      setStatus(ProfileStaffResponse?.data?.isOnDuty);
    }
  }, [ProfileStaffResponse]);

  /**
   * This function will be called when user tap on logout and it will call api for logging out
   */
  const onDotIconPress = () => {
    // logic for logging out user from app
    props.navigation.closeDrawer();
  };

  const onLogoutPress = () => {
    props.navigation.closeDrawer();
    logout();
  };

  const callDutyStatusToggleApi = () => {
    setStatus(!status);
    dispatch({
      type: "TOGGLE_DUTY_STATUS",
      payload: "",
    });
  };

  const callNotfStatusToggleApi = () => {
    setNotfStatus(!notfStatus);
    const idDevice = Constants.deviceId || Constants.installationId;
    const payload = {
      uri: idDevice,
    };
    dispatch({
      type: "NOTIFICATION_STATUS",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.layout}>
      <LCGDrawerHeader onIconPress={onDotIconPress} title={"Appolo Hospital"}/>
      <DrawerContentScrollView
        {...props}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
      >
        <LCGDrawerCell
          key={"1"}
          title={ProfileStaffResponse?.data?.instituteName}
          logo={ProfileStaffResponse?.data?.instituteLogo}
          index={"0"}
          onPressCell={() => {}}
          menuIconPress={() => {}}
          isMenuIconVisible={false}
        />

        <View style={styles.dutyStausView}>
          <Text style={styles.dutStatusText}>
            {config.strings.OTHERS.DUTY_STATUS}
          </Text>
          <View style={styles.toggleSubView}>
            <Text style={styles.offText}>{config.strings.OTHERS.OFF}</Text>
            <TouchableOpacity onPress={() => callDutyStatusToggleApi()}>
              <Image
                source={
                  status == true
                    ? require("../../assets/images/Greenon.png")
                    : require("../../assets/images/GreenOff.png")
                }
                style={styles.toggleImage}
              />
            </TouchableOpacity>
            <Text style={styles.onText}>{config.strings.OTHERS.ON}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/(app)/profile');
          }}
          style={styles.drawaerOptionContainer}
        >
          <View style={styles.toggleSubView}>
            <View>
              <Image
                source={require("../../assets/images/profileAcc.png")}
                style={styles.drawerOptionsImage}
              />
            </View>
            <Text style={styles.drawerOptionText}>
              {config.strings.OTHERS.PROFILE_SETTINGS}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/images/RightArrow.png")}
              style={styles.rightArrowImage}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/(app)/changePassword');
          }}
          style={styles.drawaerOptionContainer}
        >
          <View style={styles.toggleSubView}>
            <View>
              <Image
                source={require("../../assets/images/passwordchange.png")}
                style={styles.drawerOptionsImage}
              />
            </View>
            <Text style={styles.drawerOptionText}>
              {config.strings.OTHERS.CHANGE_PASSWORD}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/images/RightArrow.png")}
              style={styles.rightArrowImage}
            />
          </View>
        </TouchableOpacity>

        <Pressable
          onPress={() => callNotfStatusToggleApi()}
          style={styles.drawaerOptionContainer}
        >
          <View style={styles.toggleSubView}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/pinknotification.png")}
                style={styles.drawerOptionsImage}
              />
            </TouchableOpacity>
            <Text style={styles.drawerOptionText}>
              {config.strings.OTHERS.NOTIFICATION}
            </Text>
          </View>
          <View>
            <Image
              source={
                notfStatus == true
                  ? require("../../assets/images/Pinkon.png")
                  : require("../../assets/images/Pinkoff.png")
              }
              style={styles.toggleImage}
            />
          </View>
        </Pressable>

        <TouchableOpacity
          onPress={() => onLogoutPress()}
          style={styles.drawaerOptionContainer}
        >
          <View style={styles.toggleSubView}>
            <View>
              <Image
                source={require("../../assets/images/logout.png")}
                style={{ ...styles.drawerOptionsImage, marginLeft: 2 }}
              />
            </View>
            <Text style={styles.drawerOptionText}>
              {config.strings.OTHERS.LOGOUT}
            </Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <LCGDrawerFooter />
    </SafeAreaView>
  );
};

export default DrawerContent;
