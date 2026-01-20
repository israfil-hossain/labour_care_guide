import React, { useState } from "react";
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
  FlatList
} from "react-native";
import CardView from '../../components/CardView';


import fontFamily from "../../config/fontFamily";
import WardCard from "../../components/WardCard";
import StaffCard from "../../components/StaffCard";
import routes from "../../config/routes";
import PatientsCard from "../../components/PatientsCard";
import config from "../../config";
const { width, height } = Dimensions.get("screen");
import { LCGCenterModal, LCGButton, LCGBottomModal } from "../../components";
import { styles } from "../../components/divider/LCGDividerStyles";

const option = ["Show", "Hide"];

const data = [
  {
    id: 101,
    title: "Dipti Thakur",
    patient_id: "PL004",
    uhid: "445G",
    age: "30y",
    obsFormula: "G3 P2 L2 AO",
    delivryStatus: "Not Started",
    babyStatus: "",
  },
  {
    id: 102,
    title: "Meenakshi Soni",
    patient_id: "PL008",
    uhid: "445G",
    age: "33y",
    obsFormula: "G3 P2 L2 AO",
    delivryStatus: "Delivery Started",
    babyStatus: "",
  },
  {
    id: 103,
    title: "Poonam Soni",
    patient_id: "PL008",
    uhid: "445G",
    age: "33y",
    obsFormula: "G3 P2 L2 AO",
    delivryStatus: "Delivery Completed",
    babyStatus: "1 Baby Delivered",
  },
];

const WardPatientsList = ({ navigation }) => {
  const [menuOption, setmenuOption] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Patient Name");
  const [menuShow, setShowMenu] = useState(false);

  const onPressPatientAcrion = () => {
    setShowMenu(false);
    navigation.navigate(config.routes.PATIENTS_ACTIONS);
  };

  const onPressAssignWard = () => {
    setShowMenu(false);
    navigation.navigate(config.routes.ASSIGN_WARD);
  };

  return (
    <SafeAreaView style={local.container}>
      <View style={local.horizontalListView}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => setmenuOption(1)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 1 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.ALL_PATIENT}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(2)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 2 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.HIGH_RISK_PATIENT}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(3)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 3 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DELIVERY_INPROGRESS}</Text>
          </Pressable>

          <Pressable
            onPress={() => setmenuOption(4)}
            style={{
              ...local.listOptionView,
              borderBottomColor:
                menuOption == 4 ? config.colors.appTheme1 : "#fff",
            }}
          >
            <Text>{config.strings.OTHERS.DELIVERY_COMPLETED}</Text>
          </Pressable>
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
              onPress={() => setSortVisible(!sortVisible)}
              style={local.sortIconView}
            >
              <Image
                source={require("../../assets/images/dashboard/sortFilter.png")}
                style={local.sortIconImage}
              />
            </Pressable>
          </CardView>
        </View>

        <LCGBottomModal
          modalTitle={config.strings.OTHERS.SORT_BY}
          visibleModal={sortVisible}
          onCloseModal={() => setSortVisible(false)}
          modalContent={() => (
            <>
              <Pressable
                onPress={() => setSortOption("Patient Name")}
                style={local.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == "Patient Name"
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
                  onPress={() => setSortVisible(false)}
                  style={local.buttonSUbView}
                >
                  <Text style={local.buttonReset}>
                    {config.strings.BTN_TEXTS.RESET}{" "}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSortVisible(false)}
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
                onPress={() => onPressPatientAcrion()}
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
                onPress={() => setShowMenu(false)}
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

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PatientsCard
              onPress={() =>
                navigation.navigate(config.routes.PATIENTS_DETAIL, { details: item })
              }
              dataPateint={item}
              title="Dipti Thakur"
              id="PL005"
              age="30 y"
              onFlagPress={() => setIsVisible(!isVisible)}
              onOptionsPress={() => setShowMenu(!menuShow)}
              navigation={navigation}
            />
          )}
        />

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
                  {config.strings.OTHERS.HIGH_RISK_HEADING}
                </Text>
                <View style={local.hideAlertView}>
                  <Image
                    source={config.images.Checked}
                    style={local.checkboxImage}
                  />
                  <Text style={local.messageHeadingText}>
                    {config.strings.OTHERS.HIDE_ALERT_FUTURE}
                  </Text>
                </View>
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
                    onPress={() => setIsVisible(false)}
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
});

export default WardPatientsList;
