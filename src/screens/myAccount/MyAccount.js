import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View,StyleSheet,TouchableOpacity, Image } from "react-native";

import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";

const MyAccount = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.conatiner}>
     
      <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(config.routes.WARDS_LIST)}
          style={styles.profileOptionsView}
        >
          <View style={styles.profileSubView}>
            <Image
              source={config.images.WardIcon}
              style={styles.profileImageOption}
            />
            <Text style={styles.profileTxtOption}>Wards</Text>
          </View>
          <Image
            source={config.images.RightArrow}
            style={styles.rightArrowImg}
          />
        </TouchableOpacity>

       

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(config.routes.STAFF_LIST)}
          style={styles.profileOptionsView}
        >
          <View style={styles.profileSubView}>
            <Image
              source={config.images.StaffIcon}
              style={styles.profileImageOption}
            />
            <Text style={styles.profileTxtOption}>Staff</Text>
          </View>
          <Image
            source={config.images.RightArrow}
            style={styles.rightArrowImg}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
         // onPress={() => navigation.navigate(config.routes.WARDS_LIST)}
          style={styles.profileOptionsView}
        >
          <View style={styles.profileSubView}>
            <Image
              source={config.images.ExportIcon}
              style={styles.profileImageOption}
            />
            <Text style={styles.profileTxtOption}>Export Data</Text>
          </View>
          <Image
            source={config.images.RightArrow}
            style={styles.rightArrowImg}
          />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: 'E5E5E5',flex:1
  },
  profileOptionsView: {
    paddingVertical: 10,
    backgroundColor: config.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
  },
  profileSubView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageOption: {
    width: 40,
    height: 40,
  },
  profileTxtOption: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginLeft: 20,fontSize:17
  },
  rightArrowImg: {
    width: 18,
    height: 18,
    resizeMode:'contain'
  },
})
