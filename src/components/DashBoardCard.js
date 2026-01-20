/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import CardView from "./CardView";
import fontFamily from "../config/fontFamily";

const { width, height } = Dimensions.get("screen");

const DashBoardCard = (props) => {
  const { dataimage, count, title } = props;
  return (
    <View>
      <CardView
        cardElevation={4}
        cardMaxElevation={4}
        cornerRadius={10}
        style={styles.cardView}
      >
        <View>
          <View style={styles.centerCardView}>
            <Text style={styles.countText}>{count}</Text>
            <Image source={require("../assets/images/dashboard/patientsIcon.png")} style={styles.cardImage} />
          </View>
          <View style={styles.subView}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#fff",
    marginVertical: 12,
    width: width * 0.73,
    padding: 15,
    marginHorizontal: 5, 
  },
  centerCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  countText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontSize: 25,
    letterSpacing: 0.2,
    color: "#FC5285",
    fontWeight: "700",
    fontStyle: "normal",
  },
  subView: {
    marginTop: 12,
  },
  titleText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontSize: 18,
    color: "#25282B",
    fontWeight: "600",
    fontStyle: "normal",
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default DashBoardCard;
