import CardView from "../../components/CardView";import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { LCGButton, AttachementViewer } from "../../components";
import config from "../../config";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import { CommonUtils, EnumUtils } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { PlanAdd, PlanList } from "../../reduxStates";
import { WebView } from 'react-native-webview';

const AddPlan = ({ navigation, route }) => {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [imageshow, setImageShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const [dataUrl, setDataUrl] = useState("");

  const dispatch = useDispatch();

  //Selectors
  const AddPlanResponse = useSelector(PlanAdd.selectAddPlan);
  const PlanListData = useSelector(PlanList.selectPlanList);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  useEffect(() => {
    callPlanHistoryApi();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(PlanAdd.saveAddPlan(null));
    };
  }, [navigation]);

  useEffect(() => {
    if (AddPlanResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: AddPlanResponse?.message,
      });
      setTimeout(()=>{
        navigation.goBack();
      },500)
     
    }
  }, [AddPlanResponse]);

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
    if (note == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NOTE,
      });
    } else {
      callAddPlanApi();
    }
  };

  const callAddPlanApi = () => {
    const payload = {
      text: note,
      patientId: route?.params?.idPatient,
      upload: attachments,
    };
    dispatch({
      type: "ADD_PLAN",
      payload,
    });
  };

  const callPlanHistoryApi = () => {
    const payload = {
      uri: `${route?.params?.idPatient}`,
    };
    dispatch({
      type: "GET_PLAN_LIST",
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.addplanCard}>
            <Text style={styles.addplanText}>
              {config.strings.OTHERS.ADD_PLAN}
            </Text>

            <TextInput
              style={styles.addplanInput}
              textAlignVertical="top"
              multiline={true}
              placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.TYPE_HERE}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(val) => setNote(val)}
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

            <View>
              <AttachementViewer dataAttachment={attachments} />
            </View>
          </View>

          <ImageSelectModal />

          <LCGButton
            containerStyle={styles.buttonContainer}
            buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
            onPress={() => onPressSubmit()}
          />

          {PlanListData?.data?.length > 0 && (
            <View>
              <Text style={styles.planText}>
                {config.strings.OTHERS.PLAN_HISTORY}
              </Text>

              <FlatList
                data={PlanListData?.data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.planCard}>
                      <Text style={styles.listText}>{item?.text}</Text>
                      {item?.files?.length > 0 &&
                        item?.files.map((_item, indx) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={0.4}
                              onPress={() => onPressView(_item)}
                              style={styles.blankView}
                            >
                              <View>
                                <Image
                                  style={styles.blankImg}
                                  source={
                                    _item?.type == "pdf"
                                      ? require("../../assets/images/Document.png")
                                      : require("../../assets/images/Gallery.png")
                                  }
                                />
                              </View>
                              <View style={styles.mbnameView}>
                                <Text
                                  numberOfLines={1}
                                  style={styles.imgnameText}
                                >
                                  {_item?.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      <Text style={styles.dateText}>
                        {item?.updatedAt != null &&
                          moment(new Date(item?.updatedAt)).format(
                            "DD/MM/YYYY"
                          )}
                        ,{"  "}
                        {item?.updatedAt != null &&
                          moment(new Date(item?.updatedAt), "HH:mm").format(
                            "hh:mm A"
                          )}
                      </Text>
                    </View>
                  </>
                )}
              />
            </View>
          )}

          <ImageViewModal />
          <PdfViewModal />
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
  addplanCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  addplanText: {
    fontSize: 13,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
  addplanInput: {
    height: 100,
    borderWidth: 1.5,
    borderColor: "#DADFEB",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#FC5285",
    height: 40,
    width: "85%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  submitBtnText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  clipImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginHorizontal: 13,
  },
  blankImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  imgStyle: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 5,
  },
  planCard: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  planText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginHorizontal: 20,
    marginTop: 20,
  },
  listText: {
    fontSize: 14,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
  imgnameText: {
    fontSize: 13,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
  mbText: {
    fontSize: 9,
    color: "#8D939E",
    fontWeight: "400",
  },
  dateText: {
    marginTop: 8,
    fontSize: 11,
    color: "#A1A7B3",
    fontWeight: "400",
  },
  blankView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  mbnameView: {
    flexDirection: "column",
    marginLeft: 10,
    width: "50%",
  },
  buttonContainer: { marginVertical: 30, marginHorizontal: 20 },
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

export default AddPlan;
