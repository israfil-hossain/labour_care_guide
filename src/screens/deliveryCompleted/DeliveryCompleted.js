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
  KeyboardAvoidingView,
} from "react-native";
import { LCGTextInput } from "../../components";
import config from "../../config";
import {
  User,
  UpdateLabourStatus,
  AddLcg,
  CompleteDelivery,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, EnumUtils } from "../../utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DeliveryCompleted = ({ navigation, route }) => {
  const [delType, setDelType] = useState("Cesarian");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [oprSurgon, setOprSurgon] = useState("");
  const [anaesthetic, setAnaesthetic] = useState("");
  const [paediatrician, setPaediatrician] = useState("");
  const [numBabies, setNumBabies] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateFormat, setEndDateFormat] = useState("");

  const [showLabourTime, setShowLabourTime] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const dispatch = useDispatch();
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;



  const DelCompleteResponse = useSelector(
    CompleteDelivery.selectDeliveryComplete
  );

  useEffect(() => {
    if (route?.params?.from == "edit") {
      setEditdata();
    }
  }, [route?.params?.from]);

  useEffect(() => {
    if (DelCompleteResponse?.success == true) {
      navigation.goBack();
    }
  }, [DelCompleteResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(CompleteDelivery.saveDelCompleted(null));
    };
  }, [navigation]);

  const onPressSave = () => {
    if (endTime == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DATE,
      });
    } else if (note == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SURGORY_NOTE,
      });
    } else if (oprSurgon == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.OPR_SURGEON,
      });
    } else if (anaesthetic == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ANESTHETIC,
      });
    } else if (paediatrician == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_PAEDIATRICIAN,
      });
    } else if (numBabies == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NUMBABIES,
      });
    } else {
      callDeliveryCompleteApi();
    }
  };

  const callDeliveryCompleteApi = () => {
    const payload = {
      patientId: route?.params?.idPat,
      time: `${endDateFormat}`,
      deliveryType: delType,
      note: note,
      operatingSurgeon: oprSurgon,
      paediatrician: paediatrician,
      anaesthetic: anaesthetic,
      numberOfBabies: numBabies,
    };
    dispatch({
      type: "DELIVERY_COMPLETED",
      payload,
    });
  };

  const setEditdata = () => {
    setEndTime(
      moment(new Date(route?.params?.detailDeliver?.time), "HH:mm").format(
        "hh:mm A"
      )
    );
    setEndDateFormat(route?.params?.detailDeliver?.time);
    setDelType(route?.params?.detailDeliver?.deliveryType);
    setNote(route?.params?.detailDeliver?.note);
    setOprSurgon(route?.params?.detailDeliver?.operatingSurgeon);
    setAnaesthetic(route?.params?.detailDeliver?.anaesthetic);
    setPaediatrician(route?.params?.detailDeliver?.paediatrician);
    setNumBabies(route?.params?.detailDeliver?.numberOfBabies);
  };

  const showLabourTimePicker = () => {
    setShowLabourTime(!showLabourTime);
  };

  const hideLabourTimePicker = () => {
    setShowLabourTime(false);
  };

  const handleConfirmTimeLabour = (_time) => {
    formatTimeLabour(_time);
  };

  const formatTimeLabour = (_time) => {
    const formattedDate = moment(_time, "HH:mm").format("hh:mm A");
    setEndTime(formattedDate);
    setEndDateFormat(_time);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardView}>
            <Text style={styles.deliCompleteLabel}>
              {config.strings.TEXT_INPUT_LABELS.DELIVERY_COMPLETED_TIME}
            </Text>

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.END_TIME}
            </Text>
            <Pressable onPress={() => showLabourTimePicker()}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CLOCK}
                rightAccessorySize={20}
                rightAccessoryStyle={{ color: "black" }}
                textInputProps={{
                  value: endTime,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TIME,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.WORDS,
                  editable: false,
                }}
              />
            </Pressable>

            <DateTimePickerModal
              isVisible={showLabourTime}
              mode="time"
              onConfirm={handleConfirmTimeLabour}
              onCancel={hideLabourTimePicker}
            />

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => setDelType("cesarian")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    delType == "cesarian"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.maleText}>
                  {config.strings.OTHERS.CESARIAN}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDelType("nvd")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    delType == "nvd"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.femaleText}>
                  {config.strings.OTHERS.NVD}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.SURGERYNOTE}
            </Text>
            <LCGTextInput
              onChangeText={(val) => setNote(val)}
              containerStyle={styles.inputContainer}
              rightAccessoryStyle={{ color: "black" }}
              textInputProps={{
                value: note,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.ADD_NOTE,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
                height: 60,
                textAlignVertical: "top",
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.OPERATING_SURGEON}
            </Text>
            <LCGTextInput
              onChangeText={(val) => setOprSurgon(val)}
              containerStyle={styles.inputContainer}
              rightAccessoryStyle={{ color: "black" }}
              textInputProps={{
                value: oprSurgon,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.ANESTHETIC}
            </Text>
            <LCGTextInput
              onChangeText={(val) => setAnaesthetic(val)}
              containerStyle={styles.inputContainer}
              rightAccessoryStyle={{ color: "black" }}
              textInputProps={{
                value: anaesthetic,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.PAEDIATRICIAN}
            </Text>
            <LCGTextInput
              onChangeText={(val) => setPaediatrician(val)}
              containerStyle={styles.inputContainer}
              rightAccessoryStyle={{ color: "black" }}
              textInputProps={{
                value: paediatrician,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.NO_BABY_DELIVERD}
            </Text>
            <LCGTextInput
              onChangeText={(val) => setNumBabies(val)}
              containerStyle={styles.inputContainer}
              rightAccessoryStyle={{ color: "black" }}
              textInputProps={{
                value: numBabies,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />
          </View>

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
              onPress={() => onPressSave()}
            >
              <Text style={styles.saveText}>
                {config.strings.BTN_TEXTS.SAVE}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  cardView: {
    backgroundColor: config.colors.white,
    borderColor: config.colors.textInputLabel,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  deliCompleteLabel: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 18,
  },
  labelStyle: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.neutralBlack,
    marginVertical: 8,
  },
  inputContainer: { marginVertical: 2, backgroundColor: "white" },
  viewStyle: {
    flexDirection: "row",
    marginVertical: 10,
  },
  radioOptionView: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginVertical: 12,
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  maleText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
  },
  femaleText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
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
    borderWidth: 1,
    borderColor: config.colors.textInputLabel,
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
});

export default DeliveryCompleted;
