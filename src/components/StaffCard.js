/* eslint-disable react/self-closing-comp */
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";

import config from "../config";
import fontFamily from "../config/fontFamily";

const StaffCard = (props) => {
  const { dataStaff, onPress } = props;


  return (
    <Pressable onPress={onPress} style={styles.conatiner}>
      <CardView
        cardElevation={1}
        cardMaxElevation={1}
        cornerRadius={6}
        style={styles.cardView}
      >
        <View style={styles.cardSubView}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailDataView}>
              <Text style={styles.titleText}>{dataStaff?.firstName}</Text>
              <View style={styles.proffesionView}>
                <Text style={styles.professiionText}>{dataStaff?.profession}</Text>
                <Text style={styles.professiionTextInitial}>Initials- {dataStaff?.initials}</Text>
              </View>
              <Text style={styles.docIdLabelText}>
                ID- <Text style={styles.docIdText}>{dataStaff?.staffId}</Text>
              </Text>

              <Pressable
                onPress={() => Linking.openURL(`tel:${dataStaff?.mobile}`)}
                style={styles.callIconConatiner}
              >
                <Text style={styles.onDutyzText}>{dataStaff?.isOnDuty == true ? "On Duty": "Not on Duty"}</Text>

                <Image
                  style={styles.callIcon}
                  source={config.images.CallIcon}
                />
              </Pressable>
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
  cardSubView: {
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  detailDataView: { flex: 1 },
  titleText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 15,
    color: "#25282B",
  },
  proffesionView: { flexDirection: "row" },
  professiionText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
  },
  professiionTextInitial: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
    marginLeft: 30,
  },
  docIdLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
  },
  docIdText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
  },
  callIconConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  onDutyzText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: config.colors.appTheme1,
    marginTop: 5,
  },
  callIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default StaffCard;
