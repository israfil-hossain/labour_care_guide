import CardView from "../../components/CardView";import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import {
  LCGButton,
  LCGDropDown,
  LCGTextInput,
  LCGCenterModal,
  AttachementViewer,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  ListWards,
  PatientTransfer,
  DeclarePatient,
  DischargePatient,
  HistoryTransfer,
  ListPateints,
} from "../../reduxStates";
import { removeTransferPatientResponse } from "../../reduxStates/TransferPatient";
import { WebView } from 'react-native-webview';

const DISCHARGE_REASON = ["LAMA", "DOR", "Normal"];
const IMAGE_BASEURL = "https://app.lcgapp.online/api-v2022/";

const PateintActions = ({ navigation, route }) => {
  //Local States
  const [menuOption, setmenuOption] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [transferDate, setTransferDate] = useState("");
  const [declareDate, setDeclareDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [dateType, setDateType] = useState("");
  const [showWardDropDown, setShowWardDropDown] = useState(false);
  const [assignWard, setAssignWard] = useState("");
  const [wardID, setWardID] = useState("");
  const [dischargeReason, setDischargeReason] = useState("");
  const [showReasonDropDown, setShowReasonDropDown] = useState(false);

  const [transferNote, setTransferNote] = useState("");
  const [transferAttachments, setTransferAttachments] = useState([]);
  const [declareNote, setDeclareNote] = useState("");
  const [declareAttachments, setDeclareAttachments] = useState([]);
  const [dischargeNote, setDischargeNote] = useState("");
  const [dischargeAttchments, setDischargeAttchments] = useState([]);

  const [imageshow, setImageShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const [dataUrl, setDataUrl] = useState("");

  const dispatch = useDispatch();

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  //Selectors
  const Listward = useSelector(ListWards.selectWardsList);
  const TransferPat = useSelector(PatientTransfer.selectPatientTransfer);
  const TransferPatError = useSelector(
    PatientTransfer.selectPatientTransferError
  );
  const PatientDeclare = useSelector(DeclarePatient.selectDeclarePatient);
  const PatientDeclareError = useSelector(
    DeclarePatient.selectDeclareErrorResponse
  );
  const PatientDischarge = useSelector(DischargePatient.selectDischargePatient);
  const PatientDischargeError = useSelector(
    DischargePatient.selectDischargeErrorResponse
  );
  const TransferHistory = useSelector(HistoryTransfer.selectTranferHistory);
  const WardID = useSelector(ListWards.selectIdWard);
  const OptionFilter = useSelector(ListPateints.selectOptionFilter);
  const PatientListData = useSelector(ListPateints.selectPatientList);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(PatientTransfer.saveTransferPatient(null));
      dispatch(DeclarePatient.saveDeclarePatient(null));
      dispatch(DischargePatient.saveDischargePatient(null));
    };
  }, [navigation]);

  useEffect(() => {
    callTransferHistoryApi();
  }, []);

  useEffect(() => {
    if (PatientDischarge?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: PatientDischarge?.message,
      });
      navigation.goBack();
      callPatientListApi();
    }
  }, [PatientDischarge]);

  useEffect(() => {
    if (PatientDeclare?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: PatientDeclare?.message,
      });
      navigation.goBack();
      callPatientListApi();
    }
  }, [PatientDeclare]);

  useEffect(() => {
    if (TransferPatError?.status == false) {
      showToast({
        type: toastTypes.ERROR,
        text2: TransferPatError?.message,
      });
      dispatch(removeTransferPatientResponse(null));
    }
  }, [TransferPatError]);

  useEffect(() => {
    if (TransferPat?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: TransferPat?.message,
      });
      navigation.goBack();
      callPatientListApi();
    }
  }, [TransferPat]);

  const callPatientListApi = () => {
    const payload = {
      uri: `list?filterBy=${OptionFilter}&filterValue=true&page=${
        PatientListData?.data?.pagination?.currentPage
      }`,
    };
    dispatch({
      type: "PATEINT_LIST",
      payload,
    });
  };

  useEffect(() => {
    callWardListApi();
  }, []);

  const callWardListApi = () => {
    const payload = {
      uri: `list?all=true`,
    };
    dispatch({
      type: "WARD_LIST",
      payload,
    });
  };

  const onPressWardDropDown = (val) => {
    setWardID(val?.wardId);
    setAssignWard(val?.name);
    setShowWardDropDown(false);
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
    setTimeout(async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        let imgObj = {
          name: asset.uri.split("/").pop() || "image.jpg",
          uri: asset.uri,
          type: "image/jpeg",
        };

        if (menuOption == 1) {
          setTransferAttachments((prevImages) => prevImages.concat(imgObj));
        } else if (menuOption == 3) {
          setDeclareAttachments((prevImages) => prevImages.concat(imgObj));
        } else if (menuOption == 4) {
          setDischargeAttchments((prevImages) => prevImages.concat(imgObj));
        }
      }
    }, 500);
  };

  const openGallery = async () => {
    setShow(false);
    setTimeout(async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        let imgObj = {
          name: asset.uri.split("/").pop() || "image.jpg",
          uri: asset.uri,
          type: "image/jpeg",
        };

        if (menuOption == 1) {
          setTransferAttachments((prevImages) => prevImages.concat(imgObj));
        } else if (menuOption == 3) {
          setDeclareAttachments((prevImages) => prevImages.concat(imgObj));
        } else if (menuOption == 4) {
          setDischargeAttchments((prevImages) => prevImages.concat(imgObj));
        }
      }
    }, 500);
  };

  const onSelectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false, // Set to false for Expo Go compatibility
      });

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const doc = result.assets[0];
        const docObj = {
          name: doc.name,
          uri: doc.uri,
          type: doc.mimeType || "application/pdf",
        };

        if (menuOption == 1) {
          setTransferAttachments((prevDocs) => prevDocs.concat(docObj));
        } else if (menuOption == 3) {
          setDeclareAttachments((prevDocs) => prevDocs.concat(docObj));
        } else if (menuOption == 4) {
          setDischargeAttchments((prevDocs) => prevDocs.concat(docObj));
        }
      }
    } catch (err) {
      console.log("error -", err);
    }
  };

  const HorizontalTopBar = () => {
    return (
      <View style={styles.horizontalListView}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => setmenuOption(1)}
            style={{
              ...styles.listOptionView,
              borderBottomColor:
                menuOption == 1 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.TRANSFER}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(3)}
            style={{
              ...styles.listOptionView,
              borderBottomColor:
                menuOption == 3 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DECLARE}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(4)}
            style={{
              ...styles.listOptionView,
              borderBottomColor:
                menuOption == 4 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DISCHARGE}</Text>
          </Pressable>
        </ScrollView>
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
    const formattedDate = moment(_date).format("YYYY-MM-DD");
    // console.log('formattedDate',formattedDate)
    if (dateType == "transfer") {
      setTransferDate(formattedDate);
    } else if (dateType == "declare") {
      setDeclareDate(formattedDate);
    } else if (dateType == "discharge") {
      setDischargeDate(formattedDate);
    }
  };

  const onPressTransfer = () => {
    if (assignWard == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_WARD,
      });
    } else if (transferDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DATE,
      });
    } else {
      const payload = {
        patientId: route?.params?.patID,
        wardId: wardID,
        note: transferNote,
        date: transferDate,
        upload: transferAttachments,
      };
      dispatch({
        type: "TRANSFER_PATIENT",
        payload,
      });
    }
  };

  const onPressDeclare = () => {
    if (declareDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DATE,
      });
    } else if (declareNote == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NOTE,
      });
    } else {
      setIsVisible(true);
    }
  };

  const callDeclareMortailtyApi = () => {
    const payload = {
      patientId: route?.params?.patID,
      upload: declareAttachments,
      note: declareNote,
      date: declareDate,
    };

    dispatch({
      type: "DECLARE_PATIENT",
      payload,
    });
  };

  const onPressYes = () => {
    callDeclareMortailtyApi();
    setIsVisible(false);
  };

  const onPressReasonDropDown = (val) => {
    setDischargeReason(val);
    setShowReasonDropDown(false);
  };

  const onPressDischarge = () => {
    if (dischargeReason == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DISHREASON,
      });
    } else if (dischargeDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DATE,
      });
    } else if (dischargeNote == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NOTE,
      });
    } else {
      callDischarePatientApi();
    }
  };

  const callDischarePatientApi = () => {
    const payload = {
      patientId: route?.params?.patID,
      upload: dischargeAttchments,
      note: dischargeNote,
      date: dischargeDate,
      reason: dischargeReason,
    };
    dispatch({
      type: "DISCHARGE_PATIENT",
      payload,
    });
  };

  const callTransferHistoryApi = () => {
    const payload = {
      uri: `${route?.params?.patID}`,
    };
    dispatch({
      type: "TRANSFER_LIST",
      payload,
    });
  };

  const ImageViewModal = () => {
    return (
      <Modal visible={imageshow}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setImageShow(false)}
            style={styles.closeIconView}
          >
            <Image
              source={require("../../assets/images/Close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.contentView}>
            <Image source={{ uri: dataUrl }} style={styles.contentImage} />
          </View>
        </View>
      </Modal>
    );
  };

  const PdfViewModal = () => {
    const source = { uri: dataUrl, cache: true };

    return (
      <Modal visible={pdfShow}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setPdfShow(false)}
            style={styles.closeIconView}
          >
            <Image
              source={require("../../assets/images/Close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <WebView
            source={{ uri: dataUrl }}
            style={styles.pdf}
          />
        </View>
      </Modal>
    );
  };

  const onPressView = (data) => {
    if (data?.type == "pdf") {
      setPdfShow(true);
      setDataUrl(data?.link);
    } else {
      setImageShow(true);
      setDataUrl(data?.link);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HorizontalTopBar />

        {menuOption == 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.SELECT_AREA_WARD}
            </Text>

            <Pressable onPress={() => setShowWardDropDown(!showWardDropDown)}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                rightAccessorySize={16}
                textInputProps={{
                  value: assignWard,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.NONE,
                  editable: false,
                  textTransform: "capitalize",
                }}
              />
            </Pressable>

            <LCGDropDown
              dropVisible={showWardDropDown}
              listData={Listward?.data?.wards}
              viewStyle={{ marginHorizontal: 0 }}
              renderContent={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPressWardDropDown(item)}
                    style={styles.dropDownContentView}
                  >
                    <View style={styles.dropDownDotView}></View>
                    <Text style={styles.dropDownListText}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.DATE}
            </Text>

            <Pressable onPress={() => showDatePicker("transfer")}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CALENDAR}
                rightAccessorySize={20}
                rightAccessoryStyle={{ color: "black" }}
                textInputProps={{
                  value: transferDate,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.NONE,
                  editable: false,
                }}
              />
            </Pressable>

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.NOTE}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setTransferNote(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: transferNote,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                multiline: true,
                height: 80,
                textAlignVertical: "top",
              }}
            />

            <View style={styles.imgStyle}>
              <TouchableOpacity onPress={() => onSelectDocument()}>
                <Image
                  style={styles.clipImg}
                  source={require("../../assets/images/Pin.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Image
                  style={styles.blankImg}
                  source={require("../../assets/images/Gallery.png")}
                />
              </TouchableOpacity>
            </View>

            <AttachementViewer dataAttachment={transferAttachments} />

            <LCGButton
              containerStyle={styles.submitBtnContainer}
              buttonText={config.strings.BTN_TEXTS.TRANSFER}
              onPress={() => onPressTransfer()}
            />

            {TransferHistory?.data?.length > 0 && (
              <View>
                <Text style={styles.dischargeText}>
                  {config.strings.OTHERS.TRANSFER_HISTORY}
                </Text>

                <FlatList
                  data={TransferHistory?.data}
                  renderItem={({ item }) => (
                    <>
                      <View style={styles.dischargeCard}>
                        <Text style={styles.listText}>
                          {config.strings.OTHERS.STAFF_NAME} {item.staffName}
                        </Text>
                        <Text style={styles.listText}>
                          {config.strings.OTHERS.NOTE} {item.note}
                        </Text>
                        {item?.files.map((_item, indx) => (
                          <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => onPressView(_item)}
                            style={styles.blankimgStyle}
                          >
                            <Image
                              style={styles.blankImg}
                              source={
                                _item?.type == "pdf"
                                  ? require("../../assets/images/Document.png")
                                  : require("../../assets/images/Gallery.png")
                              }
                            />
                            <View style={styles.mbnameStyle}>
                              <Text
                                numberOfLines={1}
                                style={styles.imgnameText}
                              >
                                {_item?.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                        <Text style={styles.dateText}>
                          {item?.date != null &&
                            moment(new Date(item?.date)).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </>
                  )}
                />
              </View>
            )}
          </View>
        )}

        {menuOption == 3 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.DATE}
            </Text>
            <Pressable onPress={() => showDatePicker("declare")}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CALENDAR}
                rightAccessorySize={20}
                rightAccessoryStyle={{ color: "black" }}
                textInputProps={{
                  value: declareDate,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.NONE,
                  editable: false,
                }}
              />
            </Pressable>

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.NOTE}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setDeclareNote(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: declareNote,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                multiline: true,
                height: 80,
                textAlignVertical: "top",
              }}
            />

            <View style={styles.imgStyle}>
              <TouchableOpacity onPress={() => onSelectDocument()}>
                <Image
                  style={styles.clipImg}
                  source={require("../../assets/images/Pin.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Image
                  style={styles.blankImg}
                  source={require("../../assets/images/Gallery.png")}
                />
              </TouchableOpacity>
            </View>

            <AttachementViewer dataAttachment={declareAttachments} />

            <LCGButton
              containerStyle={styles.submitBtnContainer}
              buttonText={config.strings.BTN_TEXTS.DECLARE_MORTAILTY}
              onPress={() => onPressDeclare()}
            />
          </View>
        )}

        {menuOption == 4 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.REASON_DISCHARGE}
            </Text>

            <Pressable
              onPress={() => setShowReasonDropDown(!showReasonDropDown)}
            >
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                rightAccessorySize={16}
                textInputProps={{
                  value: dischargeReason,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.NONE,
                  editable: false,
                }}
              />
            </Pressable>

            <LCGDropDown
              dropVisible={showReasonDropDown}
              listData={DISCHARGE_REASON}
              viewStyle={{ marginHorizontal: 0, marginTop: 10 }}
              renderContent={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPressReasonDropDown(item)}
                    style={styles.dropDownContentView}
                  >
                    <View style={styles.dropDownDotView}></View>
                    <Text style={styles.dropDownListText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.DATE}
            </Text>

            <Pressable onPress={() => showDatePicker("discharge")}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CALENDAR}
                rightAccessorySize={20}
                rightAccessoryStyle={{ color: "black" }}
                textInputProps={{
                  value: dischargeDate,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.NONE,
                  editable: false,
                }}
              />
            </Pressable>

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.NOTE}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setDischargeNote(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: dischargeNote,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                multiline: true,
                height: 80,
                textAlignVertical: "top",
              }}
            />

            <View style={styles.imgStyle}>
              <TouchableOpacity onPress={() => onSelectDocument()}>
                <Image
                  style={styles.clipImg}
                  source={require("../../assets/images/Pin.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Image
                  style={styles.blankImg}
                  source={require("../../assets/images/Gallery.png")}
                />
              </TouchableOpacity>
            </View>

            <AttachementViewer dataAttachment={dischargeAttchments} />

            <LCGButton
              containerStyle={styles.submitBtnContainer}
              buttonText={config.strings.BTN_TEXTS.DISCHARGE_PATEINT}
              onPress={() => onPressDischarge()}
            />
          </View>
        )}

        <ImageSelectModal />

        <DateTimePickerModal
          isVisible={showDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <LCGCenterModal
          visible={isVisible}
          onClose={() => setIsVisible(false)}
          modalContent={() => {
            return (
              <View style={styles.messageHeadingView}>
                <Text style={styles.messageHeadingText}>
                  {config.strings.BTN_TEXTS.ARE_YOU_WANT_MORTAILTY}
                </Text>

                <View style={styles.viewStyle}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.cancelBtn}
                    onPress={() => setIsVisible(false)}
                  >
                    <Text style={styles.cancelText}>
                      {config.strings.BTN_TEXTS.NO}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.saveBtn}
                    onPress={() => onPressYes()}
                  >
                    <Text style={styles.saveText}>
                      {config.strings.BTN_TEXTS.YES}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <ImageViewModal />
        <PdfViewModal />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receiveCard: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  dataText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#25282B",
    lineHeight: 25,
  },
  labelStyle: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.neutralBlack,
    marginTop: 15,
  },
  submitBtnContainer: { marginTop: 24 },
  inputContainer: { backgroundColor: "white", marginTop: 10 },
  imgStyle: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 5,
  },
  clipImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginHorizontal: 13,
  },
  blankImg: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  horizontalListView: {
    marginVertical: 15,
    backgroundColor: "#fff",
    height: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    flexDirection: "row",

    elevation: 3,
  },
  listOptionView: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    width: Dimensions.get("screen").width / 3,
  },
  dischargeText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginTop: 30,
  },
  listText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#25282B",
    marginBottom: 5,
  },
  imgnameText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000000",
    marginHorizontal: 10,
  },
  mbText: {
    fontSize: 9,
    color: "#8D939E",
    fontWeight: "400",
    marginHorizontal: 10,
  },
  dateText: {
    marginTop: 8,
    fontSize: 11,
    color: "#A1A7B3",
    fontWeight: "400",
  },
  blankimgStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  mbnameStyle: {
    flexDirection: "column",
    width: "60%",
  },
  dischargeCard: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  messageHeadingView: { alignItems: "center" },
  passwordImage: { width: 60, height: 60, resizeMode: "contain" },
  messageHeadingText: {
    color: config.colors.neutralBlack,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 17,
  },
  headingText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 26,
    lineHeight: 46,
    color: config.colors.appTheme1,
    marginBottom: 6,
  },
  subheadingText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 21,
    color: config.colors.neutralBlack,
    marginBottom: 37,
  },
  buttonContainer: { marginVertical: 14, marginHorizontal: 20, width: "50%" },
  viewStyle: {
    flexDirection: "row",
    marginHorizontal: 30,
  },
  cancelBtn: {
    backgroundColor: "#EEF2F3",
    height: 45,
    width: "50%",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  saveBtn: {
    backgroundColor: "#FC5285",
    height: 45,
    width: "50%",
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
  dropDownContentView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 5,
  },
  dropDownDotView: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: config.colors.appTheme1,
  },
  dropDownListText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
    marginLeft: 10,
    textTransform: "capitalize",
  },
  attachmentViewStyle: {
    width: "47%",
    height: 40,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    borderColor: config.colors.appTheme1,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  docImage: { width: 20, height: 20, resizeMode: "contain" },
  contentText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 13,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  closeIconView: { alignItems: "flex-end", margin: 20 },
  closeIcon: { width: 24, height: 24, resizeMode: "contain" },
  contentView: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentImage: { width: "100%", height: "30%" },
  pdf: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    flex: 1,
  },
});

export default PateintActions;
