/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  Platform,
} from "react-native";
import { styles } from "./DashboardStyles";
import { LCGButton, LCGHomeHeader } from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import WelcomeTag from "../../components/WelcomeTag";
import DashBoardCard from "../../components/DashBoardCard";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  HomeDashBoard,
  FcmTokenSet,
  ProfileStaff,
} from "../../reduxStates";
import Constants from 'expo-constants';
import NotificationService from "../notifications/NotificationService";
import { DrawerActions } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const [dashData, setDashData] = useState([]);
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const dispatch = useDispatch();
  //Selectors
  const HomeData = useSelector(HomeDashBoard.selectDashBoardData);
  const FcmDataResponse = useSelector(FcmTokenSet.selectFcmResponse);
  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);
  const FCMToken = useSelector(User.selectFcmToken);

 

  useEffect(() => {
    if (FCMToken != null) {
      callSetFCMTokenApi();
    }
  }, [FCMToken]);

  useEffect(() => {
    if (FcmDataResponse?.success == true) {
      callProfileStaffApi();
    }
  }, [FcmDataResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callDashBoardApi();
      callProfileStaffApi();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const callDashBoardApi = () => {
    dispatch({
      type: "DASHBOARD",
      payload: "",
    });
  };

  const callProfileStaffApi = () => {
    const payload = {
      uri: `?udid=${Constants.deviceId || Constants.installationId}`,
    };
    dispatch({
      type: "STAFF_PROFILE",
      payload,
    });
  };

  const callSetFCMTokenApi = () => {
    const payload = {
      udid: Constants.deviceId || Constants.installationId,
      deviceType: Platform.OS == "android" ? "ANDROID" : "IOS",
      fcmToken: FCMToken,
    };

    dispatch({
      type: "SET_FCM_TOKEN",
      payload,
    });
  };

  const openDrawer = () => {
    navigation?.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <LCGHomeHeader
        leftAccessoryName={config.iconNames.SIDE_MENU}
        onPressLeftAccessory={openDrawer}
        isToShowTitle={false}
      />
      <WelcomeTag
        userName={`${ProfileStaffResponse?.data?.firstName} ${ProfileStaffResponse?.data?.lastName}`}
      />
      <NotificationService navigation={navigation} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.scrollConatiner}
      >
        <View style={styles.dashCardContainer}>
          <DashBoardCard
            dataimage={""}
            count={HomeData?.data?.labouringPatients}
            title={"Labouring Patients"}
          />
          <DashBoardCard
            dataimage={""}
            count={HomeData?.data?.highRiskPatients}
            title={"High Risk Patients"}
          />
          <DashBoardCard
            dataimage={""}
            count={HomeData?.data?.veginalDeliveries}
            title={"Vaginal Deliveries"}
          />
          <DashBoardCard
            dataimage={""}
            count={HomeData?.data?.surgicalDeliveries}
            title={"Surgical Deliveries"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
