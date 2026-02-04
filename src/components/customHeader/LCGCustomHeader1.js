/* eslint-disable import/no-dynamic-require */
// @flow
import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./LCGCustomHeaderStyles";
import { LCGDivider } from "../divider";
import config from "../../config";

type LCGCustomHeader1Props = {
  route?: Object,
  title?: string,
  titleStyle?: Object,
  isToShowTitle?: boolean,
  isToShowLeftAccessory?: boolean,
  leftAccessoryName?: string,
  leftAccessoryStyle?: Object,
  onPressLeftAccessory?: () => void,
};

const LCGCustomHeader1 = (props: LCGCustomHeader1Props) => {
  const navigation = useNavigation(); // ✅ fallback navigation

  const {
    route,
    title = "",
    titleStyle,
    isToShowTitle = true,
    isToShowLeftAccessory = true,
    onPressLeftAccessory,
  } = props;

  const handleBackPress = () => {
      navigation.goBack();
  };

  const getTitle = () => {
    if (!isToShowTitle) return "";
    if (title) return title;
    if (route?.name) return route.name;
    return "";
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.layoout}>
      <View style={localStyle.head}>
        {isToShowLeftAccessory && (
          <Pressable onPress={handleBackPress}>
            <Image
              source={require("../../assets/images/myBackArrow.png")}
              style={localStyle.backArrowImg}
            />
          </Pressable>
        )}

        <View style={localStyle.container}>
          <Text
            style={[styles.title, titleStyle]}
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
    alignItems: "center",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: config.colors.white,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  backArrowImg: {
    width: 25,
    height: 25,
  },
});

export default LCGCustomHeader1;
