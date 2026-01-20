// @flow
import React from "react";
import { Text, View, Pressable, Image } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import MenuIcon from '../../assets/icons/menu.svg';
import { styles } from "./LCGCustomHeaderStyles";
import { LCGDivider } from "../divider";
import { LCGIcon } from "../icon";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  HomeDashBoard,
  FcmTokenSet,
  ProfileStaff,
} from "../../reduxStates";

type CVDHeaderAccessoriesTypes = {
  name?: string,
  style?: Object,
  onPress?: () => void,
  isToShow?: boolean,
};

type LCGHomeHeaderProps = {
  route?: Object,
  title?: string,
  titleLeftAccessory?: Function,
  rightAccessory?: Function,
  titleStyle?: Object,
  isToShowTitle?: boolean,
  isToShowLeftAccessory?: boolean,
  isAddPatients?: boolean,
  leftAccessoryName?: string,
  leftAccessoryStyle?: Object,
  onPressLeftAccessory?: () => void,
  onPressAddPatient?: () => void,
  onPressRightAccessory?: () => void,
};

const LCGHomeHeader = (props: LCGHomeHeaderProps) => {
  const {
    route,
    title = "Appolo Hospital",
    titleLeftAccessory,
    leftAccessoryStyle,
    rightAccessory,
    titleStyle,
    isToShowTitle = true,
    isToShowLeftAccessory = true,
    isAddPatients = true,
    leftAccessoryName = config.iconNames.LEFT_CHEVRON,
    onPressLeftAccessory,
    onPressAddPatient,
    onPressRightAccessory,
  } = props;

  const navigation = useNavigation();
  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);

  const handleDrawerToggle = () => {
    if (onPressLeftAccessory) {
      onPressLeftAccessory();
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  };


  const accessoriesData: CVDHeaderAccessoriesTypes[] = [
    {
      name: leftAccessoryName || config.iconsNames.CHEVRON_THIN_LEFT,
      style: [styles.leftAccessory, leftAccessoryStyle],
      onPress: () => {
        if (isToShowLeftAccessory && onPressLeftAccessory) {
          onPressLeftAccessory();
        }
      },
      isToShow: isToShowLeftAccessory,
    },
  ];

  const getTitle = () => {
    if (isToShowTitle) {
      if (title && title !== "") {
        return title;
      }
      if (route?.name && route.name !== "") {
        return route.name;
      }
    }
    return "";
  };

  return (
    <SafeAreaView edges={['top']} style={styles.layoout}>
      <View style={styles.container}>
        {accessoriesData[0].isToShow ? (
          <Pressable onPress={handleDrawerToggle} style={styles.menuButton}>
            <MenuIcon width={24} height={24} fill={config.colors.appTheme2} />
          </Pressable>
        ) : null}
        <View style={styles.titleWrapper}>
          {!ProfileStaffResponse?.data?.instituteLogo ? (
            <Image
              style={styles.hospitalImage}
              source={require("../../assets/images/appLogo/appLogo.png")}
            />
          ) : (
            <Image
              style={styles.hospitalImage}
              source={{uri: ProfileStaffResponse?.data?.instituteLogo }}
            />
          )}
          <Text style={styles.hospitalNameText}>
            {ProfileStaffResponse?.data?.instituteName || "Appolo Hospital"}
          </Text>
          {/* <View style={styles.titleLeftAccessoryContainer}>
            {titleLeftAccessory?.({
              imageStyle: styles.titleLeftImage,
              iconStyle: styles.titleLeftIcon,
            })}
          </View>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {getTitle()}
          </Text> */}
        </View>
        <View
          style={[styles.rightAccessoryContainer, { flexDirection: "row" }]}
        >
          <Pressable onPress={onPressRightAccessory}>
            <Image
              style={styles.notImage}
              source={require("../../assets/images/notificationIcon.png")}
            />
          </Pressable>
        </View>
      </View>
      <LCGDivider />
    </SafeAreaView>
  );
};

export default LCGHomeHeader;
