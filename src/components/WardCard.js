import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

import fontFamily from "../config/fontFamily";
import config from "../config";

const WardCard = (props) => {
  const { title, count, navigation, idWard, onPressOption } = props;

  return (
    <Pressable onPress={onPressOption} style={styles.conatiner}>
      <CardView
        cardElevation={1}
        cardMaxElevation={1}
        cornerRadius={6}
        style={styles.cardView}
      >
        <View style={styles.subConatiner}>
          <View style={styles.wardCardView}>
            <View>
              <Text style={styles.cardTitleText}>{title}</Text>
              <Text style={styles.numPateintText}>
                No. of Patients: {count}
              </Text>
            </View>
          </View>
        </View>
      </CardView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  cardView: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingTop: 12,
    paddingBottom: 13,
    paddingHorizontal: 10,
  },
  subConatiner: {
    flexDirection: "row",
  },
  wardCardView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  cardTitleText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 15,
    color: "#25282B",
  },
  numPateintText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
  },
});

export default WardCard;
