/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { styles } from "./AddPatientStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGRadioButtons,
  LCGTextInput,
  LCGCustomPicker,
  LCGButton,
  LCGAvatar,
  LCGDropDown,
  LCGCenterModal,
} from "../../components";
import config from "../../config";
import { profileSetup } from "../../staticData";
import { User, ListWards, AddPateint, ListPateints } from "../../reduxStates";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { CommonUtils, EnumUtils } from "../../utils";

const PData = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
  "P9",
  "P10",
  "P11",
  "P12",
  "P13",
  "P14",
  "P15",
  "P16",
  "P17",
  "P18",
  "P19",
  "P20",
];

const AddPatient = ({ navigation, route }) => {
  const dispatch = useDispatch();

  //States
  const [name, setName] = useState("");
  const [uhid, setUhid] = useState("");
  const [age, setAge] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [aadharNum, setAddharNum] = useState("");
  const [obsFormula, setObsFormula] = useState("");
  const [risk, setRisk] = useState("");
  const [contraceptive, setContraCeptive] = useState("");

  const [onsetDate, setOnsetDate] = useState("");
  const [onsetTime, setOnsetTime] = useState("");
  const [show, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [showRepture, setShowReptureDate] = useState(false);
  const [reptureDate, setReptureDate] = useState("");
  const [reptureTime, setReptureTime] = useState("");
  const [showReptureTime, setShowReptureTime] = useState(false);

  const [showLabourDate, setShowLabourDate] = useState(false);
  const [labourDate, setLabourDate] = useState("");
  const [labourTime, setLabourTime] = useState("");
  const [showLabourTime, setShowLabourTime] = useState(false);

  const [dateAdmission, setDateAdmission] = useState("");
  const [showAdmissionDate, setShowAdmissionDate] = useState(false);
  const [isLabourOnset, setIsLabourOnset] = useState("yes");
  const [isLabourDiag, setIsLabourDiag] = useState("yes");
  const [isReptured, setReptured] = useState("yes");
  const [showP, setShowP] = useState(false);
  const [selectedG, setSelectedG] = useState("");
  const [selectedP, setSelectedP] = useState("");
  const [selectedL, setSelectedL] = useState("");
  const [selectedA, setSelectedA] = useState("");

  const [pDropDownData, setpDropDownData] = useState([]);
  const [pValue, setPValue] = useState([]);
  const [pType, setPType] = useState("Select");
  const [selectdPIndex, setselectdPIndex] = useState("");
  const [isTypeVisible, setIsTypeVisible] = useState(false);
  const [pStatus, setPStatus] = useState("Select");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [pSex, setPSex] = useState("Select");
  const [visible, setVisible] = useState(false);
  const [showWardDropDown, setShowWardDropDown] = useState(false);
  const [assignWard, setAssignWard] = useState("");
  const [assignWardID, setAssignWardID] = useState("");
  const [buttonPressType, setButtonPressType] = useState("");

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const [onesetFormDate, setOnesetFormDate] = useState();
  const [activeLabFormDate, setActiveLabFormDate] = useState();
  const [membFormDate, setMembFormDate] = useState();
  const [hourUpdate, setHourUpdate] = useState();
  const [minUpdate, setMinUpdate] = useState();

  //Selectors
  const Listward = useSelector(ListWards.selectWardsList);
  const AddPatientResponse = useSelector(AddPateint.selectAddPatient);
  const WardID = useSelector(ListWards.selectIdWard);
  const OptionFilter = useSelector(ListPateints.selectOptionFilter);
  const PatientListData = useSelector(ListPateints.selectPatientList);

  // console.log("Patientdta", AddPatientResponse)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(AddPateint.saveAddPatients(null));
      setButtonPressType("");
    };
  }, [navigation]);

  useEffect(() => {
    if (AddPatientResponse?.success == true) {
      if (route?.params?.from === "edit") {
        navigation.goBack()
        callPatientListApi();
      } else {
        if (buttonPressType == "addmore") {
          clearPatientFormData();
        } else {
          clearPatientFormData();
          navigation.navigate(config.routes.PATIENTS_LIST_STACK);
        }
        callPatientListApi();
      }
    }
  }, [AddPatientResponse]);

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
    if (route?.params?.from === "edit") {
      setEditPatientData();
    }
  }, []);

  const setEditPatientData = () => {
    setName(route?.params?.patDetail?.name);
    setUhid(route?.params?.patDetail?.UHID);
    setAge(route?.params?.patDetail?.age?.toString());
    setPhoneNum(route?.params?.patDetail?.mobile?.toString());
    setAddress(route?.params?.patDetail?.address);
    setAddharNum(route?.params?.patDetail?.aadharNumber);
    const formula = route?.params?.patDetail?.obstetricFormula?.split(" ");
    setSelectedG(formula?.[0]);
    setSelectedP(formula?.[1]);
    setSelectedL(formula?.[2]);
    setSelectedA(formula?.[3]);
    setPValue(route?.params?.patDetail?.parity);
    setObsFormula(route?.params?.patDetail?.obstetricFormula);
    setIsLabourOnset(
      route?.params?.patDetail?.labourOnSet?.isActiveLabourOnSet == true
        ? "yes"
        : "no"
    );

    setOnesetFormDate(route?.params?.patDetail?.labourOnSet?.time);
    setOnsetDate(
      moment(new Date(route?.params?.patDetail?.labourOnSet?.time)).format(
        "DD/MM/YYYY"
      )
    );
    setOnsetTime(
      moment(
        new Date(route?.params?.patDetail?.labourOnSet?.time),
        "HH:mm"
      ).format("hh:mm A")
    );
    setIsLabourDiag(
      route?.params?.patDetail?.activeLabourDignosis?.isActiveLabourDignosis ==
        true
        ? "yes"
        : "no"
    );
    setActiveLabFormDate(route?.params?.patDetail?.activeLabourDignosis?.time);
    setLabourDate(
      moment(
        new Date(route?.params?.patDetail?.activeLabourDignosis?.time)
      ).format("DD/MM/YYYY")
    );
    setLabourTime(
      moment(
        new Date(route?.params?.patDetail?.activeLabourDignosis?.time),
        "HH:mm"
      ).format("hh:mm A")
    );
    setReptured(
      route?.params?.patDetail?.membrane?.isMembraneRuptured == true
        ? "yes"
        : "no"
    );
    setMembFormDate(route?.params?.patDetail?.membrane?.time);
    setReptureDate(
      moment(new Date(route?.params?.patDetail?.membrane?.time)).format(
        "DD/MM/YYYY"
      )
    );
    setReptureTime(
      moment(
        new Date(route?.params?.patDetail?.membrane?.time),
        "HH:mm"
      ).format("hh:mm A")
    );
    setRisk(route?.params?.patDetail?.riskFactor);
    setAssignWard(route?.params?.patDetail?.wardName);
    setAssignWardID(
      route?.params?.patDetail?.assignedWard == ""
        ? ""
        : route?.params?.patDetail?.assignedWard
    );
    setContraCeptive(route?.params?.patDetail?.contraceptivesUsed);
    setDateAdmission(route?.params?.patDetail?.dateOfAdmission);
  };

  const clearPatientFormData = () => {
    setName("");
    setUhid("");
    setAge("");
    setPhoneNum("");
    setAddress("");
    setAddharNum("");
    setObsFormula("");
    setRisk("");
    setContraCeptive("");
    setOnsetDate("");
    setOnsetTime("");
    setReptureDate("");
    setReptureTime("");
    setLabourDate("");
    setLabourTime("");
    setDateAdmission("");
    setSelectedG("");
    setSelectedA("");
    setSelectedL("");
    setSelectedP("");
    setPValue([]);
    setPType("Select");
    setPStatus("Select");
    setPSex("Select");
    setAssignWard("");
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

  const onSubmitBtnPress = () => {
    const formValid = validatePForm();
    const onsetValid = validateLabourOnset();
    const labourDiagValid = validateLabourDiagnosis();
    const reptureValid = validateReputure();

    if (name == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NAME,
      });
    } else if (uhid == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_UHID,
      });
    } else if (age == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_AGE,
      });
    } else if (phoneNum == "" || phoneNum.length < 10) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MOBILE,
      });
    } else if (address == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADDRESS,
      });
    } else if (aadharNum == "" || aadharNum.length < 12) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADHAR,
      });
    } else if (selectedG == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedP == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (formValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ALLDETAILS,
      });
    } else if (selectedL == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedA == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (onsetValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (labourDiagValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (reptureValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (risk == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_RISK,
      });
    } else if (contraceptive == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_CONTRACEPTIVE,
      });
    } else if (dateAdmission == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENETR_ADMISSIONDATE,
      });
    } else {
      setButtonPressType("close");
      callEditPatientApi();
    }
  };

  const onSaveAddMoreBtnPress = () => {
    const formValid = validatePForm();
    const onsetValid = validateLabourOnset();
    const labourDiagValid = validateLabourDiagnosis();
    const reptureValid = validateReputure();

    if (name == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NAME,
      });
    } else if (uhid == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_UHID,
      });
    } else if (age == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_AGE,
      });
    } else if (phoneNum == "" || phoneNum.length < 10) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MOBILE,
      });
    } else if (address == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADDRESS,
      });
    } else if (aadharNum == "" || aadharNum.length < 12) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADHAR,
      });
    } else if (selectedG == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedP == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (formValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ALLDETAILS,
      });
    } else if (selectedL == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedL > selectedG) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTERL,
      });
    } else if (selectedA == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedA > selectedG) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTERA,
      });
    } else if (onsetValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (labourDiagValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (reptureValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (risk == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_RISK,
      });
    } else if (contraceptive == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_CONTRACEPTIVE,
      });
    } else if (dateAdmission == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENETR_ADMISSIONDATE,
      });
    } else {
      setButtonPressType("addmore");
      callAddPatientApi();
    }
  };

  const onSaveCloseBtnPress = () => {
    const formValid = validatePForm();
    const onsetValid = validateLabourOnset();
    const labourDiagValid = validateLabourDiagnosis();
    const reptureValid = validateReputure();

    if (name == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_NAME,
      });
    } else if (uhid == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_UHID,
      });
    } else if (age == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_AGE,
      });
    } else if (phoneNum == "" || phoneNum.length < 10) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MOBILE,
      });
    } else if (address == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADDRESS,
      });
    } else if (aadharNum == "" || aadharNum.length < 12) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ADHAR,
      });
    } else if (selectedG == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedP == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (formValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_ALLDETAILS,
      });
    } else if (selectedL == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedL > selectedG) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTERL,
      });
    } else if (selectedA == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALUE,
      });
    } else if (selectedA > selectedG) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTERA,
      });
    } else if (onsetValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (labourDiagValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (reptureValid == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_DATE,
      });
    } else if (risk == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_RISK,
      });
    } else if (contraceptive == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_CONTRACEPTIVE,
      });
    } else if (dateAdmission == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENETR_ADMISSIONDATE,
      });
    } else {
      setButtonPressType("close");
      callAddPatientApi();
    }
  };

  const validateLabourOnset = () => {
    let isValidOnset = true;
    if (isLabourOnset == "yes") {
      if (onsetDate == "" || onsetTime == "") {
        isValidOnset = false;
      }
    }
    return isValidOnset;
  };

  const validateLabourDiagnosis = () => {
    let isValidDiagnosis = true;
    if (isLabourDiag == "yes") {
      if (labourDate == "" || labourTime == "") {
        isValidDiagnosis = false;
      }
    }
    return isValidDiagnosis;
  };

  const validateReputure = () => {
    let isValidRepture = true;
    if (isReptured == "yes") {
      if (reptureDate == "" || reptureTime == "") {
        isValidRepture = false;
      }
    }
    return isValidRepture;
  };

  const callAddPatientApi = () => {
    const payload = {
      patientId: "",
      name: name,
      age: parseInt(age),
      UHID: uhid,
      aadharNumber: aadharNum,
      mobile: parseInt(phoneNum),
      countryCode: 91,
      address: address,
      obstetricFormula: `G${selectedG} ${selectedP} L${selectedL} A${selectedA}`,
      riskFactor: risk,
      parity: pValue,
      dateOfAdmission: dateAdmission,
      assignedWard: assignWardID,
      contraceptivesUsed: contraceptive,
      labourOnSet: {
        isActiveLabourOnSet: isLabourOnset == "yes" ? true : false,
        time: isLabourOnset == "yes" ? `${onesetFormDate}` : "",
      },
      activeLabourDignosis: {
        isActiveLabourDignosis: isLabourDiag == "yes" ? true : false,
        time: isLabourDiag == "yes" ? `${activeLabFormDate}` : "",
      },
      membrane: {
        isMembraneRuptured: isReptured == "yes" ? true : false,
        time: isReptured == "yes" ? `${membFormDate}` : "",
      },
    };

    dispatch({
      type: "ADD_PATIENT",
      payload,
    });
  };

  const callEditPatientApi = () => {
    const payload = {
      patientId: route?.params?.patDetail?.patientId,
      name: name,
      age: parseInt(age),
      UHID: uhid,
      aadharNumber: aadharNum,
      mobile: parseInt(phoneNum),
      countryCode: 91,
      address: address,
      obstetricFormula: `${selectedG} ${selectedP} ${selectedL} ${selectedA}`,
      riskFactor: risk,
      parity: pValue,
      dateOfAdmission: dateAdmission,
      assignedWard: assignWardID,
      contraceptivesUsed: contraceptive,
      labourOnSet: {
        isActiveLabourOnSet: isLabourOnset == "yes" ? true : false,
        time: isLabourOnset == "yes" ? `${onesetFormDate}` : "",
      },
      activeLabourDignosis: {
        isActiveLabourDignosis: isLabourDiag == "yes" ? true : false,
        time: isLabourDiag == "yes" ? `${activeLabFormDate}` : "",
      },
      membrane: {
        isMembraneRuptured: isReptured == "yes" ? true : false,
        time: isReptured == "yes" ? `${membFormDate}` : "",
      },
    };

    dispatch({
      type: "ADD_PATIENT",
      payload,
    });
  };

  const onPressListP = (val, _indx) => {
    // console.log("vbv", _indx + 1);
    showValueForm(_indx + 1);
    setSelectedP(val);
    setShowP(false);
  };

  const setPDropDownValues = () => {
    setShowP(!showP);
    if (selectedG != "") {
      const arr = [];
      for (let i = 1; i <= selectedG - 1; i++) {
        //console.log("g", i);
        const data = `P${i}`;
        arr.push(data);
      }
      console.log("ggg", arr);
      setpDropDownData(arr);
    } else {
      setpDropDownData([]);
    }
  };

  const onPressWardDropDown = (val) => {
    setAssignWard(val?.name);
    setAssignWardID(val?.wardId);
    setShowWardDropDown(false);
  };

  const showValueForm = (filledArray) => {
    const arr = [];
    for (let i = 1; i <= filledArray; i++) {
      //console.log("g", i);
      const obj = {
        value: `P${i}`,
        type: "NVD",
        babyStatus: "Select",
        sex: "Select",
        deliveryType: "NVD",
      };
      arr.push(obj);
    }
    //console.log("ggg", arr);
    setPValue(arr ? arr.reverse() : []);
  };

  const validatePForm = () => {
    let isvalid = true;
    const arr = [...pValue];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["babyStatus"] == "Select" || arr[i]["sex"] == "Select") {
        isvalid = false;
      }
    }
    return isvalid;
  };

  const onCloseTypeModal = (value) => {
    const res = [...pValue];
    res[selectdPIndex]["type"] = value;
    res[selectdPIndex]["deliveryType"] = value;
    setPValue(res);
    setPType(value);
    setIsTypeVisible(false);
  };

  const onPressPTypePicker = (_index) => {
    // console.log("actual index", _index);
    setselectdPIndex(_index);
    setIsTypeVisible(true);
  };

  const onCloseStatusModal = (value) => {
    const res = [...pValue];
    res[selectdPIndex]["babyStatus"] = value;
    setPValue(res);
    setPStatus(value);
    setIsStatusVisible(false);
  };

  const onPressPStatusPicker = (_index) => {
    // console.log("actual index", _index);
    setselectdPIndex(_index);
    setIsStatusVisible(true);
  };

  const onCloseGenderModal = (value) => {
    const res = [...pValue];
    res[selectdPIndex]["sex"] = value;
    setPValue(res);
    setPSex(value);
    setVisible(false);
  };

  const onPressPGenderPicker = (_index) => {
    // console.log("actual index", _index);
    setselectdPIndex(_index);
    setVisible(true);
  };

  const showDatePicker = () => {
    setShowDate(!show);
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
    setOnsetDate(formattedDate);
    setOnesetFormDate(_date);
  };

  const showTimePicker = () => {
    setShowTime(!showTime);
  };

  const hideTimePicker = () => {
    setShowTime(false);
  };

  const handleConfirmTime = (_time) => {
    hideTimePicker();
    formatTime(_time);
  };

  const formatTime = (_time) => {
    const formattedDate = moment(_time, "HH:mm").format("hh:mm A");
    setOnsetTime(formattedDate);
    const d = new Date(_time);
    d.getHours();
    const setd = new Date(onesetFormDate);
    setd.setHours(d.getHours());
    setd.setMinutes(d.getMinutes());
    setOnesetFormDate(setd);
  };

  const showReptureDatePicker = () => {
    setShowReptureDate(!show);
  };

  const hideReptureDatePicker = () => {
    setShowReptureDate(false);
  };

  const handleConfirmRepture = (date) => {
    hideReptureDatePicker();
    formatDateRepture(date);
  };

  const formatDateRepture = (_date) => {
    const formattedDate = moment(_date).format("DD/MM/YYYY");
    setReptureDate(formattedDate);
    setMembFormDate(_date);
  };

  const showReptureTimePicker = () => {
    setShowReptureTime(!showReptureTime);
  };

  const hideReptureTimePicker = () => {
    setShowTime(false);
  };

  const handleConfirmTimeRepture = (_time) => {
    hideReptureTimePicker();
    formatTimeRepture(_time);
  };

  const formatTimeRepture = (_time) => {
    const formattedDate = moment(_time, "HH:mm").format("hh:mm A");
    setReptureTime(formattedDate);
    const d = new Date(_time);
    d.getHours();
    const setd = new Date(membFormDate);
    setd.setHours(d.getHours());
    setd.setMinutes(d.getMinutes());
    setMembFormDate(setd);
  };

  const showLabourDatePicker = () => {
    setShowLabourDate(!showLabourDate);
  };

  const hideLabourDatePicker = () => {
    setShowLabourDate(false);
  };

  const handleConfirmLabour = (date) => {
    hideReptureDatePicker();
    formatDateLabour(date);
  };

  const formatDateLabour = (_date) => {
    const formattedDate = moment(_date).format("DD/MM/YYYY");
    setLabourDate(formattedDate);
    setActiveLabFormDate(_date);
  };

  const showLabourTimePicker = () => {
    setShowLabourTime(!showLabourTime);
  };

  const hideLabourTimePicker = () => {
    setShowLabourTime(false);
  };

  const handleConfirmTimeLabour = (_time) => {
    hideReptureTimePicker();
    formatTimeLabour(_time);
  };

  const formatTimeLabour = (_time) => {
    const formattedDate = moment(_time, "HH:mm").format("hh:mm A");
    setLabourTime(formattedDate);
    const d = new Date(_time);
    d.getHours();
    const setd = new Date(activeLabFormDate);
    setd.setHours(d.getHours());
    setd.setMinutes(d.getMinutes());
    setActiveLabFormDate(setd);
  };

  const showAdmissionDatePicker = () => {
    setShowAdmissionDate(!showAdmissionDate);
  };

  const hideAdmissionDatePicker = () => {
    setShowAdmissionDate(false);
  };

  const handleConfirmAdmission = (date) => {
    hideAdmissionDatePicker();
    formatDateAdmission(date);
  };

  const formatDateAdmission = (_date) => {
    const formattedDate = moment(_date).format("YYYY-MM-DD");
    setDateAdmission(formattedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardScroll} behavior="padding">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.PATIENT_NAME_LABEL}
            </Text>
            <LCGTextInput
              onChangeText={(text) => setName(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: name,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.NAME_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
              }}
            />
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.UHID_LABEL}
            </Text>
            <LCGTextInput
              onChangeText={(text) => setUhid(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: uhid,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.UHID_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.AGE_LABEL}
            </Text>
            <LCGTextInput
              onChangeText={(text) => setAge(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: age,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.AGE_PLACEHOLDER,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                maxLength: 2,
              }}
            />
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.PHONE_NO}
            </Text>
            <LCGTextInput
              onChangeText={(text) => setPhoneNum(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: phoneNum,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.MOBILE_PLACEHOLDER,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                maxLength: 10,
              }}
            />
            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.ADDRESS}
            </Text>
            <LCGTextInput
              onChangeText={(text) => setAddress(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: address,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.ADDRESS_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                multiline: true,
                height: 60,
                textAlignVertical: "top",
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.AADHAR_NUMBER}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setAddharNum(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: aadharNum,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS
                    .AADHAR_NUMBER_PLACEHOLDER,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                maxLength: 12,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.G}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setSelectedG(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: selectedG,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                keyboardType: config.keyboardTypes.NUMERIC,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.P}
            </Text>

            <Pressable onPress={() => setPDropDownValues()}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                rightAccessorySize={16}
                textInputProps={{
                  value: selectedP,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.WORDS,
                  editable: false,
                }}
              />
            </Pressable>

            <LCGDropDown
              dropVisible={showP}
              listData={pDropDownData}
              viewStyle={{ marginHorizontal: 0 }}
              renderContent={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPressListP(item, index)}
                    style={styles.dropDownContentView}
                  >
                    <View style={styles.dropDownDotView}></View>
                    <Text style={styles.dropDownListText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />

            {pValue && pValue.length > 0 && (
              <View style={styles.pValueFormView}>
                <FlatList
                  data={pValue}
                  ListHeaderComponent={() => (
                    <Text style={styles.labelStyle}>P Value</Text>
                  )}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.pValueSubView}>
                        <View>
                          <Text style={styles.labelStyle}>P</Text>
                          <View style={styles.pMainView}>
                            <Text style={styles.pLabelText}>{item?.value}</Text>
                          </View>
                        </View>

                        <View>
                          <Text style={styles.labelStyle}>Cesarian/NVD</Text>
                          <Pressable
                            onPress={() => onPressPTypePicker(index)}
                            style={styles.cesNvdView}
                          >
                            <Text
                              style={{
                                ...styles.pLabelText,
                                color:
                                  item?.type == "Select"
                                    ? config.colors.disabled
                                    : config.colors.black,
                              }}
                            >
                              {item?.type}
                            </Text>
                            <Image
                              source={require("../../assets/images/DownArrow.png")}
                              style={styles.downArrowImage}
                            />
                          </Pressable>
                        </View>

                        <View>
                          <Text style={styles.labelStyle}>Status</Text>
                          <Pressable
                            onPress={() => onPressPStatusPicker(index)}
                            style={styles.cesNvdView}
                          >
                            <Text
                              style={{
                                ...styles.pLabelText,
                                color:
                                  item?.babyStatus == "Select"
                                    ? config.colors.disabled
                                    : config.colors.black,
                              }}
                            >
                              {item?.babyStatus}
                            </Text>
                            <Image
                              source={require("../../assets/images/DownArrow.png")}
                              style={styles.downArrowImage}
                            />
                          </Pressable>
                        </View>

                        <View>
                          <Text style={styles.labelStyle}>Sex</Text>
                          <Pressable
                            onPress={() => onPressPGenderPicker(index)}
                            style={styles.cesNvdView}
                          >
                            <Text
                              style={{
                                ...styles.pLabelText,
                                color:
                                  item?.sex == "Select"
                                    ? config.colors.disabled
                                    : config.colors.black,
                              }}
                            >
                              {item?.sex}
                            </Text>
                            <Image
                              source={require("../../assets/images/DownArrow.png")}
                              style={styles.downArrowImage}
                            />
                          </Pressable>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            )}

            <LCGCenterModal
              visible={isTypeVisible}
              onClose={() => setIsTypeVisible(false)}
              modalContent={() => {
                return (
                  <>
                    <Pressable
                      onPress={() => onCloseTypeModal("Cesarian")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pType == "Cesarian"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Cesarian
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onCloseTypeModal("NVD")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pType == "NVD"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        NVD
                      </Text>
                    </Pressable>
                  </>
                );
              }}
            />

            <LCGCenterModal
              visible={isStatusVisible}
              onClose={() => setIsStatusVisible(false)}
              modalContent={() => {
                return (
                  <>
                    <Pressable
                      onPress={() => onCloseStatusModal("Alive")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pStatus == "Alive"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Alive
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onCloseStatusModal("Stillborn")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pStatus == "Stillborn"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Stillborn
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onCloseStatusModal("Macerated")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pStatus == "Macerated"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Macerated
                      </Text>
                    </Pressable>
                  </>
                );
              }}
            />

            <LCGCenterModal
              visible={visible}
              onClose={() => setVisible(false)}
              modalContent={() => {
                return (
                  <>
                    <Pressable
                      onPress={() => onCloseGenderModal("Male")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pSex == "Male"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Male
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onCloseGenderModal("Female")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pSex == "Female"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Female
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => onCloseGenderModal("Indeterminate")}
                      style={styles.modalOptionConatiner}
                    >
                      <Image
                        source={
                          pSex == "Indeterminate"
                            ? require("../../assets/images/RadioCheck.png")
                            : require("../../assets/images/RadioUncheck.png")
                        }
                        style={styles.formArrImage}
                      />
                      <Text style={[styles.labelStyle, { marginLeft: 20 }]}>
                        Indeterminate
                      </Text>
                    </Pressable>
                  </>
                );
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.L}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setSelectedL(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: selectedL,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.A}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setSelectedA(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: selectedA,
                placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.OBSTETRIC_FORMULA}
            </Text>

            <LCGTextInput
              containerStyle={styles.inputContainer}
              textInputProps={{
                value:
                  route?.params?.from === "edit"
                    ? `${selectedG} ${selectedP} ${selectedL} ${selectedA}`
                    : `G${selectedG} ${selectedP} L${selectedL} A${selectedA}`,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.WORDS,
                editable: false,
              }}
            />

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.IS_LABOUR_ONSET}
            </Text>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => setIsLabourOnset("yes")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    isLabourOnset == "yes"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.maleText}>
                  {config.strings.BTN_TEXTS.YES}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsLabourOnset("no")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    isLabourOnset == "no"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.femaleText}>
                  {config.strings.BTN_TEXTS.NO}
                </Text>
              </TouchableOpacity>
            </View>

            {isLabourOnset == "yes" && (
              <View style={styles.dateTimeContainerView}>
                <Pressable
                  style={{ width: "47%" }}
                  onPress={() => showDatePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CALENDAR}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: onsetDate,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.DATE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>

                <DateTimePickerModal
                  isVisible={show}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                  minimumDate={new Date()}
                />

                <View style={styles.timeView} />

                <Pressable
                  style={{ width: "47%" }}
                  onPress={() => showTimePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CLOCK}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: onsetTime,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TIME,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>

                <DateTimePickerModal
                  isVisible={showTime}
                  mode="time"
                  onConfirm={handleConfirmTime}
                  onCancel={hideTimePicker}
                />
              </View>
            )}

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
                  style={{ width: "47%" }}
                  onPress={() => showLabourDatePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CALENDAR}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: labourDate,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.DATE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>

                <DateTimePickerModal
                  isVisible={showLabourDate}
                  mode="date"
                  onConfirm={handleConfirmLabour}
                  onCancel={hideLabourDatePicker}
                  maximumDate={new Date()}
                  minimumDate={new Date()}
                />

                <View style={styles.timeView} />

                <Pressable
                  style={{ width: "47%" }}
                  onPress={() => showLabourTimePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CLOCK}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: labourTime,
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
              </View>
            )}

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.IS_MEMBRANE}
            </Text>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => setReptured("yes")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    isReptured == "yes"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.maleText}>
                  {config.strings.BTN_TEXTS.YES}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setReptured("no")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    isReptured == "no"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.femaleText}>
                  {config.strings.BTN_TEXTS.NO}
                </Text>
              </TouchableOpacity>
            </View>

            {isReptured == "yes" && (
              <View style={styles.dateTimeContainerView}>
                <Pressable
                  style={{ width: "47%" }}
                  onPress={() => showReptureDatePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CALENDAR}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: reptureDate,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.DATE,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>

                <DateTimePickerModal
                  isVisible={showRepture}
                  mode="date"
                  onConfirm={handleConfirmRepture}
                  onCancel={hideReptureDatePicker}
                  maximumDate={new Date()}
                  minimumDate={new Date()}
                />

                <View style={styles.timeView} />

                <Pressable
                  style={{ width: "47%" }}
                  onPress={() => showReptureTimePicker()}
                >
                  <LCGTextInput
                    containerStyle={styles.inputContainer}
                    rightAccessory={config.iconNames.CLOCK}
                    rightAccessorySize={20}
                    rightAccessoryStyle={{ color: "black" }}
                    textInputProps={{
                      value: reptureTime,
                      placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.TIME,
                      keyboardType: config.keyboardTypes.DEFAULT,
                      returnKeyType: config.returnKeyTypes.DONE,
                      autoCapitalize: config.autoCapitalizeTypes.WORDS,
                      editable: false,
                    }}
                  />
                </Pressable>

                <DateTimePickerModal
                  isVisible={showReptureTime}
                  mode="time"
                  onConfirm={handleConfirmTimeRepture}
                  onCancel={hideReptureTimePicker}
                />
              </View>
            )}

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.RISK_FACTORS_LABEL}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setRisk(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: risk,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
                height: 80,
                textAlignVertical: "top",
                multiline: true,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.ASSIGN_WARD}
            </Text>

            <Pressable onPress={() => setShowWardDropDown(!showWardDropDown)}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
                rightAccessorySize={16}
                textInputProps={{
                  value: assignWard,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.VALUE,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.WORDS,
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
              {config.strings.TEXT_INPUT_LABELS.CONTRACEPTIVE_USED}
            </Text>

            <LCGTextInput
              onChangeText={(text) => setContraCeptive(text)}
              containerStyle={styles.inputContainer}
              textInputProps={{
                value: contraceptive,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
                keyboardType: config.keyboardTypes.DEFAULT,
                returnKeyType: config.returnKeyTypes.DONE,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
            />

            <Text style={styles.labelStyle}>
              {config.strings.TEXT_INPUT_LABELS.DATE_OF_ADMISSION}
            </Text>

            <Pressable onPress={() => showAdmissionDatePicker()}>
              <LCGTextInput
                containerStyle={styles.inputContainer}
                rightAccessory={config.iconNames.CALENDAR}
                rightAccessorySize={20}
                rightAccessoryStyle={{ color: "black" }}
                textInputProps={{
                  value: dateAdmission,
                  placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.DATE,
                  keyboardType: config.keyboardTypes.DEFAULT,
                  returnKeyType: config.returnKeyTypes.DONE,
                  autoCapitalize: config.autoCapitalizeTypes.WORDS,
                  editable: false,
                }}
              />
            </Pressable>
            <DateTimePickerModal
              isVisible={showAdmissionDate}
              mode="date"
              onConfirm={handleConfirmAdmission}
              onCancel={hideAdmissionDatePicker}
            />

            {route?.params?.from != "edit" && (
              <View style={styles.bottomButtonView}>
                <LCGButton
                  containerStyle={styles.submitBtnContainer}
                  buttonText={config.strings.BTN_TEXTS.SAVE_AND_ADDMORE}
                  onPress={onSaveAddMoreBtnPress}
                />

                <LCGButton
                  containerStyle={styles.submitBtnContainer}
                  buttonText={config.strings.BTN_TEXTS.SAVE_AND_CLOSE}
                  onPress={onSaveCloseBtnPress}
                />
              </View>
            )}

            {route?.params?.from == "edit" && (
              <LCGButton
                containerStyle={[styles.submitBtnContainer, { width: "100%" }]}
                buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
                onPress={onSubmitBtnPress}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPatient;
