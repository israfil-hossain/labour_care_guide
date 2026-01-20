import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./MobileStyles";
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGTextInput,
  LCGButton,
  LCGCustomPicker,
  LCGDivider,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { User, SendOtp } from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";

const Mobile = ({ navigation, route }) => {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const dispatch = useDispatch();

  //Selectors
  const OtpResponse = useSelector(SendOtp.selectOtp);
  const OtpErrorResponse = useSelector(SendOtp.selectOtpResponse);

  console.log("OtpResponse", OtpResponse);
  console.log("OtpErrorResponse", OtpErrorResponse);

  useEffect(() => {
    if (OtpResponse?.success == true) {
      showToast({
        type: toastTypes.WARNING,
        text2: OtpResponse?.message,
      });
      navigation.navigate(config.routes.OTP, {
        userEmail: email,
        userMobilenum: mobile,
      });
    }
  }, [OtpResponse]);

  useEffect(() => {
    if (OtpErrorResponse?.status == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: OtpErrorResponse?.message,
      });
      dispatch(SendOtp.removeSendOtpResponse());
    }
  }, [OtpErrorResponse]);

  const onGetOtpBtnPress = (type) => {
    if (type == "email") {
      setShowEmail(true);
      setShowMobile(false);
    } else {
      setShowEmail(false);
      setShowMobile(true);
    }
  };

  const onSubmitEmail = () => {
    const validEmail = validateEmail();
    if (email == "" || validEmail != true) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_EMAIL,
      });
    } else {
      callSendOtpOnEmailApi();
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

  const callSendOtpOnEmailApi = () => {
    const payload = {
      email: email,
    };
    dispatch({
      type: "SEND_OTP",
      payload,
    });
  };

  const onSubmitMobile = () => {
    if (mobile == "" || mobile.length < 10) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_MOBILE,
      });
    } else {
      callSendOtpOnMobileApi();
    }
  };

  const callSendOtpOnMobileApi = () => {
    const payload = {
      mobile: mobile,
    };
    dispatch({
      type: "SEND_OTP",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <View style={styles.screenContentWrapper}>
          <Text style={styles.headingText}>
            {config.strings.OTHERS.OTP_SCREEN_HEADING}
          </Text>
          <Text style={styles.subheadingText}>
            {config.strings.OTHERS.MOBILE_SCREEN_SUBHEADING_TEXT}
          </Text>

          <LCGButton
            buttonType="secondary"
            containerStyle={styles.buttonContainer}
            buttonText={"Get an OTP in your Email"}
            onPress={() => onGetOtpBtnPress("email")}
          />

          {showEmail == true && (
            <LCGTextInput
              onChangeText={(text) => setEmail(text)}
              textInputProps={{
                value: email,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.EMAIL_PLACEHOLDER,
                keyboardType: config.keyboardTypes.EMAIL_ADDRESS,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
              labelText={config.strings.TEXT_INPUT_LABELS.EMAIL_LABEL}
            />
          )}

          <View style={styles.orTextMainWrapper}>
            <LCGDivider style={styles.orTextDivider} />
            <Text style={styles.orText}>{config.strings.OTHERS.OR_TEXT}</Text>
            <LCGDivider style={styles.orTextDivider} />
          </View>

          <LCGButton
            buttonType="secondary"
            containerStyle={styles.buttonContainer}
            buttonText={"Get an OTP in your Mobile no."}
            onPress={() => onGetOtpBtnPress("phone")}
          />

          {showMobile == true && (
            <LCGTextInput
              onChangeText={(text) => setMobile(text)}
              textInputProps={{
                value: mobile,
                placeholder:
                  config.strings.TEXT_INPUT_PLACEHOLDERS.MOBILE_PLACEHOLDER,
                keyboardType: config.keyboardTypes.NUMBER_PAD,
                autoCapitalize: config.autoCapitalizeTypes.NONE,
              }}
              labelText={config.strings.TEXT_INPUT_LABELS.MOBILE_NO_LABEL}
            />
          )}

          {showEmail == true && (
            <LCGButton
              buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
              containerStyle={{ marginVertical: 30 }}
              onPress={() => onSubmitEmail()}
            />
          )}

          {showMobile == true && (
            <LCGButton
              buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
              containerStyle={{ marginVertical: 30 }}
              onPress={() => onSubmitMobile()}
            />
          )}
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default Mobile;
