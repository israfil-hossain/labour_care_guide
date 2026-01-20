import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { styles } from "./ProfileStyles";
import { CommonUtils, EnumUtils } from "../../utils";
import config from "../../config";
import {
  User,
  DutyStatus,
  NotfStatus,
  ProfileStaff,
  ProfileStaffUpdate,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [institue, setInstitute] = useState("");
  const [city, setCity] = useState("");
  const [medCouncil, setMedCouncil] = useState("");
  const [gender, setGender] = useState("male");
  const [profession, setProfession] = useState("doctor");
  const [dateofBirth, setDateofBirth] = useState("");
  const [showLabourDate, setShowLabourDate] = useState(false);

  const dispatch = useDispatch();
  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);
  const UpdateProfileStaffResponse = useSelector(
    ProfileStaffUpdate.selectProfileUpdate
  );

 

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(ProfileStaffUpdate.saveProfileUpdate(null));
    };
  }, [navigation]);

  useEffect(() => {
    if (UpdateProfileStaffResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: UpdateProfileStaffResponse?.message,
      });
     
    }
  }, [UpdateProfileStaffResponse]);

  useEffect(() => {
    setProfileData();
  }, []);

  const onPressSave = () => {
    const validEmail = validateEmail();
    if (firstName == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_FIRST_NAME,
      });
    } else if (lastName == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_LAST_NAME,
      });
    } else if (dateofBirth == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_TIME,
      });
    } else if (email == "" || validEmail != true) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_EMAIL,
      });
    } else if (mobileNum == "" || mobileNum.length < 10) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MOBILE,
      });
    } else if (institue == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_INSTITUTE,
      });
    } else if (city == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_CITY,
      });
    } else if (medCouncil == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MED_COUNCIL,
      });
    } else {
      callUpdateProfileApi();
    }
  };

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };

  const setProfileData = () => {
    setFirstName(ProfileStaffResponse?.data?.firstName);
    setLastName(ProfileStaffResponse?.data?.lastName);
    setDateofBirth(ProfileStaffResponse?.data?.dateOfBirth);
    setGender(ProfileStaffResponse?.data?.gender);
    setProfession(ProfileStaffResponse?.data?.profession);
    setEmail(ProfileStaffResponse?.data?.email);
    setMobileNum(ProfileStaffResponse?.data?.mobile);
    setInstitute(ProfileStaffResponse?.data?.instituteName);
    setCity(ProfileStaffResponse?.data?.city);
    setMedCouncil(ProfileStaffResponse?.data?.medicalCouncil);
  };

  const callUpdateProfileApi = () => {
    const payload = {
      firstName: firstName,
      middleName: "",
      lastName: lastName,
      dateOfBirth: dateofBirth,
      gender: gender,
      email: email,
      city: city,
      medicalCouncil: medCouncil,
      profession: profession,
      initials: "",
      mobile: mobileNum,
      countryCode: "91",
      isAdmin: false,
    };
    dispatch({
      type: "UPDATE_PROFILE",
      payload,
    });
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
    setDateofBirth(formattedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.drugCard}>
            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.FIRST_NAME}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setFirstName(val)}
              value={firstName}
              placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.FIRST_NAME}
              autoCapitalize="none"
            />

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.LAST_NAME}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={config.strings.TEXT_INPUT_PLACEHOLDERS.LAST_NAME}
              autoCapitalize="none"
              onChangeText={(val) => setLastName(val)}
              value={lastName}
            />

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.DATE_OF_BIRTH}
            </Text>
            <Pressable onPress={()=> showLabourDatePicker()} style={styles.datebirthView}>
              <TextInput
                style={styles.dateTextInput}
                placeholder={
                  config.strings.TEXT_INPUT_PLACEHOLDERS.DATE_OF_BIRTH
                }
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={(val) => setDateofBirth(val)}
                value={dateofBirth}
                editable={false}
              />
              <Image
                style={styles.img}
                source={require("../../assets/images/calendarlightpng.png")}
              />
            </Pressable>

            <DateTimePickerModal
              isVisible={showLabourDate}
              mode="date"
              onConfirm={handleConfirmLabour}
              onCancel={hideLabourDatePicker}
            />

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.GENDER_LABEL}
            </Text>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => setGender("male")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    gender == "male"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.maleText}>
                  {config.strings.OTHERS.MALE}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGender("female")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    gender == "female"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.femaleText}>
                  {config.strings.OTHERS.FEMALE}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.PROFESSION}
            </Text>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => setProfession("doctor")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    profession == "doctor"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.maleText}>
                  {config.strings.OTHERS.DOCTOR}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setProfession("nurse")}
                style={styles.radioOptionView}
              >
                <Image
                  style={styles.img}
                  source={
                    profession == "nurse"
                      ? require("../../assets/images/RadioCheck.png")
                      : require("../../assets/images/RadioUncheck.png")
                  }
                />
                <Text style={styles.femaleText}>
                  {config.strings.OTHERS.NURSE}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.EMAIL_LABEL}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                config.strings.TEXT_INPUT_PLACEHOLDERS.EMAIL_PLACEHOLDER
              }
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
              value={email}
            />
            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.MOBILE_NO_LABEL}
            </Text>

            <View style={styles.viewStyle}>
              <Text style={styles.mobileText}>+91</Text>

              <TextInput
                style={styles.mobileInput}
                placeholder={
                  config.strings.TEXT_INPUT_PLACEHOLDERS.MOBILE_PLACEHOLDER
                }
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={(val) => setMobileNum(val)}
                value={mobileNum}
              />
            </View>

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.CITY_LABEL}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                config.strings.TEXT_INPUT_PLACEHOLDERS.CITY_PLACEHOLDER
              }
              autoCapitalize="none"
              onChangeText={(val) => setCity(val)}
              value={city}
            />

            <Text style={styles.drugText}>
              {config.strings.TEXT_INPUT_LABELS.MEDICAL_COUNCIL_LABEL}
            </Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder={
                config.strings.TEXT_INPUT_PLACEHOLDERS
                  .MEDICAL_COUNCIL_PLACEHOLDER
              }
              autoCapitalize="none"
              onChangeText={(val) => setMedCouncil(val)}
              value={medCouncil}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
