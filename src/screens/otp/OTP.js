import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./OTPStyles";
import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { User, SendOtp } from "../../reduxStates";

const OTP = ({ navigation, route }) => {
  let otpCountDownInterval;

  const [otpCode, setOtpCode] = useState("");
  const [countDownSeconds, setCountDownSeconds] = useState(
    config.otpCountDownMaxLimitInSeconds
  );

  const routeParams = route?.params;
  const dispatch = useDispatch();

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const UserResponse = useSelector(User.selectUserErrorResponse);
  const OtpResponse = useSelector(SendOtp.selectOtp);
  const OtpErrorResponse = useSelector(SendOtp.selectOtpResponse);

  useEffect(() => {
    if (OtpResponse?.success == true) {
      showToast({
        type: toastTypes.WARNING,
        text2: OtpResponse?.message,
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

  useEffect(() => {
    if (UserResponse?.status == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: UserResponse?.message,
      });
      dispatch(User.removeLoginResponse());
    }
  }, [UserResponse]);

  const runCountDown = () => {
    otpCountDownInterval = setInterval(() => {
      if (countDownSeconds > 0) {
        setCountDownSeconds(countDownSeconds - 1);
      } else {
        clearInterval(otpCountDownInterval);
      }
    }, 1000);
  };

  useEffect(() => {
    runCountDown();
    return () => {
      clearInterval(otpCountDownInterval);
    };
  });

  const onResendOtpBtnPress = () => {
    setCountDownSeconds(config.otpCountDownMaxLimitInSeconds);
    runCountDown();
    callSendOtpApi();
  };

  const onSubmitBtnPress = () => {
    if (otpCode !== "" && otpCode.length === config.otpPinCount) {
      callLoginApi();
      return;
    }
    showToast({
      type: toastTypes.WARNING,
      text2: config.customMessages.INVALID_OTP_CODE,
    });
  };

  const callLoginApi = () => {
    if (routeParams?.userEmail == "" || routeParams?.userEmail == null) {
      const payload = {
        mobile: routeParams?.userMobilenum,
        otp: otpCode,
      };
      dispatch({
        type: "LOGIN",
        payload,
      });
    } else {
      const payload = {
        email: routeParams?.userEmail,
        otp: otpCode,
      };
      dispatch({
        type: "LOGIN",
        payload,
      });
    }
  };

  const callSendOtpApi = () => {
    if (routeParams?.userEmail == "" || routeParams?.userEmail == null) {
      const payload = {
        mobile: routeParams?.userMobilenum,
      };
      dispatch({
        type: "SEND_OTP",
        payload,
      });
    } else {
      const payload = {
        email: routeParams?.userEmail,
      };
      dispatch({
        type: "SEND_OTP",
        payload,
      });
    }
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
            {config.strings.OTHERS.OTP_SCREEN_SUBHEADING}
          </Text>
          <LCGOtpBlocks
            pinCount={config.otpPinCount}
            style={styles.pinContainer}
            onCodeFilled={(code) => setOtpCode(code)}
            autoFocusOnLoad={true}
          />
          <View style={styles.countdownContainer}>
            {countDownSeconds > 0 ? (
              <Text style={styles.timerText}>{`00:${countDownSeconds}`}</Text>
            ) : (
              <LCGButton
                containerStyle={styles.resendBtnContainer}
                buttonType="tertiary"
                buttonText="Resend OTP"
                onPress={onResendOtpBtnPress}
              />
            )}
          </View>
          <LCGButton
            buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
            onPress={onSubmitBtnPress}
          />
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default OTP;
