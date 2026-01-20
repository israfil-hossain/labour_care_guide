import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";

import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { User, DrugCategoryList, ListDrug } from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const MedicationHistory = ({ navigation, route }) => {
  const [medicationHistory, setMedicationHistory] = useState();



  useEffect(() => {
    if (route?.params?.medHistory) {
      setMedicationHistory(route?.params?.medHistory);
    }
  }, [route?.params?.medHistory]);

  const showNumOfDays = (dateStart, endDate) => {
    var admission = moment(dateStart, "DD-MM-YYYY");
    var discharge = moment(endDate, "DD-MM-YYYY");
    const res = discharge.diff(admission, "days");
    return res;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <View style={styles.historyDetailView}>
            <View style={styles.drugStatusView}>
              <Text style={styles.drugHeadingText}>
                Drug {route?.params?.drugCount}
              </Text>
            </View>

            <View style={styles.labelContentView}>
              <Text style={styles.labelText}>No. of Days:</Text>
              <Text style={styles.contentText}>
                {showNumOfDays(
                  medicationHistory?.startDate,
                  medicationHistory?.endDate
                )}
              </Text>
            </View>

            <View style={styles.labelContentView}>
              <Text style={styles.labelText}>Drug Name:</Text>
              <Text style={styles.contentText}>{medicationHistory?.name}</Text>
            </View>

            <View style={styles.subContainerView}>
              <View style={styles.labelContentView}>
                <Text style={styles.labelText}>Dose:</Text>
                <Text style={styles.contentText}>
                  {medicationHistory?.dose}
                </Text>
              </View>

              <View style={styles.labelContentView}>
                <Text style={styles.labelText}>Frequency:</Text>
                <Text style={styles.contentText}>
                  {medicationHistory?.frequency}
                </Text>
              </View>
            </View>

            <View style={styles.subContainerView}>
              <View style={styles.labelContentView}>
                <Text style={styles.labelText}>Start Date:</Text>
                <Text style={styles.contentText}>
                {medicationHistory?.startDate}
                </Text>
              </View>

              <View style={styles.labelContentView}>
                <Text style={styles.labelText}>End Date:</Text>
                <Text style={styles.contentText}>
                  {medicationHistory?.endDate}
                </Text>
              </View>
            </View>

            <View style={styles.statusView}>
              <Text style={styles.historyText}>History - </Text>
            </View>

            {medicationHistory?.history?.length > 0 &&
              medicationHistory?.history?.map((elemnet, indx) => (
                <>
                  <View style={styles.statusView}>
                    <Text style={styles.statuslabelText}>Status: </Text>
                    <Text style={styles.statusContentText}>
                      {elemnet?.status}
                    </Text>
                  </View>

                  <View style={styles.statusView}>
                    <Text style={styles.statuslabelText}>
                      Last updated at:{" "}
                    </Text>
                    <Text style={styles.statusContentText}>
                      {moment(new Date(elemnet?.updatedAt)).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                </>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  cardContainer: { marginHorizontal: 20 },
  historyDetailView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginVertical: 10,
    elevation: 3,
    backgroundColor: config.colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  drugStatusView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  drugHeadingText: {
    color: config.colors.neutralBlack,
    fontSize: 16,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  statusView: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  statuslabelText: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  statusContentText: {
    color: "#F14D4D",
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    textTransform: "capitalize",
    marginHorizontal: 10,
  },
  labelText: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginRight: 10,
  },
  labelContentView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    flexWrap: "wrap",
    width: "50%",
  },
  contentText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.toastDefault,
  },
  subContainerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nodataFound: {
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  historyText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 15,
  },
});

export default MedicationHistory;
