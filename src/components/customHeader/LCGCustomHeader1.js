/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-use-before-define */
// @flow
import React, { useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from "./LCGCustomHeaderStyles";
import { LCGDivider } from "../divider";
import { LCGIcon } from "../icon";
import config from "../../config";

type CVDHeaderAccessoriesTypes = {
  name?: string,
  style?: Object,
  onPress?: () => void,
  isToShow?: boolean,
};

type LCGCustomHeader1Props = {
  route?: Object,
  title?: string,
  titleLeftAccessory?: Object,
  rightAccessory?: Object,
  titleStyle?: Object,
  isToShowTitle?: boolean,
  isToShowLeftAccessory?: boolean,
  leftAccessoryName?: string,
  leftAccessoryStyle?: Object,
  onPressLeftAccessory?: () => void,
  onPressRightAccessory?: () => void,
  imageComp?: Object,
};

const LCGCustomHeader1 = (props: LCGCustomHeader1Props) => {
  const {
    route,
    title = "",
    leftAccessoryStyle,
    titleStyle,
    isToShowTitle = true,
    isToShowLeftAccessory = true,
    leftAccessoryName = config.iconNames.LEFT_CHEVRON,
    onPressLeftAccessory,
    onPressRightAccessory,
    imageComp = null,
  } = props;

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
      <View style={localStyle.head}>
        <View style={localStyle.headerConatiner}>
          <Pressable onPress={onPressLeftAccessory}>
            <Image
              source={require("../../assets/images/myBackArrow.png")}
              style={localStyle.backArrowImg}
            />
          </Pressable>
        </View>
        <View style={localStyle.container}>
          <Text
            style={[styles.title, titleStyle, { textAlign: "center" }]}
            numberOfLines={1}
          >
            {getTitle()}
          </Text>
        </View>
      </View>
      <LCGDivider />
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  head: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: config.colors.white,
    flexDirection: "row",
    paddingHorizontal: 18,
    alignItems: "center",
    paddingVertical: 18,
  },
  headerConatiner: {
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backArrowImg: { width: 25, height: 25 },
});

export default LCGCustomHeader1;
