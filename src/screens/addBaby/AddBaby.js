import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { LCGButton } from "../../components";
import config from "../../config";
import moment from "moment";
import {
  User,
  UpdateLabourStatus,
  AddLcg,
  CompleteDelivery,
  BabyAdd,
  UpdateBaby,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, EnumUtils } from "../../utils";

const AddBaby = ({ navigation, route }) => {
  const [babyStatus, setBabyStatus] = useState("");
  const [babySex, setBabySex] = useState("");
  const [weight, setWeight] = useState("");
  const [feedStart, setFeedStart] = useState("No");
  const [feedTime, setFeedTime] = useState("");
  const [note, setNote] = useState("");
  const [oneMinScore, setOneMinScore] = useState(null);
  const [fiveMinScore, setFiveMinScore] = useState(null);
  const [tenMinScore, setTenMinScore] = useState(null);
  const [twentyMinScore, setTwentyMinScore] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [screenFrom, setScreenFrom] = useState("");
  const [babyId, setBabyId] = useState("");

  const dispatch = useDispatch();
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const AddBabyResponse = useSelector(BabyAdd.selectAddBaby);
  const EditBabyResponse = useSelector(UpdateBaby.selectEditBaby);



  useEffect(() => {
    if (route?.params?.apgarData) {
      setApgarScoreData();
    }
  }, [route?.params?.apgarData]);

  useEffect(() => {
    if (route?.params?.from == "edit") {
      setEditBabyData();
    }
  }, [route?.params?.from]);

  useEffect(() => {
    if (route?.params?.from) {
      setScreenFrom(route?.params?.from);
    }
  }, [route?.params?.from]);

  useEffect(() => {
    if (route?.params?.babyData) {
      setBabyId(route?.params?.babyData?.babyId);
    }
  }, [route?.params?.babyData]);

  useEffect(() => {
    if (route?.params?.patId) {
      setPatientId(route?.params?.patId);
    }
  }, [route?.params?.patId]);

  useEffect(() => {
    if (EditBabyResponse?.success == true) {
      navigation.goBack();
    }
  }, [EditBabyResponse]);

  useEffect(() => {
    if (AddBabyResponse?.success == true) {
      navigation.goBack();
    }
  }, [AddBabyResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(BabyAdd.saveAddBaby(null));
      dispatch(UpdateBaby.saveEditBaby(null));
    };
  }, [navigation]);

  const onPressSubmit = () => {
    if (babyStatus == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_BABY_STATUS,
      });
    } else if (babySex == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_SEX,
      });
    } else if (weight == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_WEIGHT,
      });
    } else if (feedStart == "Yes" && feedTime == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_FEEDING,
      });
    } else {
      callAddbabyApi();
    }
  };

  const setApgarScoreData = () => {
    if (route?.params?.apgarData?.timeInterval == 1) {
      setOneMinScore(route?.params?.apgarData?.apgarScore);
    } else if (route?.params?.apgarData?.timeInterval == 5) {
      setFiveMinScore(route?.params?.apgarData?.apgarScore);
    } else if (route?.params?.apgarData?.timeInterval == 10) {
      setTenMinScore(route?.params?.apgarData?.apgarScore);
    } else if (route?.params?.apgarData?.timeInterval == 10) {
      setTwentyMinScore(route?.params?.apgarData?.apgarScore);
    }
  };

  const callAddbabyApi = () => {
    const payload = {
      patientId: patientId,
      status: babyStatus,
      sex: babySex,
      weight: weight,
      notes: note,
      breastFeeding: {
        started: feedStart == "Yes" ? true : false,
        withinOneHour: feedTime == "Within 1 hour" ? true : false,
        moreThanOneHour: feedTime == "More than 1 Hour" ? true : false,
      },
      apgar: {
        oneMin: oneMinScore,
        fiveMin: fiveMinScore,
        tenMins: tenMinScore,
        twentyMins: twentyMinScore,
      },
    };
    dispatch({
      type: "ADD_BABY",
      payload,
    });
  };

  const setEditBabyData = () => {
    setBabyStatus(route?.params?.babyData?.status);
    setBabySex(route?.params?.babyData?.sex);
    setWeight(route?.params?.babyData?.weight);
    setFeedStart(
      route?.params?.babyData?.breastFeeding?.started == false ? "No" : "Yes"
    );
    setFeedTime(
      route?.params?.babyData?.breastFeeding?.withinOneHour == true
        ? "Within 1 hour"
        : ""
    );
    setFeedTime(
      route?.params?.babyData?.breastFeeding?.moreThanOneHour == true
        ? "More than 1 Hour"
        : "Within 1 hour"
    );
    setNote(route?.params?.babyData?.notes);
    setOneMinScore(route?.params?.babyData?.apgar?.oneMin);
    setFiveMinScore(route?.params?.babyData?.apgar?.fiveMin);
    setTenMinScore(route?.params?.babyData?.apgar?.tenMins);
    setTwentyMinScore(route?.params?.babyData?.apgar?.twentyMins);
  };

  const callEditBabyApi = () => {
    if (babyStatus == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_BABY_STATUS,
      });
    } else if (babySex == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_SEX,
      });
    } else if (weight == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_WEIGHT,
      });
    } else if (feedStart == "Yes" && feedTime == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_FEEDING,
      });
    } else {
      const payload = {
        babyId: babyId,
        patientId: patientId,
        status: babyStatus,
        sex: babySex,
        weight: weight,
        notes: note,
        breastFeeding: {
          started: feedStart == "Yes" ? true : false,
          withinOneHour: feedTime == "Within 1 hour" ? true : false,
          moreThanOneHour: feedTime == "More than 1 Hour" ? true : false,
        },
        apgar: {
          oneMin: oneMinScore,
          fiveMin: fiveMinScore,
          tenMins: tenMinScore,
          twentyMins: twentyMinScore,
        },
      };
      dispatch({
        type: "EDIT_BABY",
        payload,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.babyCard}>
          <View style={styles.statusView}>
            <Text style={styles.babystatusText}>
              {config.strings.OTHERS.BABY_STATUS}
            </Text>
            <View style={styles.statusexStyle}>
              <Pressable
                onPress={() => setBabyStatus("alive")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babyStatus == "alive"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.ALIVE}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setBabyStatus("stillborn")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babyStatus == "stillborn"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.STILLBORN}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setBabyStatus("macerated")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babyStatus == "macerated"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.MACERTED}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.sexView}>
            <Text style={styles.babysexText}>
              {config.strings.OTHERS.BABY_SEX}
            </Text>
            <View style={styles.statusexStyle}>
              <Pressable
                onPress={() => setBabySex("male")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babySex == "male"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.MALE}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setBabySex("female")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babySex == "female"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.FEMALE}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setBabySex("indeterminate")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    babySex == "indeterminate"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.INTERMEDIATE}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.apgarView}>
            <Text style={styles.apgarText}>{config.strings.OTHERS.APGAR}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.calculateBtn}
              onPress={() =>
                navigation.navigate(config.routes.APGAR, {
                  detailApgar: route?.params?.babyData?.apgar,
                  screenFrom: route?.params?.from,
                })
              }
            >
              <Text style={styles.calculateBtnText}>
                {config.strings.OTHERS.CALCULATE}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.onefiveView}>
            <View style={styles.minviewStyle}>
              <Text>
                {config.strings.OTHERS.ONEMIN} = {oneMinScore}
              </Text>
            </View>
            <View style={styles.minviewStyle}>
              <Text>
                {config.strings.OTHERS.FIVEMIN} = {fiveMinScore}
              </Text>
            </View>
          </View>
          <View style={styles.tentwentyView}>
            <View style={styles.minviewStyle}>
              <Text>
                {config.strings.OTHERS.TENMIN} = {tenMinScore}
              </Text>
            </View>
            <View style={styles.minviewStyle}>
              <Text>
                {config.strings.OTHERS.TWENTYMIN} = {twentyMinScore}
              </Text>
            </View>
          </View>
          <Text style={styles.weightText}>
            {config.strings.OTHERS.WEIGTH_KG}
          </Text>

          <TextInput
            style={styles.kgInput}
            placeholder={config.strings.OTHERS.KG}
            keyboardType="numeric"
            onChangeText={(val) => setWeight(val)}
            value={weight}
          />

          <View style={styles.breastView}>
            <Text style={styles.breastText}>
              {config.strings.OTHERS.BREAST_FEEDINGSTART}
            </Text>
            <Pressable
              onPress={() => setFeedStart("No")}
              style={styles.radioOptionSubView}
            >
              <Image
                style={styles.imgStyle}
                source={
                  feedStart == "No"
                    ? require("../../assets/images/RadioCheck.png")
                    : require("../../assets/images/RadioUncheck.png")
                }
              />

              <Text style={styles.cardText}>{config.strings.BTN_TEXTS.NO}</Text>
            </Pressable>

            <Pressable
              onPress={() => setFeedStart("Yes")}
              style={styles.radioOptionSubView}
            >
              <Image
                style={styles.imgStyle}
                source={
                  feedStart == "Yes"
                    ? require("../../assets/images/RadioCheck.png")
                    : require("../../assets/images/RadioUncheck.png")
                }
              />
              <Text style={styles.cardText}>
                {config.strings.BTN_TEXTS.YES}
              </Text>
            </Pressable>
          </View>

          {feedStart == "Yes" && (
            <View
              style={{
                ...styles.radioOptionSubView,
                marginVertical: 10,
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => setFeedTime("Within 1 hour")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    feedTime == "Within 1 hour"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />

                <Text style={styles.cardText}>
                  {config.strings.OTHERS.WITHIN_1HOUR}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setFeedTime("More than 1 Hour")}
                style={styles.radioOptionSubView}
              >
                <Image
                  style={styles.imgStyle}
                  source={
                    feedTime == "More than 1 Hour"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.cardText}>
                  {config.strings.OTHERS.MORE_THAN_1HOUR}
                </Text>
              </Pressable>
            </View>
          )}

          <Text style={styles.otherText}>
            {config.strings.TEXT_INPUT_LABELS.NOTE}
          </Text>

          <TextInput
            style={styles.otherInput}
            textAlignVertical="top"
            multiline={true}
            placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE}
            onChangeText={(val) => setNote(val)}
            value={note}
          />
        </View>

        {screenFrom != "edit" && (
          <LCGButton
            buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
            containerStyle={styles.buttonContainer}
            onPress={() => onPressSubmit()}
          />
        )}

        {screenFrom == "edit" && (
          <View style={styles.viewStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>
                {config.strings.BTN_TEXTS.CANCEL}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.saveBtn}
              onPress={() => callEditBabyApi()}
            >
              <Text style={styles.saveText}>
                {config.strings.BTN_TEXTS.UPDATE}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  buttonContainer: { marginHorizontal: 20 },
  babyCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  statusView: {
    marginVertical: 10,
  },
  babystatusText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginBottom: 10,
  },
  statusexStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imgStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginHorizontal: 10,
  },
  sexView: {
    marginVertical: 10,
  },
  babysexText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginBottom: 10,
  },
  apgarView: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  apgarText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginBottom: 10,
  },
  calculateBtn: {
    backgroundColor: "#FC5285",
    height: 25,
    width: "27%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  calculateBtnText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  onefiveView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  minviewStyle: {
    width: "45%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: config.colors.textInputLabel,
    borderWidth: 1.5,
    borderRadius: 6,
  },
  tentwentyView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weightText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginBottom: 10,
  },
  kgInput: {
    height: 40,
    borderWidth: 1.5,
    borderColor: config.colors.divider,
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  breastView: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  breastText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  otherText: {
    fontSize: 15,
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  otherInput: {
    height: 100,
    borderWidth: 1.5,
    borderColor: config.colors.divider,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#FC5285",
    height: 40,
    width: "85%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  submitBtnText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  viewStyle: {
    flexDirection: "row",
  },
  mobileInput: {
    height: 43,
    width: "89%",
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
  },
  mobileText: {
    fontSize: 15,
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
    marginVertical: 10,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: "#EEF2F3",
    height: 45,
    width: 170,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
  },
  saveBtn: {
    backgroundColor: "#FC5285",
    height: 45,
    width: 170,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "black",
  },
  saveText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  radioOptionSubView: { flexDirection: "row", alignItems: "center" },
});

export default AddBaby;
