import CardView from "../../components/CardView";/* eslint-disable react/self-closing-comp */
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";


import fontFamily from "../../config/fontFamily";
import WardCard from "../../components/WardCard";
import StaffCard from "../../components/StaffCard";
import config from "../../config";
const { width, height } = Dimensions.get("screen");

const StaffDetail = ({ navigation, route }) => {
  const detail = route?.params?.staffDetail;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainerView}
        >
          <View style={styles.headingCardView}>
            <View style={styles.headingSubView}>
              <View style={styles.headerContentView}>
                <View style={styles.headerContentSubView}>
                  <Text
                    style={styles.docNameText}
                  >{`${detail?.firstName} ${detail?.middleName} ${detail?.lastName  }`}</Text>

                  <View style={styles.docIDStatusView}>
                    

                    <Text style={styles.onDutyText}>
                      {detail?.isOnDuty == true ? "On Duty" : "Not on Duty"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <CardView
              cardElevation={1}
              cardMaxElevation={1}
              cornerRadius={6}
              style={styles.detailsCardView}
            >
              <View>
                <View style={styles.detailsSubContainer}>
                  <View style={styles.detailsView}>
                    <Text style={styles.detailLabelText}>Email:</Text>
                  </View>
                  <View style={styles.detailContentView}>
                    <Text style={styles.detailDataText}>{detail?.email}</Text>
                  </View>
                </View>

                <View style={styles.detailsSubContainer}>
                  <View style={styles.detailsView}>
                    <Text style={styles.detailLabelText}>Phone No.:</Text>
                  </View>
                  <View style={styles.detailContentView}>
                    <Text style={styles.detailDataText}>{detail?.mobile}</Text>
                  </View>
                </View>

                <View style={styles.detailsSubContainer}>
                  <View style={styles.detailsView}>
                    <Text style={styles.detailLabelText}>Profession:</Text>
                  </View>
                  <View style={styles.detailContentView}>
                    <Text style={[styles.detailDataText,{textTransform: "capitalize",}]}>
                      {detail?.profession}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsSubContainer}>
                  <View style={styles.detailsView}>
                    <Text style={styles.detailLabelText}>Institution :</Text>
                  </View>
                  <View style={styles.detailContentView}>
                    <Text style={styles.detailDataText}>
                      {detail?.instituteName}
                    </Text>
                  </View>
                </View>
              </View>
            </CardView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  scrollContainerView: {
    flex: 1,
  },
  headingCardView: {
    flex: 1,
    marginTop: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFEDF3",
  },
  headingSubView: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
  },
  headerContentView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContentSubView: { flex: 1 },
  docNameText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 15,
    color: "#25282B",
  },
  docIDStatusView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  docIdText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
  },
  docIdContent: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
  },
  onDutyText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: config.colors.appTheme1,
  },
  detailsCardView: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingBottom: 13,
    paddingHorizontal: 14,
  },
  detailsSubContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  detailsView: {
    flex: 3,
  },
  detailLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#25282B",
  },
  detailContentView: {
    flex: 6,
  },
  detailDataText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#ABAFB7",
    
  },
});

export default StaffDetail;
