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
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import CardView from '../../components/CardView';
import { useDispatch, useSelector } from "react-redux";
import { LCGButton, AttachementViewer } from "../../components";
import config from "../../config";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { CommonUtils, EnumUtils } from "../../utils";
import { PlanAdd, DrugsAdd } from "../../reduxStates";

const AddDrug = ({ navigation, route }) => {
  const [medType, setMedType] = useState("");
  const [medRoute, setMedRoute] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [drugName, setDrugName] = useState("");
  const [note, setNote] = useState("");

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const dispatch = useDispatch();
  const DrugAddResponse = useSelector(DrugsAdd.selectAddDrug);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(DrugsAdd.saveDrugAdd(null));
    };
  }, [navigation]);

  useEffect(() => {
    if (DrugAddResponse?.success == true) {
      navigation.goBack();
    }
  }, [DrugAddResponse]);

  const MedicineTypeView = () => {
    return (
      <View style={styles.radiobuttonStyle}>
        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedType("injection")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medType == "injection"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>
            {config.strings.OTHERS.INJECTION}
          </Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedType("tablet")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medType == "tablet"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>
            {config.strings.OTHERS.TABLET}
          </Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedType("nebuliser")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medType == "nebuliser"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>
            {config.strings.OTHERS.NEBULISAR}
          </Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedType("Eye Drop")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medType == "Eye Drop"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>
            {config.strings.OTHERS.EYE_DROP}
          </Text>
        </Pressable>
      </View>
    );
  };

  const RouteView = () => {
    return (
      <View style={styles.radiobuttonStyle}>
        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedRoute("IV")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medRoute == "IV"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>{config.strings.OTHERS.IV}</Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedRoute("S/C")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medRoute == "S/C"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>{config.strings.OTHERS.SC}</Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedRoute("P/O")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medRoute == "P/O"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>{config.strings.OTHERS.PO}</Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedRoute("P/R")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medRoute == "P/R"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>{config.strings.OTHERS.PR}</Text>
        </Pressable>

        <Pressable
          style={styles.optionSubView}
          onPress={() => setMedRoute("P/V")}
        >
          <Image
            style={styles.radiobuttonImage}
            source={
              medRoute == "P/V"
                ? require("../../assets/images/RadioCheck.png")
                : require("../../assets/images/RadioUncheck.png")
            }
          />
          <Text style={styles.radiobuttonText}>{config.strings.OTHERS.PV}</Text>
        </Pressable>
      </View>
    );
  };

  const showDatePicker = (typeDate) => {
    setShowDate(!showDate);
    setDateType(typeDate);
  };

  const hideDatePicker = () => {
    setShowDate(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    formatDate(date);
  };

  const formatDate = (_date) => {
    const formattedDate = moment(_date).format("DD/MM/YYYY");
    // console.log('formattedDate',formattedDate)
    if (dateType == "start") {
      setStartDate(formattedDate);
    } else if (dateType == "end") {
      setEndDate(formattedDate);
    }
  };

  const ImageSelectModal = () => {
    return (
      <Modal visible={show} transparent={true} animationType="slide">
        <SafeAreaView style={styles.infoModalConatiner}>
          <View style={styles.modalCardView}>
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={styles.crossImage}
            >
              <Image source={config.images.Close} style={styles.closeImg} />
            </TouchableOpacity>

            <View style={styles.imageSelectOptionView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openCamera}
                style={styles.imageSelectOption}
              >
                <Text style={styles.imageSelectOptionTxt}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openGallery}
                style={{ ...styles.imageSelectOption, marginVertical: 20 }}
              >
                <Text style={styles.imageSelectOptionTxt}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const openCamera = async () => {
    setShow(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Camera permission is required!");
      return;
    }

    setTimeout(async () => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        let imgObj = {
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          uri: asset.uri,
          type: `image/${asset.uri.split('.').pop()}`,
        };
        setAttachments((prevImages) => prevImages.concat(imgObj));
      }
    }, 500);
  };

  const openGallery = async () => {
    setShow(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Gallery permission is required!");
      return;
    }

    setTimeout(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        let imgObj = {
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          uri: asset.uri,
          type: `image/${asset.uri.split('.').pop()}`,
        };
        setAttachments((prevImages) => prevImages.concat(imgObj));
      }
    }, 500);
  };

  const onSelectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false && result.assets && result.assets[0]) {
        const doc = result.assets[0];
        const docObj = {
          name: doc.name,
          uri: doc.uri,
          type: doc.mimeType || "application/pdf",
        };
        setAttachments((prevDocs) => [...prevDocs, docObj]);
      }
    } catch (err) {
      console.log("error -", err);
    }
  };

  const onPressSubmit = () => {
    if (medType == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_MEDICINE,
      });
    } else if (drugName == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DRUG,
      });
    } else if (medRoute == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_ROUTE,
      });
    } else if (dose == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DOSE,
      });
    } else if (frequency == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_FREQUENCY,
      });
    } else if (startDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_START_DATE,
      });
    } else if (endDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_END_DATE,
      });
    } else {
      callAddDrugApi();
    }
  };

  const callAddDrugApi = () => {
    const payload = {
      patientId: route?.params?.idPatient,
      category: route?.params?.drugCatg?.name,
      type: medType,
      name: drugName,
      route: medRoute,
      dose: dose,
      startDate: startDate,
      endDate: endDate,
      frequency: frequency,
      upload: attachments,
      remark: note,
    };
    dispatch({
      type: "ADD_DRUG",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height"> 
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.oxytocinText}>
            {route?.params?.drugCatg?.name}
          </Text>

          <View style={styles.oxytocinCard}>
            <MedicineTypeView />

            <Text style={styles.text}>
              {config.strings.TEXT_INPUT_LABELS.DRUG_NAME}
            </Text>

            <TextInput
              style={styles.drugInput}
              placeholder={
                config.strings.TEXT_INPUT_PLACEHOLDERS.ENETR_DRUG_NAME
              }
              onChangeText={(val) => setDrugName(val)}
            />

            <Text style={styles.text}>{config.strings.OTHERS.ROUTE}</Text>
            <RouteView />

            <View style={styles.dosefreqStyle}>
              <TextInput
                style={styles.dosefreqInput}
                placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.DOSE}
                onChangeText={(val) => setDose(val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.dosefreqInput}
                placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.FREQUENCY}
                onChangeText={(val) => setFrequency(val)}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.startendView}>
              <Pressable
                onPress={() => showDatePicker("start")}
                style={styles.startendStyle}
              >
                <Text style={styles.text}>
                  {config.strings.TEXT_INPUT_LABELS.START_DATE}
                </Text>
                <View style={styles.dateimgStyle}>
                  <Text>{startDate}</Text>
                  <Image
                    style={styles.calanderImg}
                    source={require("../../assets/images/calendarlightpng.png")}
                  />
                </View>
              </Pressable>

              <Pressable
                onPress={() => showDatePicker("end")}
                style={styles.startendStyle}
              >
                <Text style={styles.text}>
                  {config.strings.TEXT_INPUT_LABELS.END_DATE}
                </Text>
                <View style={styles.dateimgStyle}>
                  <Text>{endDate}</Text>
                  <Image
                    style={styles.calanderImg}
                    source={require("../../assets/images/calendarlightpng.png")}
                  />
                </View>
              </Pressable>
            </View>

            <Text style={styles.text}>
              {config.strings.TEXT_INPUT_LABELS.INSTRUCTIONS}
            </Text>

            <TextInput
              style={styles.specialInput}
              textAlignVertical="top"
              multiline={true}
              placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE}
              onChangeText={(val) => setNote(val)}
            />

            <DateTimePickerModal
              isVisible={showDate}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />

            <ImageSelectModal />

            <View style={styles.twoImgstyle}>
              <Pressable onPress={() => onSelectDocument()}>
                <Image
                  style={styles.blankImg}
                  source={require("../../assets/images/Pin.png")}
                />
              </Pressable>
              <Pressable onPress={() => setShow(true)}>
                <Image
                  style={styles.fileImg}
                  source={require("../../assets/images/Gallery.png")}
                />
              </Pressable>
            </View>

            <AttachementViewer dataAttachment={attachments} />
          </View>

          <LCGButton
            buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
            containerStyle={styles.buttonContainer}
            onPress={() => onPressSubmit()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: { marginHorizontal: 20 },
  oxytocinText: {
    fontSize: 18,
    color: "#FC5285",
    fontWeight: "700",
    marginHorizontal: 15,
    marginTop: 20,
  },
  oxytocinCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  radiobuttonStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  radiobuttonImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  radiobuttonText: {
    fontSize: 14,
    fontWeight: "400",
    color: config.colors.neutralBlack,
    marginHorizontal: 21,
    marginVertical: 10,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
    color: config.colors.neutralBlack,
    marginVertical: 10,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  drugInput: {
    height: 40,
    borderWidth: 1.5,
    borderColor: "#DADFEB",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  dosefreqInput: {
    height: 40,
    width: "45%",
    borderWidth: 1.5,
    borderColor: "#DADFEB",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  dosefreqStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startendView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startendStyle: {
    flexDirection: "column",
    width: "45%",
  },
  dateimgStyle: {
    height: 40,
    borderColor: "#DADFEB",
    borderWidth: 1.5,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  calanderImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  specialInput: {
    height: 100,
    borderWidth: 1.5,
    borderColor: "#BEC5D3",
    paddingHorizontal: 5,
    borderRadius: 6,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  blankImg: {
    width: 23,
    height: 23,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  fileImg: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },
  submitBtn: {
    backgroundColor: "#FC5285",
    height: 45,
    width: "85%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 30,
  },
  submitBtnText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  twoImgstyle: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  optionSubView: { flexDirection: "row", alignItems: "center" },
  infoModalConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalCardView: {
    marginHorizontal: 30,
    paddingVertical: 10,
    width: "90%",
    backgroundColor: config.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  closeImg: { width: 20, height: 20 },
  imageSelectOption: {
    borderColor: config.colors.appTheme1,
    borderWidth: 2,
    height: 40,
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageSelectOptionTxt: {
    fontSize: 16,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
  crossImage: { alignItems: "flex-end", margin: 10 },
  imageSelectOptionView: { justifyContent: "center", alignItems: "center" },
});

export default AddDrug;
