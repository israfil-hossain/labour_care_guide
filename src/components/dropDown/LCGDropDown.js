import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import config from "../../config";

const LCGDropDown = ({
  viewStyle,
  listData,
  onSelectValue,
  dropVisible,
  renderContent,
}) => {
  if (dropVisible) {
    return (
      <View style={[styles.containerStyle, viewStyle]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {listData && listData.map((item, index) => renderContent({ item, index }))}
        </ScrollView>
      </View>
    );
  } else return null;
};

export default LCGDropDown;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    height: 180,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 3,
    borderRadius: 6,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    bottom: 10,
    elevation: 3,
  },
  dropListItemView: {
    paddingVertical: 5,
    marginVertical: 5,
  },
  dropListTextStyle: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
});
