import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import CardView from '../../components/CardView';
import fontFamily from "../../config/fontFamily";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";

import {
  LCGButton,
  LCGAvatar,
  LCGDropDown,
  LCGCenterModal,
  LCGTextInput,
} from "../../components";
const { width, height } = Dimensions.get("screen");
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  User,
  UpdateLabourStatus,
  AddLcg,
  CompleteDelivery,
  ListBaby,
  BabyAdd,
  UpdateBaby,
  DecisionLcg,
  DetailLcg,
  DetailPatient,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";

const STARTED = "started";
const NOT_STARTED = "not-started";
const COMPLETED = "delivery-completed";

const COMPANIEN = ["Y", "N", "D"];
const PAINRELIEF = ["Y", "N", "D"];
const ORAL_FLUID = ["Y", "N", "D"];
const POSTURE = ["SP", "MO"];

const FHR_DECLARARTION = ["N", "E", "L", "V"];
const ANOMATIC_FLUID = ["I", "C", "M +", "M ++", "M +++", "B"];
const FETAL_POSITION = ["A", "P", "T"];
const CAPUT = ["0", "+", "++", "+++"];
const MOULDING = ["0", "+", "++", "+++"];

const URINE = ["P", "P Trace", "P +", "P ++", "P +++"];
const ACETONE = ["A", "A +", "A ++", "A +++", "A ++++"];

const PatientDetail = (props) => {
  const { route, navigation } = props;

  const [supprotVisible, setSupportVisible] = useState(false);
  const [babyVisible, setBabyVisible] = useState(false);
  const [womenVisible, setWomenVisible] = useState(false);
  const [labourVisible, setLabourVisible] = useState(false);
  const [medicationVisible, setMedicationVisible] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [demoShow, setDemoShow] = useState(false);
  const [status, setStatus] = useState("");
  const [detailPateint, setDetailPateint] = useState();
  const [isLabourDiag, setIsLabourDiag] = useState("no");
  const [showLabourDate, setShowLabourDate] = useState(false);
  const [labourDate, setLabourDate] = useState("");
  const [labourUpdatedDate, setUpdatedLabourDate] = useState("");
  const [labourTime, setLabourTime] = useState("");
  const [showLabourTime, setShowLabourTime] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

  const [idPatient, setPatientID] = useState("");

  //DropDown States
  const [compShow, setCompShow] = useState(false);
  const [comp, setComp] = useState("");
  const [painShow, setPainShow] = useState(false);
  const [pain, setPain] = useState("");
  const [oralShow, setOralShow] = useState(false);
  const [oral, setOral] = useState("");
  const [postShow, setPostShow] = useState(false);
  const [posture, setPosture] = useState("");

  const [fhrShow, setFhrShow] = useState(false);
  const [fhrDeclare, setFhrDeclare] = useState("");
  const [amniFluidShow, setAmniFluidShow] = useState(false);
  const [amniFluid, setAmniFluid] = useState("");
  const [fetalShow, setFetalShow] = useState(false);
  const [fetal, setFetal] = useState("");
  const [caputShow, setCaputShow] = useState(false);
  const [caput, setCaput] = useState("");
  const [mouldingShow, setMouldingShow] = useState(false);
  const [moulding, setMoulding] = useState("");

  const [urineShow, setUrineShow] = useState(false);
  const [urine, setUrine] = useState("");
  const [aceShow, setAceShow] = useState(false);
  const [aceTone, setAceTone] = useState("");

  const [ivFluid, setIvFluid] = useState("");

  const [baseFhr, setBaseFhr] = useState("");
  const [pulse, setPulse] = useState("");
  const [systolicBp, setSystolicBp] = useState("");
  const [dialosticBp, setDialosticBp] = useState("");
  const [temp, setTemp] = useState("");
  const [durContra, setDurContra] = useState("");
  const [contraMin, setContraMin] = useState("");
  const [cervix, setCervix] = useState("");
  const [decent, setDecent] = useState("");
  const [oxyCoin, setOxyCoin] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);
  const [timeHours, setTimeHours] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showSlotDropDown, setshowSlotDropDown] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Time");

  const dispatch = useDispatch();
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  //Selctors
  const LabourStatusResponse = useSelector(
    UpdateLabourStatus.selectLabourStatus
  );
  const AddLcgResponse = useSelector(AddLcg.selectLcgAdd);
  const BabyListResponse = useSelector(ListBaby.selectBabyList);
  const AddBabyResponse = useSelector(BabyAdd.selectAddBaby);
  const EditBabyResponse = useSelector(UpdateBaby.selectEditBaby);
  const DecisionMakeResponse = useSelector(DecisionLcg.selectDecisionLcg);
  const DetailLcgResponse = useSelector(DetailLcg.selectDetailLCG);
  const PatientData = useSelector(DetailPatient.selectDetailPatient);

  useEffect(() => {
    if (DecisionMakeResponse?.success == true) {
      setDemoShow(false);
      setAssessment("");
      setPlan("");
      setSupportVisible(false);
      setBabyVisible(false);
      setWomenVisible(false);
      setLabourVisible(false);
      setMedicationVisible(false);
    }
  }, [DecisionMakeResponse]);

  useEffect(() => {
    if (PatientData?.success == true) {
      setDetailPateint(PatientData?.data);
      timeSlotHour();
      setStatus(PatientData?.data?.labourStatus);
    }
  }, [PatientData]);

  useEffect(() => {
    if (AddLcgResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: AddLcgResponse?.data?.message,
      });
      clearSetValue();
      callPatientDetailApi();
    }
  }, [AddLcgResponse]);

  const clearSetValue = () => {
    setComp("");
    setPain("");
    setOral("");
    setPosture("");
    setFhrDeclare("");
    setAmniFluid("");
    setFetal("");
    setCaput("");
    setMoulding("");
    setUrine("");
    setAceTone("");
    setDemoShow(true);
    setBaseFhr("");
    setPulse("");
    setSystolicBp("");
    setDialosticBp("");
    setTemp("");
    setDurContra("");
    setContraMin("");
    setCervix("");
    setDecent("");
    setOxyCoin("");
    setAssessment(AddLcgResponse?.data?.data?.decision?.assessment);
    setPlan(AddLcgResponse?.data?.data?.decision?.plan);
  };

  useEffect(() => {
    if (LabourStatusResponse?.success == true) {
      navigation.goBack();
    }
  }, [LabourStatusResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callPatientDetailApi();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(UpdateLabourStatus.saveLabourStatus(null));
      dispatch(AddLcg.saveLcgAdd(null));
    };
  }, [navigation]);

  useEffect(() => {
    setStatus(route?.params?.details?.labourStatus);
  }, [route?.params?.details]);

  const SupportiveCareView = () => {
    return (
      <View style={styles.fluidMedicationView}>
        <Pressable
          onPress={() => onPressMenuDropDwon("support")}
          style={styles.fluidMedicationSubView}
        >
          <Text style={styles.biShopHeadigText}>
            {config.strings.OTHERS.SUPPROTIVE_CARE}
          </Text>
          <View style={styles.medicationSubView}>
            <Text style={styles.contentText}>
              Last Updated at{" "}
              {formatLastUpdatedTime(
                PatientData?.data?.lcgUpdates?.supportiveCare
              )}
            </Text>
            <Image
              source={require("../../assets/images/RightArrow.png")}
              style={styles.rightArrowImg}
            />
          </View>
        </Pressable>

        {supprotVisible == true && (
          <>
            <View style={styles.dropDownContentView}>
              <View style={styles.dropOptionConatiner}>
                <Text style={styles.bioShopLabelText}>
                  {config.strings.OTHERS.COMPANIEN}
                </Text>
                <Pressable onPress={() => setCompShow(!compShow)}>
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                    rightAccessorySize={16}
                    textInputProps={{
                      value: comp,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>
                <LCGDropDown
                  dropVisible={compShow}
                  listData={COMPANIEN}
                  viewStyle={styles.dropDownViewStyle}
                  renderContent={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setComp(item);
                          setCompShow(false);
                        }}
                        style={styles.dropDownDataView}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={styles.dropOptionConatiner}>
                <Text style={styles.bioShopLabelText}>
                  {config.strings.OTHERS.PAINRELIEF}
                </Text>
                <Pressable onPress={() => setPainShow(!painShow)}>
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                    rightAccessorySize={16}
                    textInputProps={{
                      value: pain,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>
                <LCGDropDown
                  dropVisible={painShow}
                  listData={PAINRELIEF}
                  viewStyle={styles.dropDownViewStyle}
                  renderContent={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setPain(item), setPainShow(false);
                        }}
                        style={styles.dropDownDataView}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            <View style={styles.dropDownContentView}>
              <View style={styles.dropOptionConatiner}>
                <Text style={styles.bioShopLabelText}>
                  {config.strings.OTHERS.ORAL_FLUID}
                </Text>
                <Pressable onPress={() => setOralShow(!oralShow)}>
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                    rightAccessorySize={16}
                    textInputProps={{
                      value: oral,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>
                <LCGDropDown
                  dropVisible={oralShow}
                  listData={ORAL_FLUID}
                  viewStyle={styles.dropDownViewStyle}
                  renderContent={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setOral(item), setOralShow(false);
                        }}
                        style={styles.dropDownDataView}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={styles.dropOptionConatiner}>
                <Text style={styles.bioShopLabelText}>
                  {config.strings.OTHERS.POSTURE}
                </Text>
                <Pressable onPress={() => setPostShow(!postShow)}>
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                    rightAccessorySize={16}
                    textInputProps={{
                      value: posture,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>
                <LCGDropDown
                  dropVisible={postShow}
                  listData={POSTURE}
                  viewStyle={styles.dropDownViewStyle}
                  renderContent={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setPosture(item), setPostShow(false);
                        }}
                        style={styles.dropDownDataView}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  const PateintDetailView = () => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            navigation.navigate(config.routes.ADD_PATIENT, {
              patDetail: detailPateint,
              from: "edit",
            })
          }
          style={styles.delDetailsSubView}
        >
          <Text style={styles.patNameText}>{detailPateint?.name}</Text>
          <Image
            source={require("../../assets/images/Edit.png")}
            style={styles.clockImage}
          />
        </Pressable>

        <View style={styles.patIdAgeView}>
          <View style={styles.patIdAgeSubView}>
            <Text style={styles.labelText}>Pateint Id:</Text>
            <Text style={styles.contentText}>{detailPateint?.patientId}</Text>
          </View>
          <View style={{ ...styles.patIdAgeSubView, marginLeft: 10 }}>
            <Text style={styles.labelText}>Age:</Text>
            <Text style={styles.contentText}>{detailPateint?.age}</Text>
          </View>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>UHID:</Text>
          <Text style={styles.contentText}>{detailPateint?.UHID}</Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Ward Name:</Text>
          <Text style={styles.contentText}>{detailPateint?.wardName}</Text>
        </View>

        <View style={styles.viewMedication}>
          <View style={styles.patIdAgeSubView}>
            <Text style={styles.labelText}>Obstetric Formula:</Text>
            <Text style={styles.contentText}>
              {detailPateint?.obstetricFormula}
            </Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate(config.routes.VIEW_PARITY, {
                patId: detailPateint?.patientId,
              })
            }
          >
            <Text style={styles.biShopcontentText}>
              {config.strings.OTHERS.VIEW_PARITY}
            </Text>
          </Pressable>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Labour Onset:</Text>
          <Text style={styles.contentText}>
            {detailPateint?.labourOnSet?.time != null
              ? moment(new Date(detailPateint?.labourOnSet?.time)).format(
                  "YYYY-MM-DD"
                )
              : "--"}
            ,{"  "}
            {detailPateint?.labourOnSet?.time != null &&
              moment(
                new Date(detailPateint?.labourOnSet?.time),
                "HH:mm"
              ).format("hh:mm A")}
          </Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Active Labour Diagnosis:</Text>
          <Text style={styles.contentText}>
            {detailPateint?.activeLabourDignosis?.time != null
              ? moment(
                  new Date(detailPateint?.activeLabourDignosis?.time)
                ).format("YYYY-MM-DD")
              : "--"}
            ,
            {detailPateint?.activeLabourDignosis?.time != null &&
              moment(
                new Date(detailPateint?.activeLabourDignosis?.time),
                "HH:mm"
              ).format("hh:mm A")}
          </Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Ruptured Membrane:</Text>
          <Text style={styles.contentText}>
            {detailPateint?.membrane?.time != null
              ? moment(new Date(detailPateint?.membrane?.time)).format(
                  "YYYY-MM-DD"
                )
              : "--"}
            ,{"  "}
            {detailPateint?.membrane?.time != null &&
              moment(new Date(detailPateint?.membrane?.time), "HH:mm").format(
                "hh:mm A"
              )}
          </Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Risk Factors:</Text>
          <Text style={styles.contentText}>{detailPateint?.riskFactor}</Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Contraceptives used:</Text>
          <Text style={styles.contentText}>
            {detailPateint?.contraceptivesUsed}
          </Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Date of Admission:</Text>
          <Text style={styles.contentText}>
            {detailPateint?.dateOfAdmission}
          </Text>
        </View>

        {status == COMPLETED && (
          <View style={styles.patIdAgeSubView}>
            <Text style={styles.labelText}>Date and Time of Delivery:</Text>
            <Text style={styles.contentText}>
              {detailPateint?.delivery?.time != null &&
                moment(new Date(detailPateint?.delivery?.time)).format(
                  "YYYY-MM-DD"
                )}
              ,{"  "}
              {detailPateint?.delivery?.time != null &&
                moment(new Date(detailPateint?.delivery?.time), "HH:mm").format(
                  "hh:mm A"
                )}
            </Text>
          </View>
        )}

        <View style={styles.biShopConatiner}>
          <View style={styles.bioScroreButtonContainer}>
            <Text style={styles.biShopHeadigText}>
              {config.strings.OTHERS.BISHOP_SCRORING}
            </Text>
            {status != COMPLETED && (
              <Pressable
                onPress={() =>
                  navigation.navigate(config.routes.CALUCULATE_BISHOP, {
                    idPatient: detailPateint?.patientId,
                    bishopData: detailPateint.bishopScores,
                  })
                }
                style={styles.calculateButtonView}
              >
                <Text style={styles.calculateButtonText}>
                  {config.strings.OTHERS.CALCULATE}
                </Text>
              </Pressable>
            )}
          </View>
          {PatientData?.data?.bishopScores?.length > 0 &&
            PatientData?.data?.bishopScores?.map((itemScore, ind) => (
              <View style={styles.patIdAgeSubView}>
                <Text style={styles.bioShopLabelText}>
                  Cervix Diameter {itemScore?.cervixDiameter}
                </Text>
                <Text style={styles.biShopcontentText}>
                  = {itemScore?.bishopScore}
                </Text>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate(config.routes.MEDICATION_LIST, {
              patId: detailPateint?.patientId,
            })
          }
          style={styles.biShopConatiner}
        >
          <View style={styles.viewMedication}>
            <Text style={styles.bioShopLabelText}>
              {config.strings.OTHERS.OTHER_MDEICATION}
            </Text>
            <View style={styles.medicationSubView}>
              <Image
                source={require("../../assets/images/RightArrow.png")}
                style={styles.rightArrowImg}
              />
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate(config.routes.VIEW_LCG, {
              patId: detailPateint?.patientId,
            })
          }
          style={styles.viewLCGConatiner}
        >
          <View style={styles.viewLCGButtonView}>
            <View style={styles.viewLCGImgTextView}>
              <Image
                source={require("../../assets/images/pregnant.png")}
                style={styles.rightArrowImg}
              />
              <Text style={styles.viewLCGButtonText}>
                {config.strings.BTN_TEXTS.VIEW_LCG}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const onChangeTextBase = (val) => {
    setBaseFhr(val);
  };

  const onPressMenuDropDwon = (_type) => {
    if (_type == "support") {
      setSupportVisible(!supprotVisible);
    } else if (_type == "baby") {
      setBabyVisible(!babyVisible);
    } else if (_type == "women") {
      setWomenVisible(!womenVisible);
    } else if (_type == "labour") {
      setLabourVisible(!labourVisible);
    } else if (_type == "medication") {
      setMedicationVisible(!medicationVisible);
    }
  };

  const DeliveryCompltedView = () => {
    return (
      <>
        <View style={styles.deliveryCompletedView}>
          <Text style={{ ...styles.patNameText, color: "#0FBB73" }}>
            {config.strings.OTHERS.DELIVERY_COMPLETED}
          </Text>
          <Image
            source={require("../../assets/images/badge.png")}
            style={styles.badgeImage}
          />
        </View>

        <View style={styles.delivryDetailsCardView}>
          <Pressable
            onPress={() =>
              navigation.navigate(config.routes.DELIVERY_COMPLETED, {
                from: "edit",
                idPat: detailPateint?.patientId,
                detailDeliver: detailPateint?.delivery,
              })
            }
            style={styles.delDetailsSubView}
          >
            <Text style={styles.patNameText}>
              {config.strings.OTHERS.DELIVERY_DETAILS}
            </Text>
            <Image
              source={require("../../assets/images/Edit.png")}
              style={styles.clockImage}
            />
          </Pressable>

          <View style={styles.startCompleteView}>
            <View>
              <Text style={{ ...styles.patNameText, marginVertical: 13 }}>
                Completed Date & Time
              </Text>
              <View style={styles.deliveryStatusView}>
                <Image
                  source={require("../../assets/images/DarkClockIcon.png")}
                  style={styles.deliveryStatusImage}
                />
                <Text style={{ ...styles.labelText, marginLeft: 10 }}>
                  {moment(new Date(detailPateint?.delivery?.time)).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  ,
                  {moment(
                    new Date(detailPateint?.delivery?.time),
                    "HH:mm"
                  ).format("hh:mm A")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sepratorStyle}></View>

          <View style={{ ...styles.patIdAgeSubView, marginTop: 15 }}>
            <Text style={styles.labelText}>Delivery Type:</Text>
            <Text style={styles.contentText}>
              {detailPateint?.delivery?.deliveryType}
            </Text>
          </View>

          <Text style={styles.surgoryNoteText}>Surgery Note:</Text>
          <Text style={{ ...styles.labelText, marginVertical: 5 }}>
            {detailPateint?.delivery?.note}
          </Text>

          <View
            style={{
              ...styles.patIdAgeSubView,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.labelText}>Operating Surgeon</Text>
            <Text style={styles.contentText}>
              {detailPateint?.delivery?.operatingSurgeon ?? "-"}
            </Text>
          </View>

          <View
            style={{
              ...styles.patIdAgeSubView,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.labelText}>Anaesthetic</Text>
            <Text style={styles.contentText}>
              {detailPateint?.delivery?.anaesthetic ?? "-"}
            </Text>
          </View>

          <View
            style={{
              ...styles.patIdAgeSubView,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.labelText}>Paediatrician</Text>
            <Text style={styles.contentText}>
              {detailPateint?.delivery?.paediatrician ?? "-"}
            </Text>
          </View>

          <View style={styles.sepratorStyle}></View>

          <View
            style={{
              ...styles.patIdAgeSubView,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.patNameText}>Number of Babies Delivered.:</Text>
            <Text style={styles.biShopcontentText}>
              {detailPateint?.delivery?.numberOfBabies}
            </Text>
          </View>
        </View>

        {detailPateint?.babyDetails?.length > 0 &&
          detailPateint?.babyDetails?.map((_item, indx) => (
            <View
              style={{ ...styles.delivryDetailsCardView, marginBottom: 10 }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate(config.routes.ADD_BABY, {
                    from: "edit",
                    babyData: _item,
                    patId: detailPateint?.patientId,
                  })
                }
                style={styles.delDetailsSubView}
              >
                <Text style={styles.babyTitleText}>Baby {indx + 1}</Text>
                <Image
                  source={require("../../assets/images/Edit.png")}
                  style={styles.clockImage}
                />
              </Pressable>

              <View style={styles.babyStausView}>
                <View>
                  <Text style={styles.labelText}>Baby Status:</Text>
                  <Text style={styles.babyStusText}>{_item?.status}</Text>
                </View>

                <View>
                  <Text style={styles.labelText}>Baby Sex:</Text>
                  <Text style={styles.babyStusText}>{_item?.sex}</Text>
                </View>
              </View>

              <Text style={styles.apgarTextHeading}>APGAR Score:</Text>

              <View style={styles.apgScoreView}>
                <View style={styles.apgScoreSubView}>
                  <Text style={styles.labelText}>
                    {config.strings.OTHERS.ONEMIN} =
                  </Text>
                  <Text style={styles.biShopcontentText}>
                    {_item?.apgar?.oneMin}
                  </Text>
                </View>

                <View style={styles.apgScoreSubView}>
                  <Text style={styles.labelText}>
                    {config.strings.OTHERS.FIVEMIN} =
                  </Text>
                  <Text style={styles.biShopcontentText}>
                    {_item?.apgar?.fiveMin}
                  </Text>
                </View>
              </View>

              <View style={styles.apgScoreView}>
                <View style={styles.apgScoreSubView}>
                  <Text style={styles.labelText}>
                    {config.strings.OTHERS.TENMIN} =
                  </Text>
                  <Text style={styles.biShopcontentText}>
                    {_item?.apgar?.tenMins}
                  </Text>
                </View>

                <View style={styles.apgScoreSubView}>
                  <Text style={styles.labelText}>
                    {config.strings.OTHERS.TWENTYMIN} =
                  </Text>
                  <Text style={styles.biShopcontentText}>
                    {_item?.apgar?.twentyMins}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.labelText}>Baby Weight(In Kg)</Text>
                <Text style={styles.babyStusText}>{_item?.weight}</Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.labelText}>Breast Feeding Started</Text>
                <Text style={styles.babyStusText}>
                  {_item?.breastFeeding?.started == true ? "Yes" : "No"}{" "}
                  {_item?.breastFeeding?.withinOneHour == true
                    ? "(Within 1 hour)"
                    : ""}
                  {_item?.breastFeeding?.moreThanOneHour == true
                    ? "(More than 1 hour)"
                    : ""}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.labelText}>Note:</Text>
                <Text style={styles.babyStusText}>{_item?.notes}</Text>
              </View>
            </View>
          ))}

        <View style={styles.footerCard}>
          <Image
            style={styles.babyImg}
            source={require("../../assets/images/Newbaby.png")}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addbabyBtn}
            onPress={() =>
              navigation.navigate(config.routes.ADD_BABY, {
                patId: detailPateint?.patientId,
                from: "add",
              })
            }
          >
            <Text style={styles.addbabyText}>Add Baby</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const showLabourDatePicker = () => {
    setShowLabourDate(!showLabourDate);
  };

  const hideLabourDatePicker = () => {
    setShowLabourDate(false);
  };

  const handleConfirmLabour = (date) => {
    formatDateLabour(date);
  };

  const formatDateLabour = (_date) => {
    const formattedDate = moment(_date).format("YYYY-MM-DD");
    setLabourDate(formattedDate);
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
    setLabourTime(formattedDate);
    setUpdatedLabourDate(_time);
  };

  const callUpdateStatusApi = () => {
    if (labourDate == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_DATE,
      });
    } else if (labourTime == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_TIME,
      });
    } else {
      const payload = {
        patientId: detailPateint?.patientId,
        date: `${labourUpdatedDate}`,
      };
      dispatch({
        type: "UPDATE_LABOUR_STATUS",
        payload,
      });
    }
  };

  const callAddLcgDetailsApi = () => {
    if (selectedTimeSlot == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.SELECT_TIMESLOT,
      });
    } else {
      var payload = {
        patientId: detailPateint?.patientId,
        timeSlot: selectedTimeSlot,
      };
      if (comp != "" || pain != "" || oral != "" || posture != "") {
        payload["supportiveCare"] = {
          companionship: comp,
          painRelief: pain,
          oralFluid: oral,
          posture: posture,
        };
      }
      if (
        fhrDeclare != "" ||
        baseFhr != "" ||
        amniFluid != "" ||
        fetal != "" ||
        caput != "" ||
        moulding != ""
      ) {
        payload["baby"] = {
          FHRDeceleration: fhrDeclare,
          baselineFHR: baseFhr,
          amnioticFluid: amniFluid,
          fetalPosition: fetal,
          caput: caput,
          moulding: moulding,
        };
      }
      if (
        urine != "" ||
        aceTone != "" ||
        pulse != "" ||
        systolicBp != "" ||
        dialosticBp != "" ||
        temp != "" ||
        contraMin != "" ||
        durContra != ""
      ) {
        payload["women"] = {
          urine: urine,
          acetone: aceTone,
          pulse: pulse,
          systolicBP: systolicBp,
          diastolicBP: dialosticBp,
          temperature: temp,
          contraction: contraMin,
          contractionDuration: durContra,
        };
      }

      if (cervix != "" || decent != "") {
        payload["labourProgress"] = {
          cervix: cervix,
          decent: decent,
        };
      }

      if (oxyCoin != "" || ivFluid != "") {
        payload["medication"] = {
          oxytocin: oxyCoin,
          ivFluids: ivFluid,
        };
      }
      console.log("Payload", payload);

      dispatch({
        type: "ADD_LCG",
        payload,
      });
    }
  };

  const formatLastUpdatedTime = (_time) => {
    if (_time && _time != "") {
      const formattedDate = moment(_time).format("hh:mm A");
      return formattedDate;
    }
  };

  const onPressDecisionUpdate = () => {
    if (assessment == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ASSESMENT,
      });
    } else if (plan == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NOTE,
      });
    } else {
      const payload = {
        patientId: detailPateint?.patientId,
        lcgId: AddLcgResponse?.data?.data?.lcgId,
        assessment: assessment,
        plan: plan,
      };
      dispatch({
        type: "LCG_DECISION",
        payload,
      });
    }
  };

  const callPatientDetailApi = () => {
    const payload = {
      uri: `${route?.params?.details?.patientId}`,
    };
    dispatch({
      type: "PATEINT_DETAIL",
      payload,
    });
  };

  const onPressDecisionCancel = () => {
    setDemoShow(false);
    setAssessment("");
    setPlan("");
    setSupportVisible(false);
    setBabyVisible(false);
    setWomenVisible(false);
    setLabourVisible(false);
    setMedicationVisible(false);
  };

  const getLabourTimeSlots = () => {
    let conDate = new Date(detailPateint?.activeLabourDignosis?.time);
    //let res = moment(conDate, "HH:mm").format("hh:mm A");
    var a = moment(conDate); //now
    var b = moment();
    let timeDiff = b.diff(a, "minutes");
    console.log("timeDiff", timeDiff);
    //let timeDiff = 900;
    let extraTime = 0;
    if (timeDiff > 720) {
      extraTime = timeDiff - 720;
      // timeDiff = 720;
    }
    const slots = [];
    if (timeDiff <= 720) {
      let result = parseInt(timeDiff / 30);

      for (let i = 0; i <= result; i++) {
        let interval = moment(detailPateint?.activeLabourDignosis?.time).add(
          i * 30,
          "minutes"
        );

        let slotTime = moment(interval, "HH:mm").format("hh:mm A");
        var obj = {
          slotName: slotTime,
          interval: interval,
        };
        slots.push(obj);
      }
    } else {
      let extraresult = parseInt(extraTime / 15);
      for (let i = 0; i <= extraresult; i++) {
        let interval = moment(detailPateint?.activeLabourDignosis?.time).add(
          i * 15 + 720,
          "minutes"
        );

        let slotTime = moment(interval, "HH:mm").format("hh:mm A");
        var obj = {
          slotName: slotTime,
          interval: interval,
        };
        slots.push(obj);
      }
    }

    // const uniqueIds = [];

    // const unique = slots.filter((element) => {
    //   const isDuplicate = uniqueIds.includes(element?.slotName);

    //   if (!isDuplicate) {
    //     uniqueIds.push(element?.slotName);

    //     return true;
    //   }

    //   return false;
    // });
    setTimeSlots(slots);
    setshowSlotDropDown(!showSlotDropDown);
  };

  const timeSlotHour = () => {
    const dateOneObj = new Date(PatientData?.data?.activeLabourDignosis?.time);
    const dateTwoObj = new Date();
    const milliseconds = Math.abs(dateTwoObj - dateOneObj);
    const hours = milliseconds / 36e5;

    setTimeHours(parseInt(hours).toFixed(0));

    // const formatStartTime =
    //   new Date(PatientData?.data?.activeLabourDignosis?.time).getHours() +
    //   ":" +
    //   new Date(PatientData?.data?.activeLabourDignosis?.time).getMinutes() +
    //   ":" +
    //   new Date(PatientData?.data?.activeLabourDignosis?.time).getSeconds();

    // const formatEndTime =
    //   new Date().getHours() +
    //   ":" +
    //   new Date().getMinutes() +
    //   ":" +
    //   new Date().getSeconds();

    // console.log("St", formatStartTime);
    // console.log("End", formatEndTime);
  };

  const onPressTimeSlot = (value) => {
    setSelectedTimeSlot(value?.interval);
    setSelectedTime(value?.slotName);
    setshowSlotDropDown(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <PateintDetailView />

          {status != COMPLETED && (
            <View style={styles.startDeliveryContainer}>
              {status == NOT_STARTED && (
                <>
                  <Text style={styles.drugText}>
                    {config.strings.TEXT_INPUT_LABELS.IS_LABOUR_DIAGNOSIS}
                  </Text>

                  <View style={styles.viewStyle}>
                    <TouchableOpacity
                      onPress={() => setIsLabourDiag("yes")}
                      style={styles.radioOptionView}
                    >
                      <Image
                        style={styles.img}
                        source={
                          isLabourDiag == "yes"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                      />
                      <Text style={styles.maleText}>
                        {config.strings.BTN_TEXTS.YES}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setIsLabourDiag("no")}
                      style={styles.radioOptionView}
                    >
                      <Image
                        style={styles.img}
                        source={
                          isLabourDiag == "no"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                      />
                      <Text style={styles.femaleText}>
                        {config.strings.BTN_TEXTS.NO}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {isLabourDiag == "yes" && (
                    <View style={styles.dateTimeContainerView}>
                      <Pressable
                        style={styles.pressableWidth}
                        onPress={() => showLabourDatePicker()}
                      >
                        <LCGTextInput
                          containerStyle={styles.inputContainer}
                          rightAccessory={config.iconNames.CALENDAR}
                          rightAccessorySize={20}
                          rightAccessoryStyle={{ color: "black" }}
                          textInputProps={{
                            value: labourDate,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.DATE,
                            keyboardType: config.keyboardTypes.DEFAULT,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.WORDS,
                            editable: false,
                          }}
                        />
                      </Pressable>

                      <View style={styles.timeView} />

                      <Pressable
                        style={styles.pressableWidth}
                        onPress={() => showLabourTimePicker()}
                      >
                        <LCGTextInput
                          containerStyle={styles.inputContainer}
                          rightAccessory={config.iconNames.CLOCK}
                          rightAccessorySize={20}
                          rightAccessoryStyle={{ color: "black" }}
                          textInputProps={{
                            value: labourTime,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.TIME,
                            keyboardType: config.keyboardTypes.DEFAULT,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.WORDS,
                            editable: false,
                          }}
                        />
                      </Pressable>
                    </View>
                  )}
                </>
              )}

              <DateTimePickerModal
                isVisible={showLabourDate}
                mode="date"
                onConfirm={handleConfirmLabour}
                onCancel={hideLabourDatePicker}
              />

              <DateTimePickerModal
                isVisible={showLabourTime}
                mode="time"
                onConfirm={handleConfirmTimeLabour}
                onCancel={hideLabourTimePicker}
              />

              {status == STARTED && (
                <Pressable
                  onPress={() =>
                    navigation.navigate(config.routes.DELIVERY_COMPLETED, {
                      idPat: detailPateint?.patientId,
                    })
                  }
                  style={styles.startdeliveryButtonView}
                >
                  <Text
                    style={[styles.patNameText, { color: config.colors.white }]}
                  >
                    {config.strings.OTHERS.COMPLETE_DELIVERY}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {status == STARTED && (
            <>
              <View style={styles.deliveryStartedTimeView}>
                <View style={styles.timeSubView}>
                  <Image
                    source={require("../../assets/images/DarkClock.png")}
                    style={styles.clockImage}
                  />
                  <Text
                    style={[
                      styles.patNameText,
                      { marginLeft: 20, fontSize: 14,  },
                    ]}
                  >
                    Labour Started at{" "}
                    {moment(
                      new Date(detailPateint?.activeLabourDignosis?.time)
                    ).format("DD/MM/YYYY")}
                    ,{"  "}
                    {moment(
                      new Date(detailPateint?.activeLabourDignosis?.time),
                      "HH:mm"
                    ).format("hh:mm A")}
                  </Text>
                </View>
              </View>

              <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={6}
                style={styles.timeSlotView}
              >
                <View style={styles.timeSlotContainerView}>
                  <View style={styles.timeSlotHoriztalView}>
                    <Text
                      style={[
                        styles.timeTextStyle,
                        { color: config.colors.appTheme1 },
                      ]}
                    >
                      Select Time Slot*{" "}
                    </Text>

                    <TouchableOpacity
                      onPress={() => getLabourTimeSlots()}
                      style={styles.selectTimeView}
                    >
                      <Text style={{ marginRight: 10 }}>{selectedTime}</Text>
                      <View>
                        <Image
                          source={require("../../assets/images/DarkClock.png")}
                          style={styles.clockImage}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.hoursView}>
                    <Text style={styles.hoursText}>
                      Hours:
                      <Text style={styles.hoursDataText}>{timeHours}</Text>
                    </Text>
                  </View>
                </View>
              </CardView>

              <LCGDropDown
                dropVisible={showSlotDropDown}
                listData={timeSlots}
                renderContent={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => onPressTimeSlot(item)}
                      style={styles.timeSlotDropDownView}
                    >
                      <Text>{item?.slotName}</Text>
                    </Pressable>
                  );
                }}
                viewStyle={styles.timeSlotDropDownContainer}
              />
            </>
          )}

          {status == STARTED && demoShow == false && (
            <>
              <SupportiveCareView />
              <>
                <View style={styles.fluidMedicationView}>
                  <Pressable
                    onPress={() => onPressMenuDropDwon("baby")}
                    style={styles.fluidMedicationSubView}
                  >
                    <Text style={styles.biShopHeadigText}>
                      {config.strings.OTHERS.BABY}
                    </Text>
                    <View style={styles.medicationSubView}>
                      <Text style={styles.contentText}>
                        Last Updated at{" "}
                        {formatLastUpdatedTime(
                          PatientData?.data?.lcgUpdates?.baby
                        )}
                      </Text>
                      <Image
                        source={require("../../assets/images/RightArrow.png")}
                        style={styles.rightArrowImg}
                      />
                    </View>
                  </Pressable>

                  {babyVisible == true && (
                    <>
                      <View style={styles.dropDownContentView}>
                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.BASELINE_FHR}
                          </Text>

                          <LCGTextInput
                            onChangeText={(val) => onChangeTextBase(val)}
                            containerStyle={styles.inputContainer}
                            textInputProps={{
                              value: baseFhr,
                              placeholder:
                                config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                              keyboardType: config.keyboardTypes.NUMBER_PAD,
                              returnKeyType: config.returnKeyTypes.DONE,
                              autoCapitalize: config.autoCapitalizeTypes.NONE,
                            }}
                          />
                        </View>

                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.FHR_DECLARARTION}
                          </Text>
                          <Pressable onPress={() => setFhrShow(!fhrShow)}>
                            <LCGTextInput
                              containerStyle={styles.inputContainer}
                              rightAccessory={
                                config.iconNames.CHEVRON_DOWN_THIN
                              }
                              rightAccessorySize={16}
                              textInputProps={{
                                value: fhrDeclare,
                                placeholder:
                                  config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                                keyboardType: config.keyboardTypes.DEFAULT,
                                returnKeyType: config.returnKeyTypes.DONE,
                                autoCapitalize:
                                  config.autoCapitalizeTypes.WORDS,
                                editable: false,
                              }}
                            />
                          </Pressable>
                          <LCGDropDown
                            dropVisible={fhrShow}
                            listData={FHR_DECLARARTION}
                            viewStyle={styles.dropDownViewStyle}
                            renderContent={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setFhrDeclare(item), setFhrShow(false);
                                  }}
                                  style={styles.dropDownDataView}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.dropDownContentView}>
                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.ANOMATIC_FLUID}
                          </Text>
                          <Pressable
                            onPress={() => setAmniFluidShow(!amniFluidShow)}
                          >
                            <LCGTextInput
                              containerStyle={styles.inputContainer}
                              rightAccessory={
                                config.iconNames.CHEVRON_DOWN_THIN
                              }
                              rightAccessorySize={16}
                              textInputProps={{
                                value: amniFluid,
                                placeholder:
                                  config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                                keyboardType: config.keyboardTypes.DEFAULT,
                                returnKeyType: config.returnKeyTypes.DONE,
                                autoCapitalize:
                                  config.autoCapitalizeTypes.WORDS,
                                editable: false,
                              }}
                            />
                          </Pressable>
                          <LCGDropDown
                            dropVisible={amniFluidShow}
                            listData={ANOMATIC_FLUID}
                            viewStyle={styles.dropDownViewStyle}
                            renderContent={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setAmniFluid(item), setAmniFluidShow(false);
                                  }}
                                  style={styles.dropDownDataView}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>

                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.FETEL_POSITION}
                          </Text>
                          <Pressable onPress={() => setFetalShow(!fetalShow)}>
                            <LCGTextInput
                              containerStyle={styles.inputContainer}
                              rightAccessory={
                                config.iconNames.CHEVRON_DOWN_THIN
                              }
                              rightAccessorySize={16}
                              textInputProps={{
                                value: fetal,
                                placeholder:
                                  config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                                keyboardType: config.keyboardTypes.DEFAULT,
                                returnKeyType: config.returnKeyTypes.DONE,
                                autoCapitalize:
                                  config.autoCapitalizeTypes.WORDS,
                                editable: false,
                              }}
                            />
                          </Pressable>
                          <LCGDropDown
                            dropVisible={fetalShow}
                            listData={FETAL_POSITION}
                            viewStyle={styles.dropDownViewStyle}
                            renderContent={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setFetal(item), setFetalShow(false);
                                  }}
                                  style={styles.dropDownDataView}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.dropDownContentView}>
                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.CAPUT}
                          </Text>
                          <Pressable onPress={() => setCaputShow(!caputShow)}>
                            <LCGTextInput
                              containerStyle={styles.inputContainer}
                              rightAccessory={
                                config.iconNames.CHEVRON_DOWN_THIN
                              }
                              rightAccessorySize={16}
                              textInputProps={{
                                value: caput,
                                placeholder:
                                  config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                                keyboardType: config.keyboardTypes.DEFAULT,
                                returnKeyType: config.returnKeyTypes.DONE,
                                autoCapitalize:
                                  config.autoCapitalizeTypes.WORDS,
                                editable: false,
                              }}
                            />
                          </Pressable>
                          <LCGDropDown
                            dropVisible={caputShow}
                            listData={CAPUT}
                            viewStyle={styles.dropDownViewStyle}
                            renderContent={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setCaput(item), setCaputShow(false);
                                  }}
                                  style={styles.dropDownDataView}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>

                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.MOULDING}
                          </Text>
                          <Pressable
                            onPress={() => setMouldingShow(!mouldingShow)}
                          >
                            <LCGTextInput
                              containerStyle={styles.inputContainer}
                              rightAccessory={
                                config.iconNames.CHEVRON_DOWN_THIN
                              }
                              rightAccessorySize={16}
                              textInputProps={{
                                value: moulding,
                                placeholder:
                                  config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                                keyboardType: config.keyboardTypes.DEFAULT,
                                returnKeyType: config.returnKeyTypes.DONE,
                                autoCapitalize:
                                  config.autoCapitalizeTypes.WORDS,
                                editable: false,
                              }}
                            />
                          </Pressable>
                          <LCGDropDown
                            dropVisible={mouldingShow}
                            listData={MOULDING}
                            viewStyle={styles.dropDownViewStyle}
                            renderContent={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setMoulding(item), setMouldingShow(false);
                                  }}
                                  style={styles.dropDownDataView}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </>

              <View style={styles.fluidMedicationView}>
                <Pressable
                  onPress={() => onPressMenuDropDwon("women")}
                  style={styles.fluidMedicationSubView}
                >
                  <Text style={styles.biShopHeadigText}>
                    {config.strings.OTHERS.WOMEN}
                  </Text>
                  <View style={styles.medicationSubView}>
                    <Text style={styles.contentText}>
                      Last Updated at{" "}
                      {formatLastUpdatedTime(
                        PatientData?.data?.lcgUpdates?.women
                      )}
                    </Text>
                    <Image
                      source={require("../../assets/images/RightArrow.png")}
                      style={styles.rightArrowImg}
                    />
                  </View>
                </Pressable>

                {womenVisible == true && (
                  <>
                    <View style={styles.dropDownContentView}>
                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.PULSE}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setPulse(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: pulse,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.NONE,
                          }}
                        />
                      </View>

                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.SYSTOLICBP}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setSystolicBp(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: systolicBp,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.NONE,
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.dropDownContentView}>
                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.DIALOSTIC_BP}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setDialosticBp(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: dialosticBp,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.NONE,
                          }}
                        />
                      </View>

                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.TEMPRATUREC}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setTemp(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: temp,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.WORDS,
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.dropDownContentView}>
                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.URINE}
                        </Text>
                        <Pressable onPress={() => setUrineShow(!urineShow)}>
                          <LCGTextInput
                            containerStyle={styles.inputContainer}
                            rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                            rightAccessorySize={16}
                            textInputProps={{
                              value: urine,
                              placeholder:
                                config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                              keyboardType: config.keyboardTypes.DEFAULT,
                              returnKeyType: config.returnKeyTypes.DONE,
                              autoCapitalize: config.autoCapitalizeTypes.WORDS,
                              editable: false,
                            }}
                          />
                        </Pressable>
                        <LCGDropDown
                          dropVisible={urineShow}
                          listData={URINE}
                          viewStyle={styles.dropDownViewStyle}
                          renderContent={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setUrine(item), setUrineShow(false);
                                }}
                                style={styles.dropDownDataView}
                              >
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>

                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.ACETONE}
                        </Text>
                        <Pressable onPress={() => setAceShow(!aceShow)}>
                          <LCGTextInput
                            containerStyle={styles.inputContainer}
                            rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                            rightAccessorySize={16}
                            textInputProps={{
                              value: aceTone,
                              placeholder:
                                config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                              keyboardType: config.keyboardTypes.DEFAULT,
                              returnKeyType: config.returnKeyTypes.DONE,
                              autoCapitalize: config.autoCapitalizeTypes.WORDS,
                              editable: false,
                            }}
                          />
                        </Pressable>
                        <LCGDropDown
                          dropVisible={aceShow}
                          listData={ACETONE}
                          viewStyle={styles.dropDownViewStyle}
                          renderContent={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setAceTone(item), setAceShow(false);
                                }}
                                style={styles.dropDownDataView}
                              >
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.dropDownContentView}>
                      <View
                        style={{
                          ...styles.dropOptionConatiner,
                          width: "50%",
                        }}
                      >
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.DURATIONCONTRA}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setDurContra(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: durContra,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.NONE,
                          }}
                        />
                      </View>

                      <View style={styles.dropOptionConatiner}>
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.CONTRACTION10MIN}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setContraMin(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: contraMin,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                            keyboardType: config.keyboardTypes.NUMBER_PAD,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.NONE,
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}
              </View>

              <>
                <View style={styles.fluidMedicationView}>
                  <Pressable
                    onPress={() => onPressMenuDropDwon("labour")}
                    style={styles.fluidMedicationSubView}
                  >
                    <Text style={styles.biShopHeadigText}>
                      {config.strings.OTHERS.LABOUR_PROGRESS}
                    </Text>
                    <View style={styles.medicationSubView}>
                      <Text style={styles.contentText}>
                        Last Updated at{" "}
                        {formatLastUpdatedTime(
                          PatientData?.data?.lcgUpdates?.labourProgress
                        )}
                      </Text>
                      <Image
                        source={require("../../assets/images/RightArrow.png")}
                        style={styles.rightArrowImg}
                      />
                    </View>
                  </Pressable>

                  {labourVisible == true && (
                    <>
                      <View style={styles.dropDownContentView}>
                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.CERVIX}
                          </Text>
                          <LCGTextInput
                            onChangeText={(val) => setCervix(val)}
                            containerStyle={styles.inputContainer}
                            textInputProps={{
                              value: cervix,
                              placeholder:
                                config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                              keyboardType: config.keyboardTypes.NUMERIC,
                              returnKeyType: config.returnKeyTypes.DONE,
                              autoCapitalize: config.autoCapitalizeTypes.NONE,
                            }}
                          />
                        </View>

                        <View style={styles.dropOptionConatiner}>
                          <Text style={styles.bioShopLabelText}>
                            {config.strings.OTHERS.DECENT}
                          </Text>
                          <LCGTextInput
                            onChangeText={(val) => setDecent(val)}
                            containerStyle={styles.inputContainer}
                            textInputProps={{
                              value: decent,
                              placeholder:
                                config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                              keyboardType: config.keyboardTypes.NUMERIC,
                              returnKeyType: config.returnKeyTypes.DONE,
                              autoCapitalize: config.autoCapitalizeTypes.NONE,
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </>

              <View style={styles.fluidMedicationView}>
                <Pressable
                  onPress={() => onPressMenuDropDwon("medication")}
                  style={styles.fluidMedicationSubView}
                >
                  <Text style={styles.biShopHeadigText}>
                    {config.strings.OTHERS.MEDICATION}
                  </Text>
                  <View style={styles.medicationSubView}>
                    <Text style={styles.contentText}>
                      Last Updated at{" "}
                      {formatLastUpdatedTime(
                        PatientData?.data?.lcgUpdates?.medication
                      )}
                    </Text>
                    <Image
                      source={require("../../assets/images/RightArrow.png")}
                      style={styles.rightArrowImg}
                    />
                  </View>
                </Pressable>

                {medicationVisible == true && (
                  <>
                    <View style={styles.dropDownContentView}>
                      <View
                        style={{ ...styles.dropOptionConatiner, width: "100%" }}
                      >
                        <Text style={styles.bioShopLabelText}>
                          {config.strings.OTHERS.OXYTCOIN}
                        </Text>
                        <LCGTextInput
                          onChangeText={(val) => setOxyCoin(val)}
                          containerStyle={styles.inputContainer}
                          textInputProps={{
                            value: oxyCoin,
                            placeholder:
                              config.strings.TEXT_INPUT_PLACEHOLDERS
                                .BLANK_PLACEHOLDER,
                            keyboardType: config.keyboardTypes.DEFAULT,
                            returnKeyType: config.returnKeyTypes.DONE,
                            autoCapitalize: config.autoCapitalizeTypes.WORDS,
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.fluidsDetailsView}>
                      <Text style={styles.labelText}>
                        {config.strings.OTHERS.IVFLUID}
                      </Text>
                    </View>

                    <View style={styles.fluidsDetailsView}>
                      <Text style={styles.labelText}>
                        {config.strings.OTHERS.IS_WOMANFLUID}
                      </Text>
                    </View>

                    <View style={styles.viewStyle}>
                      <TouchableOpacity
                        onPress={() => setIvFluid("yes")}
                        style={styles.radioOptionView}
                      >
                        <Image
                          style={styles.img}
                          source={
                            ivFluid == "yes"
                              ? require("../../assets/images/RadioCheck.png")
                              : require("../../assets/images/RadioUncheck.png")
                          }
                        />
                        <Text style={styles.maleText}>
                          {config.strings.BTN_TEXTS.YES}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setIvFluid("no")}
                        style={styles.radioOptionView}
                      >
                        <Image
                          style={styles.img}
                          source={
                            ivFluid == "no"
                              ? require("../../assets/images/RadioCheck.png")
                              : require("../../assets/images/RadioUncheck.png")
                          }
                        />
                        <Text style={styles.femaleText}>
                          {config.strings.BTN_TEXTS.NO}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {route?.params?.details?.delivryStatus ==
                      "Delivery Started" && (
                      <LCGButton
                        buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
                        containerStyle={styles.buttonContainer}
                      />
                    )}
                  </>
                )}
              </View>
            </>
          )}

          {demoShow == true && (
            <>
              <View style={styles.fluidMedicationView}>
                <Pressable style={styles.fluidMedicationSubView}>
                  <Text style={styles.biShopHeadigText}>
                    Shared Decision-Making
                  </Text>
                  <View style={styles.medicationSubView}>
                    <Text style={styles.contentText}>
                      Last Updated at{" "}
                      {formatLastUpdatedTime(
                        PatientData?.data?.lcgUpdates?.decision
                      )}
                    </Text>
                    <Image
                      source={require("../../assets/images/RightArrow.png")}
                      style={styles.rightArrowImg}
                    />
                  </View>
                </Pressable>

                <View style={styles.dropDownContentView}>
                  <View
                    style={{ ...styles.dropOptionConatiner, width: "100%" }}
                  >
                    <Text style={styles.bioShopLabelText}>Assessment</Text>
                    <LCGTextInput
                      onChangeText={(val) => setAssessment(val)}
                      containerStyle={styles.inputContainer}
                      textInputProps={{
                        value: assessment,
                        placeholder:
                          config.strings.TEXT_INPUT_PLACEHOLDERS
                            .BLANK_PLACEHOLDER,
                        keyboardType: config.keyboardTypes.DEFAULT,
                        returnKeyType: config.returnKeyTypes.DONE,
                        autoCapitalize: config.autoCapitalizeTypes.WORDS,
                        textAlignVertical: "top",
                        multiline: true,
                      }}
                    />

                    <Text style={{ ...styles.bioShopLabelText, marginTop: 10 }}>
                      Plan
                    </Text>

                    <LCGTextInput
                      onChangeText={(val) => setPlan(val)}
                      containerStyle={styles.inputContainer}
                      textInputProps={{
                        value: plan,
                        placeholder:
                          config.strings.TEXT_INPUT_PLACEHOLDERS
                            .BLANK_PLACEHOLDER,
                        keyboardType: config.keyboardTypes.DEFAULT,
                        returnKeyType: config.returnKeyTypes.DONE,
                        autoCapitalize: config.autoCapitalizeTypes.WORDS,

                        textAlignVertical: "top",
                        multiline: true,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.viewStyle}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cancelBtn}
                  onPress={() => onPressDecisionCancel()}
                >
                  <Text style={styles.cancelText}>
                    {config.strings.BTN_TEXTS.CANCEL}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.saveBtn}
                  onPress={() => onPressDecisionUpdate()}
                >
                  <Text style={styles.saveText}>
                    {config.strings.BTN_TEXTS.UPDATE}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {status == COMPLETED && <DeliveryCompltedView />}

          {status == STARTED && demoShow == false && (
            <LCGButton
              buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
              containerStyle={styles.buttonContainer}
              onPress={() => callAddLcgDetailsApi()}
            />
          )}

          {status == NOT_STARTED &&
            isLabourDiag == "yes" &&
            demoShow == false && (
              <LCGButton
                buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
                containerStyle={styles.buttonContainer}
                onPress={() => callUpdateStatusApi()}
              />
            )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: config.colors.screenBackground },
  buttonContainer: { marginHorizontal: 20, marginVertical: 20 },
  inputContainer: {
    backgroundColor: "white",
    marginTop: 10,
    width: "100%",
    paddingVertical: 5,
  },
  selectedText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "500",
    fontSize: 15,
    color: "#FC5285",
  },

  unselectedText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 15,
    color: "#7D8491",
  },
  container: {
    backgroundColor: config.colors.white,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  patNameText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
    color: config.colors.neutralBlack,
  },
  patIdAgeView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  patIdAgeSubView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    flexWrap: "wrap",
  },
  labelText: {
    color: config.colors.black,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  contentText: {
    color: config.colors.toastDefault,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginHorizontal: 5,
    fontSize: 13,
    textTransform: "capitalize",
  },
  delivryStatusText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  deliveryStatusView: { flexDirection: "row", alignItems: "center" },
  deliveryStatusImage: { width: 20, height: 20, resizeMode: "contain" },
  biShopConatiner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  biShopHeadigText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 15,
  },
  bioShopLabelText: {
    color: config.colors.black,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 14,
  },
  biShopcontentText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginHorizontal: 5,
    fontSize: 14,
  },
  viewMedication: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medicationSubView: { flexDirection: "row", alignItems: "center" },
  rightArrowImg: { width: 12, height: 12, resizeMode: "contain" },
  lcgDetailConatainer: {
    paddingVertical: 15,
    backgroundColor: "#F5F6F9",
    borderColor: "#DFE3EE",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  lcgDetailSUbView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  lcgLabelTextHeading: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#38D492",
    textAlign: "center",
  },
  lcgLabelTextData: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#393766",
    textAlign: "center",
    marginVertical: 5,
  },
  viewLCGConatiner: { alignItems: "center" },
  viewLCGImgTextView: { flexDirection: "row", alignItems: "center" },
  viewLCGButtonView: {
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: "#57409A",
    paddingHorizontal: 12,
    width: "95%",
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
  },
  viewLCGButtonSubView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  viewLCGButtonText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.white,
    fontSize: 13,
    marginHorizontal: 10,
  },
  viewLCGArrowImage: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  calculateButtonView: {
    backgroundColor: config.colors.appTheme1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bioScroreButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calculateButtonText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.white,
    fontSize: 12,
  },
  startDeliveryContainer: {
    backgroundColor: config.colors.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 6,
    elevation: 3,
  },
  startdeliveryButtonView: {
    backgroundColor: "#D4D4D4",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
  },
  timeConatiner: {
    backgroundColor: config.colors.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 6,
    elevation: 3,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  timeSubView: { flexDirection: "row", alignItems: "center" },
  timeClockView: {
    width: 100,
    height: 30,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: config.colors.textInputLabel,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  fluidMedicationView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 20,
    backgroundColor: config.colors.white,
  },
  fluidMedicationSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fluidsDetailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 15,
  },
  sepratorStyle: {
    height: 1,
    backgroundColor: config.colors.toastBG,
    marginTop: 20,
  },
  dropDownContentView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  dropOptionConatiner: {
    width: "48%",
  },
  viewStyle: {
    flexDirection: "row",
  },
  radioOptionView: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginVertical: 12,
    marginHorizontal: 5,
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
  deliveryStartedTimeView: {
    backgroundColor: config.colors.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 6,
    elevation: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  clockImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  deliveryCompletedView: {
    marginHorizontal: 20,
    backgroundColor: config.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: 20,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeImage: { width: 30, height: 30, resizeMode: "contain" },
  delivryDetailsCardView: {
    marginHorizontal: 20,
    backgroundColor: config.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: 20,
    elevation: 3,
  },
  delDetailsSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  startCompleteView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  surgoryNoteText: {
    color: config.colors.toastDefault,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginVertical: 5,
  },
  babyStusText: {
    color: config.colors.toastDefault,
    marginTop: 5,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  babyTitleText: {
    color: config.colors.appTheme1,
    fontSize: 16,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  babyStausView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  apgarTextHeading: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginTop: 20,
  },
  apgScoreView: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  apgScoreSubView: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
    marginTop: 10,
  },
  footerCard: {
    height: 70,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  babyImg: {
    width: 53,
    height: 53,
    resizeMode: "contain",
  },
  addbabyBtn: {
    backgroundColor: "#FC5285",
    height: 33,
    width: 110,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addbabyText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
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

  buttonviewStyle: {
    flexDirection: "row",
    marginHorizontal: 30,
  },
  cancelBtn: {
    backgroundColor: "#EEF2F3",
    height: 45,
    width: "40%",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: config.colors.textInputLabel,
  },
  saveBtn: {
    backgroundColor: "#FC5285",
    height: 45,
    width: "40%",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  cancelText: {
    fontSize: 16,
    color: "black",
  },
  saveText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  labelStyle: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.neutralBlack,
    marginVertical: 8,
  },
  drugText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.neutralBlack,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  dateTimeContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  timeView: { marginLeft: 20 },
  pressableWidth: { width: "47%" },
  dropDownViewStyle: { marginTop: 15, marginHorizontal: 0, height: 120 },
  dropDownDataView: { marginVertical: 5 },
  timeSlotView: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  timeSlotContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeSlotHoriztalView: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeTextStyle: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#25282B",
    marginRight: 10,
  },
  selectTimeView: {
    marginLeft: 10,
    borderWidth: 0.8,
    borderColor: "#DADFEB",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
  hoursView: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  hoursText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 14,
    right: 10,
    letterSpacing: 0.02,
    color: "#25282B",
  },
  hoursDataText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 0.02,
    color: "#FC5285",
  },
  timeSlotDropDownView: { paddingVertical: 5, marginVertical: 5 },
  timeSlotDropDownContainer: { marginHorizontal: 20, marginVertical: 5 },
});

export default PatientDetail;
