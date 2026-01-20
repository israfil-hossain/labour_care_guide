import CardView from "../../components/CardView";import React, { useEffect, useState, useRef } from "react";
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
  FlatList,
} from "react-native";
import { LCGCenterModal, LCGButton, LCGBottomModal } from "../../components";

import fontFamily from "../../config/fontFamily";
import routes from "../../config/routes";
import PatientsCard from "../../components/PatientsCard";
import config from "../../config";
import {
  User,
  ListWards,
  ListPateints,
  SearchPatient,
  SortPatientList,
  HighRiskPatient,
  AddPateint,
  AlertHideToggle,
  ProfileStaff,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  savePatientFilterOption,
  savePatientPageNumber,
} from "../../reduxStates/PatientList";
import Constants from 'expo-constants';
import { saveHideAlertStatus } from "../../reduxStates/ToggleAlertHide";

const ORDER = 1;

const PatientsList = ({ navigation, route }) => {
  const [menuOption, setmenuOption] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [menuShow, setShowMenu] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [patientList, setPatientsList] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectPatientID, setSelectPatientID] = useState("");
  const [patientDetail, setPatientDetail] = useState();
  const [riskStatus, setRiskStatus] = useState();

  const dispatch = useDispatch();
  const PatientListData = useSelector(ListPateints.selectPatientList);
  const PaginatedPatientList = useSelector(
    ListPateints.selectPaginatedListPatient
  );
  const SearchPatientData = useSelector(SearchPatient.selectSearchPatient);
  const SortPatientData = useSelector(SortPatientList.selectSortPatient);
  const HighRiskData = useSelector(HighRiskPatient.selectHighRisk);
  const WardID = useSelector(ListWards.selectIdWard);
  const OptionFilter = useSelector(ListPateints.selectOptionFilter);
  const AlertHideResponse = useSelector(AlertHideToggle.selectAlertHide);
  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);

 

  const scrollViewRef = useRef();

  useEffect(() => {
    if (HighRiskData?.success == true) {
      callPatientListApi();
    }
  }, [HighRiskData]);

  useEffect(() => {
    callPatientListApi();
  }, []);

  useEffect(() => {
    if (AlertHideResponse?.success == true) {
      callProfileStaffApi();
    }
  }, [AlertHideResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(saveHideAlertStatus(null));
    };
  }, [navigation]);

  useEffect(() => {
    if (SortPatientData?.data?.patients?.length > 0) {
      setPatientsList(SortPatientData?.data?.patients);
    }
  }, [SortPatientData]);

  useEffect(() => {
    if (SearchPatientData?.length > 0) {
      setPatientsList(SearchPatientData);
    } else {
      setPatientsList([]);
    }
  }, [SearchPatientData]);

  useEffect(() => {
    if (PaginatedPatientList?.length > 0) {
      setPatientsList(PaginatedPatientList);
    } else {
      setPatientsList([]);
    }
  }, [PaginatedPatientList]);

  useEffect(() => {
    callPatientListApiOnFilter();
    setSearchValue("");
  }, [OptionFilter]);

  useEffect(() => {
    if (WardID != null) {
      const payload = {
        uri: `list?filterBy=${OptionFilter}&filterValue=true&wardId=${WardID}`,
      };
      dispatch({
        type: "PATEINT_LIST",
        payload,
      });
    } else {
      const payload = {
        uri: `list?filterBy=${OptionFilter}&filterValue=true&page=${
          PatientListData?.data?.pagination?.currentPage
        }`,
      };
      dispatch({
        type: "PATEINT_LIST",
        payload,
      });
    }
  }, [WardID]);

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

  const callPatientListApiOnFilter = () => {
    if (WardID != null) {
      const payload = {
        uri: `list?filterBy=${OptionFilter}&filterValue=true&wardId=${WardID}`,
      };
      dispatch({
        type: "PATEINT_LIST",
        payload,
      });
    } else {
      const payload = {
        uri: `list?filterBy=${OptionFilter}&filterValue=true`,
      };
      dispatch({
        type: "PATEINT_LIST",
        payload,
      });
    }
  };

  const onPressEditPatient = () => {
    setShowMenu(false);
    navigation.navigate(config.routes.ADD_PATIENT, {
      patDetail: patientDetail,
      from: "edit",
    });
  };

  const onPressPatientAction = () => {
    setShowMenu(false);
    navigation.navigate(config.routes.PATIENTS_ACTIONS, {
      patID: selectPatientID,
    });
  };

  const onPressAssignWard = () => {
    setShowMenu(false);
    navigation.navigate(config.routes.ASSIGN_WARD, { patID: selectPatientID });
  };

  const onPressTopMenuOtpions = (type) => {
    if (type == "ALL") {
      setmenuOption(1);
      setFilterOption("");
      dispatch(savePatientFilterOption(""));
    } else if (type == "RISK") {
      setmenuOption(2);
      setFilterOption("RISK");
      dispatch(savePatientFilterOption("RISK"));
    } else if (type == "LABOUR") {
      setmenuOption(3);
      setFilterOption("LABOUR");
      dispatch(savePatientFilterOption("LABOUR"));
    } else if (type == "COMPLETED") {
      setmenuOption(4);
      setFilterOption("COMPLETED");
      dispatch(savePatientFilterOption("COMPLETED"));
    }
  };

  const searchPatient = (_text) => {
    setSearchValue(_text);
    if (_text == null) {
      setSearchValue("");
    } else {
      const payload = {
        uri: `list?search=${_text}&filterBy=${OptionFilter}&filterValue=true`,
      };
      setTimeout(() => {
        dispatch({
          type: "SEARCH_PATIENT",
          payload,
        });
      }, 2000);
    }
  };

  const onPressResetButton = () => {
    setSortOption("");
  };

  const onPressApplyButton = () => {
    setSortVisible(false);
    const payload = {
      uri: `list?filterBy=${OptionFilter}&filterValue=true&orderBy=${sortOption}&orderIn=${ORDER}`,
    };
    dispatch({
      type: "SORT_PATIENT_LIST",
      payload,
    });
  };

  const onPressHideFutureAlert = () => {
    setHideAlert(!hideAlert);
  };

  const onPressYes = async () => {
    const payload = {
      uri: `${selectPatientID}`,
    };
    dispatch({
      type: "HIGH_RISK_PATIENT",
      payload,
    });
    callTogleAlertHide();
    setIsVisible(false);
  };

  const callTogleAlertHide = () => {
    const payload = {
      uri: `${hideAlert}`,
    };
    dispatch({
      type: "TOGGLE_ALERT_HIDE",
      payload,
    });
  };

  const onFlagPress = (patientID, statusRisk) => {
    setSelectPatientID(patientID);
    setRiskStatus(statusRisk);
    if (ProfileStaffResponse?.data?.isHighRiskAlertHide == false) {
      setIsVisible(true);
    } else {
      const payload = {
        uri: `${patientID}`,
      };
      dispatch({
        type: "HIGH_RISK_PATIENT",
        payload,
      });
    }
  };

  const onOptionPress = (id_Pateint, detailPatient) => {
    setPatientDetail(detailPatient);
    setSelectPatientID(id_Pateint);
    setShowMenu(!menuShow);
  };

  const fetchMoreData = () => {
    if (PatientListData?.data?.pagination?.totalItems > patientList?.length) {
      const payload = {
        uri: `list?filterBy=${OptionFilter}&filterValue=true&page=${
          PatientListData?.data?.pagination?.currentPage + 1
        }`,
      };
      dispatch({
        type: "PATEINT_LIST",
        payload,
      });
    }
  };

  const onPressSortIcon = () => {
    setSearchValue("");
    setSortVisible(!sortVisible);
  };

  const onPressClearFilter = () => {
    dispatch(ListWards.saveWardIdSelected(null));
    dispatch(savePatientFilterOption(""));
    setmenuOption(1);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const callProfileStaffApi = () => {
    const payload = {
      uri: `?udid=${Constants.deviceId || Constants.installationId}`,
    };
    dispatch({
      type: "STAFF_PROFILE",
      payload,
    });
  };

  return (
    <SafeAreaView style={local.container}>
      <View style={local.horizontalListView}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
        >
          <Pressable
            onPress={() => onPressTopMenuOtpions("ALL")}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 1 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.ALL_PATIENT}</Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTopMenuOtpions("RISK")}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 2 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.HIGH_RISK_PATIENT}</Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTopMenuOtpions("LABOUR")}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 3 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DELIVERY_INPROGRESS}</Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTopMenuOtpions("COMPLETED")}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 4 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DELIVERY_COMPLETED}</Text>
          </Pressable>

          {/* <Pressable
            onPress={() => setmenuOption(5)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 5 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DISCHARGE_PATIENTS}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(6)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 6 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DECLARE_PATIENTS}</Text>
          </Pressable> */}
        </ScrollView>
      </View>

      <View style={local.serachContainer}>
        <View style={local.serachSubView}>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={local.searchCardView}
          >
            <View style={local.searchInputView}>
              <Image
                source={require("../../assets/images/dashboard/searchIcon.png")}
                style={local.searchImage}
              />
              <TextInput
                style={local.searchTextInput}
                placeholder={config.strings.OTHERS.SEARCH_PATIENT}
                autoCapitalize="none"
                autoCorrect={false}
                value={searchValue}
                onChangeText={(val) => searchPatient(val)}
              />
            </View>
          </CardView>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={local.cardDetailsSubView}
          >
            <Pressable
              onPress={() => onPressSortIcon()}
              style={local.sortIconView}
            >
              <Image
                source={require("../../assets/images/dashboard/sortFilter.png")}
                style={local.sortIconImage}
              />
            </Pressable>
          </CardView>
        </View>

        {WardID != null && (
          <Pressable
            onPress={() => onPressClearFilter()}
            style={local.clearFilterView}
          >
            <Text style={local.biShopHeadigText}>
              {config.strings.OTHERS.CLEAR_FILTER}
            </Text>
          </Pressable>
        )}

        <LCGBottomModal
          modalTitle={config.strings.OTHERS.SORT_BY}
          visibleModal={sortVisible}
          onCloseModal={() => setSortVisible(false)}
          modalContent={() => (
            <>
              <Pressable
                onPress={() => setSortOption("name")}
                style={local.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == "name"
                      ? config.images.RadioCheck
                      : config.images.RadioUncheck
                  }
                  style={local.radioOptionImage}
                />
                <Text style={local.sortModalText}>
                  {config.strings.OTHERS.PATEINT_NAME}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSortOption("UHID")}
                style={local.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == "UHID"
                      ? config.images.RadioCheck
                      : config.images.RadioUncheck
                  }
                  style={local.radioOptionImage}
                />
                <Text style={local.sortModalText}>
                  {config.strings.OTHERS.UHID}
                </Text>
              </Pressable>

              <View style={local.buttonView}>
                <Pressable
                  onPress={() => onPressResetButton()}
                  style={local.buttonSUbView}
                >
                  <Text style={local.buttonReset}>
                    {config.strings.BTN_TEXTS.RESET}{" "}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onPressApplyButton()}
                  style={local.buttonApplyView}
                >
                  <Text style={local.buttonApplyText}>
                    {config.strings.BTN_TEXTS.APPLY}{" "}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        />

        <LCGBottomModal
          modalTitle=""
          visibleModal={menuShow}
          onCloseModal={() => setShowMenu(false)}
          modalContent={() => (
            <>
              <Pressable
                onPress={() => onPressAssignWard()}
                style={local.menuOptionModalConatiner}
              >
                <Image
                  source={config.images.Assignward}
                  style={local.menuOptionModalImg}
                />
                <Text style={local.menuOptionModalText}>
                  {config.strings.OTHERS.ASSIGN_WARD}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onPressPatientAction()}
                style={local.menuOptionModalConatiner}
              >
                <Image
                  source={config.images.PateintActions}
                  style={local.menuOptionModalImg}
                />
                <Text style={local.menuOptionModalText}>
                  {config.strings.OTHERS.PATEINT_ACTIONS}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onPressEditPatient()}
                style={local.menuOptionModalConatiner}
              >
                <Image
                  source={config.images.EditPateint}
                  style={local.menuOptionModalImg}
                />
                <Text style={local.menuOptionModalText}>
                  {config.strings.OTHERS.EDIT_PATEINT_DETAILS}
                </Text>
              </Pressable>
            </>
          )}
        />

        {patientList && patientList?.length > 0 ? (
          <FlatList
            data={patientList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.8}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <PatientsCard
                onPress={() =>
                  navigation.navigate(routes.PATIENTS_DETAIL, { details: item })
                }
                dataPateint={item}
                onFlagPress={() =>
                  onFlagPress(item?.patientId, item?.isAtHighRisk)
                }
                onOptionsPress={() => onOptionPress(item?.patientId, item)}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={local.menuOptionModalText}>No Patients found.</Text>
          </View>
        )}

        <LCGCenterModal
          visible={isVisible}
          onClose={() => setIsVisible(false)}
          modalContent={() => {
            return (
              <View style={local.messageHeadingView}>
                <Image
                  source={config.images.HighRisk}
                  style={local.passwordImage}
                />
                <Text style={local.messageHeadingText}>
                  {riskStatus == true
                    ? config.strings.OTHERS.HIGH_RISK_HEADING_REMOVE
                    : config.strings.OTHERS.HIGH_RISK_HEADING}
                </Text>

                <Pressable
                  onPress={() => onPressHideFutureAlert()}
                  style={local.hideAlertView}
                >
                  <Image
                    source={
                      hideAlert == true
                        ? config.images.Checked
                        : config.images.UnChecked
                    }
                    style={local.checkboxImage}
                  />
                  <Text style={local.messageHeadingText}>
                    {config.strings.OTHERS.HIDE_ALERT_FUTURE}
                  </Text>
                </Pressable>

                <View style={local.viewStyle}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={local.cancelBtn}
                    onPress={() => setIsVisible(false)}
                  >
                    <Text style={local.cancelText}>
                      {config.strings.BTN_TEXTS.NO}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={local.saveBtn}
                    onPress={() => onPressYes()}
                  >
                    <Text style={local.saveText}>
                      {config.strings.BTN_TEXTS.YES}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
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
    justifyContent: "space-between",
    elevation: 3,
  },
  listOptionView: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",

    borderBottomWidth: 2,
  },
  serachContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serachSubView: {
    flexDirection: "row",
  },
  searchCardView: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  searchInputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchImage: { width: 20, height: 20 },
  searchTextInput: {
    marginLeft: 5,
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    width: "100%",
  },
  cardDetailsSubView: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 10,
    marginLeft: 10,
  },
  sortIconView: {
    flexDirection: "row",
  },
  sortIconImage: { width: 30, height: 30, resizeMode: "contain" },
  sortModalContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  radioOptionImage: { width: 20, height: 20, resizeMode: "contain" },
  sortModalText: { marginLeft: 10, color: config.colors.neutralBlack },
  buttonView: {
    flexDirection: "row",
    borderColor: config.colors.shadow,
    borderWidth: 1,
    borderRadius: 6,
    top: 16,
    marginVertical: 10,
  },
  buttonSUbView: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonReset: {
    color: config.colors.textInputLabel,
    fontSize: 15,
  },
  buttonApplyView: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.colors.appTheme1,
  },
  buttonApplyText: {
    color: config.colors.white,
    fontSize: 15,
  },
  menuOptionModalConatiner: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  menuOptionModalImg: { width: 20, height: 20, resizeMode: "contain" },
  menuOptionModalText: { marginLeft: 10, color: config.colors.neutralBlack },
  listScroll: {
    flex: 1,
  },
  hideAlertView: { flexDirection: "row", alignItems: "center" },
  checkboxImage: { width: 20, height: 20, resizeMode: "contain" },
  clearFilterView: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginRight: 15,
    marginVertical: 5,
  },
  biShopHeadigText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
  },
});

export default PatientsList;
