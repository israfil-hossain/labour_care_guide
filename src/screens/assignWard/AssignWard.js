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
import {
  LCGTextInput,
  LCGCustomPicker,
  LCGButton,
  LCGDropDown,
} from "../../components";
import config from "../../config";
import { User, ListWards, WardAssign,ListPateints } from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, EnumUtils } from "../../utils";
import { removeWardAssignResponse } from "../../reduxStates/AssignWard";

const AssignWard = ({ navigation, route }) => {
  const [showWardDropDown, setShowWardDropDown] = useState(false);
  const [assignWard, setAssignWard] = useState("");
  const [wardID, setWardID] = useState("");

  const dispatch = useDispatch();

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  //Selectors
  const Listward = useSelector(ListWards.selectWardsList);
  const WardAssignResponse = useSelector(WardAssign.selectWardAssign);
  const WardAssignErrorResponse = useSelector(
    WardAssign.selectWardAssignErrorResponse
  );
  const WardID = useSelector(ListWards.selectIdWard);
  const OptionFilter = useSelector(ListPateints.selectOptionFilter);
  const PatientListData = useSelector(ListPateints.selectPatientList);

  useEffect(() => {
    if (WardAssignErrorResponse?.status == false) {
      showToast({
        type: toastTypes.ERROR,
        text2: WardAssignErrorResponse?.message,
      });
      dispatch(removeWardAssignResponse(null));
    }
  }, [WardAssignErrorResponse]);

  useEffect(() => {
    if (WardAssignResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: WardAssignResponse?.message,
      });
      navigation.goBack();
      callPatientListApi()
    }
  }, [WardAssignResponse]);

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

  const onPressAssign = () => {
    if (assignWard == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_WARD,
      });
    } else {
      const payload = {
        patientId: route?.params?.patID,
        wardId: wardID,
      };
      dispatch({
        type: "ASSIGN_WARD",
        payload,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sunView}>
        <Text style={styles.labelStyle}>
          {config.strings.TEXT_INPUT_LABELS.ASSIGN_WARD}
        </Text>

        <Pressable onPress={() => setShowWardDropDown(!showWardDropDown)}>
          <LCGTextInput
            rightAccessory={config.iconNames.CHEVRON_DOWN_THIN}
            rightAccessorySize={16}
            containerStyle={styles.inputContainer}
            textInputProps={{
              value: assignWard,
              placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.SELECT_WARD,
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

        <LCGButton
          buttonText={config.strings.BTN_TEXTS.ASSIGN}
          containerStyle={styles.buttonContainer}
          onPress={() => onPressAssign()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  sunView: { marginHorizontal: 20, marginTop: 50 },
  inputContainer: { marginBottom: 18, backgroundColor: "white" },
  labelStyle: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.neutralBlack,
    marginVertical: 5,
  },
  viewStyle: {
    flexDirection: "row",
  },
  buttonContainer: { marginVertical: 20 },
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
});

export default AssignWard;
