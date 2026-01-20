// @flow
import React from "react";
import { Text, View, SafeAreaView, Pressable, Image } from "react-native";
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
    title = "",
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

  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);


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
    <SafeAreaView style={styles.layoout}>
      <View style={styles.container}>
        {accessoriesData[0].isToShow ? (
          <Pressable onPress={accessoriesData[0].onPress}>
            <LCGIcon
              name={accessoriesData[0]?.name ?? ""}
              style={accessoriesData[0]?.style}
            />
          </Pressable>
        ) : null}
        <View style={styles.titleWrapper}>
          {ProfileStaffResponse?.data?.instituteLogo == "" ? (
            <Image
              style={styles.hospitalImage}
              source={require("../../assets/images/Image_Palcaholder.png")}
            />
          ) : (
            <Image
              style={styles.hospitalImage}
              source={{uri: ProfileStaffResponse?.data?.instituteLogo }}
            />
          )}
          <Text style={styles.hospitalNameText}>
            {ProfileStaffResponse?.data?.instituteName}
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
