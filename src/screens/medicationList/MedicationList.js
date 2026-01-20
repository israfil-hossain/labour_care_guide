import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import {
  User,
  DrugCategoryList,
  ListDrug,
  DrugStatus,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { saveDrugStatus } from "../../reduxStates/ToggleDrugStatus";

const STARTED = "started";
const HOLD = "holded";
const STOPEED = "stopped";

const MedicationList = ({ navigation, route }) => {
  const [drugList, setDrugList] = useState([]);
  const [drugStatus, setDrugStatus] = useState("");

  const dispatch = useDispatch();
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  //Selectors
  const DrugListResponse = useSelector(ListDrug.selectDrugList);
  const DrugStatusResponse = useSelector(DrugStatus.selectDrugStatus);

  useEffect(() => {
    if (DrugStatusResponse?.success == true) {
      callDrugListApi();
      showToast({
        type: toastTypes.SUCCESS,
        text2: DrugStatusResponse?.message,
      });
    }
  }, [DrugStatusResponse]);

  useEffect(() => {
    if (DrugListResponse?.success == true) {
      setDrugList(DrugListResponse?.data);
    }
  }, [DrugListResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callDrugListApi();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(saveDrugStatus(null));
    };
  }, [navigation]);

  const listHeaderComponent = () => {
    return drugList?.length > 0 ? (
      <>
        <View style={styles.headingStyle}>
          <Text style={styles.headingText}></Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headingBtn}
            onPress={() =>
              navigation.navigate(config.routes.DRUG_LIST, {
                patId: route?.params?.patId,
              })
            }
          >
            <Text style={styles.headingbtnText}>
              {config.strings.BTN_TEXTS.ADD_DRUG}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    ) : null;
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.drugCard}>
          <Text style={styles.cardDrugText}>Drug {index + 1}</Text>

          <View style={styles.btnStyle}>
            {item?.status != STOPEED && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.stopBtn}
                onPress={() =>
                  callToggleDrugStatusApi(
                    route?.params?.patId,
                    item?.drugId,
                    STOPEED
                  )
                }
              >
                <Text style={styles.btnText}>Stop</Text>
              </TouchableOpacity>
            )}

            {item?.status != STOPEED &&
              item?.status != HOLD &&
              item?.status == STARTED && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.holdBtn}
                  onPress={() =>
                    callToggleDrugStatusApi(
                      route?.params?.patId,
                      item?.drugId,
                      HOLD
                    )
                  }
                >
                  <Text style={styles.btnText}>Hold</Text>
                </TouchableOpacity>
              )}

            {item?.status == HOLD && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.stopBtn,
                  { backgroundColor: config.colors.facebook },
                ]}
                onPress={() =>
                  callToggleDrugStatusApi(
                    route?.params?.patId,
                    item?.drugId,
                    STARTED
                  )
                }
              >
                <Text style={styles.btnText}>Re-Start</Text>
              </TouchableOpacity>
            )}

            {item?.status == STOPEED && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.stopBtn,
                  { backgroundColor: config.colors.facebook },
                ]}
                onPress={() =>
                  callToggleDrugStatusApi(
                    route?.params?.patId,
                    item?.drugId,
                    STARTED
                  )
                }
              >
                <Text style={styles.btnText}>Re-Start</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.viewStyle}>
            <Text style={styles.cardlabelText}>No. of Days:</Text>
            <Text style={styles.cardDataText}>
              {showNumOfDays(item?.startDate, item?.endDate)}
            </Text>
          </View>

          <View style={styles.viewStyle}>
            <Text style={styles.cardlabelText}>Drug Name:</Text>
            <Text style={styles.cardDataText}>{item?.name}</Text>
          </View>

          <View style={styles.dosefreStyle}>
            <View style={styles.viewStyle}>
              <Text style={styles.cardlabelText}>Dose:</Text>
              <Text style={styles.cardDataText}>{item?.dose}</Text>
            </View>
            <Text style={styles.cardlabelText}>Frequency:</Text>
            <Text style={styles.cardDataText}>{item?.frequency}</Text>
          </View>

          <View
            style={{ ...styles.viewStyle, justifyContent: "space-between" }}
          >
            <View style={styles.dateViewConatiner}>
              <Text style={styles.cardlabelText}>Start Date:</Text>
              <Text style={styles.cardDataText}>{item?.startDate}</Text>
            </View>
            <View style={{ ...styles.dateViewConatiner, marginHorizontal: 10 }}>
              <Text style={styles.cardlabelText}>End Date:</Text>
              <Text style={styles.cardDataText}>{item?.endDate}</Text>
            </View>
          </View>

          <View style={styles.sepratorStyle}></View>

          <View style={styles.viewHistryContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate(config.routes.MEDICATION_HISTORY, {
                  medHistory: item,
                  drugCount: index + 1
                })
              }
              style={styles.viewHistoryButton}
            >
              <Text>View History</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  const callDrugListApi = () => {
    const payload = {
      uri: `${route?.params?.patId}`,
    };
    dispatch({
      type: "DRUG_HISTORY_LIST",
      payload,
    });
  };

  const showNumOfDays = (dateStart, endDate) => {
    var admission = moment(dateStart, "DD-MM-YYYY");
    var discharge = moment(endDate, "DD-MM-YYYY");
    const res = discharge.diff(admission, "days");
    return res;
  };

  const callToggleDrugStatusApi = (patId, drugId, type) => {
    const payload = {
      uri: `${patId}/${drugId}/${type}`,
    };
    dispatch({
      type: "TOGGLE_DRUG_STATUS",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {drugList?.length > 0 ? (
        <FlatList
          data={drugList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={listHeaderComponent}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.centerButtonView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headingBtn}
            onPress={() =>
              navigation.navigate(config.routes.DRUG_LIST, {
                patId: route?.params?.patId,
              })
            }
          >
            <Text style={styles.headingbtnText}>
              {config.strings.BTN_TEXTS.ADD_DRUG}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  headCard: {
    height: 60,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  medText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  arrowImg: {
    width: 25,
    height: 25,
  },

  headingStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FC5285",
    marginHorizontal: 10,
  },
  headingBtn: {
    backgroundColor: "#FC5285",
    paddingVertical: 7,
    width: "30%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headingbtnText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  drugCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },
  dosefreStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardDrugText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#393766",
  },
  cardlabelText: {
    fontSize: 14,
    color: "#25282B",
    marginRight: 7,
  },
  cardDataText: {
    fontSize: 14,
    color: "#7D8491",
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stopBtn: {
    backgroundColor: "#F14D4D",
    height: 35,
    width: "45%",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  holdBtn: {
    backgroundColor: "#9179D9",
    height: 35,
    width: "45%",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  btnText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  dateViewConatiner: { width: "50%", flexDirection: "row", flexWrap: "wrap" },
  sepratorStyle: {
    height: 1,
    backgroundColor: config.colors.toastBG,
    marginTop: 20,
  },
  viewHistryContainer: { alignItems: "flex-end", marginTop: 10 },
  viewHistoryButton: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#DADFEB",
    borderRadius: 6,
  },
  centerButtonView: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MedicationList;
