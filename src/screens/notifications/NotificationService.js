import React, { useEffect } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../reduxStates";

// Check if running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Mock notifications for Expo Go compatibility
const MockNotifications = {
  getPermissionsAsync: () => Promise.resolve({ status: 'granted' }),
  requestPermissionsAsync: () => Promise.resolve({ status: 'granted' }),
  getExpoPushTokenAsync: () => Promise.resolve({ data: 'expo-go-mock-token' }),
  setNotificationChannelAsync: () => Promise.resolve(),
  addNotificationReceivedListener: () => ({ remove: () => {} }),
  addNotificationResponseReceivedListener: () => ({ remove: () => {} }),
  AndroidImportance: { MAX: 5 }
};

// Use real notifications only in development builds
let Notifications;
if (isExpoGo) {
  Notifications = MockNotifications;
} else {
  try {
    Notifications = require('expo-notifications');
    // Configure notifications for development builds
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.warn('expo-notifications not available, using mock');
    Notifications = MockNotifications;
  }
}

const NotificationService = ({ navigation }) => {
  const dispatch = useDispatch();

  const getFcmToken = async () => {
    if (!Device.isDevice) {
      console.log("Must use physical device for Push Notifications");
      return;
    }

    if (isExpoGo) {
      console.log("Push notifications not supported in Expo Go. Use development build.");
      // Use a mock token for development
      dispatch(User.saveFCMToken("expo-go-mock-token"));
      return;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);
      dispatch(User.saveFCMToken(token));

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.log("Failed to get push token:", error);
    }
  };

  const requestUserPermission = async () => {
    if (isExpoGo) {
      console.log("Skipping permission request in Expo Go");
      getFcmToken();
      return;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }

      getFcmToken();
    } catch (error) {
      console.log("Permission request failed:", error);
      getFcmToken(); // Still try to get token
    }
  };

  const messageListener = () => {
    if (isExpoGo) {
      console.log("Notification listeners not available in Expo Go");
      return () => {}; // Return empty cleanup function
    }

    try {
      // Listen for notifications received while app is in foreground
      const foregroundSubscription = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("Notification received in foreground:", notification);
          Alert.alert(
            notification?.request?.content?.title || "Notification",
            notification?.request?.content?.body || ""
          );
        }
      );

      // Listen for user interactions with notifications
      const responseSubscription = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log("Notification interaction:", response);
          // navigation?.navigate(config.routes.NOTIFICATION_LIST);
        }
      );

      return () => {
        foregroundSubscription.remove();
        responseSubscription.remove();
      };
    } catch (error) {
      console.log("Failed to set up notification listeners:", error);
      return () => {};
    }
  };

  useEffect(() => {
    const cleanup = messageListener();
    requestUserPermission();

    return cleanup;
  }, []);

  return null;
};

export default NotificationService;
