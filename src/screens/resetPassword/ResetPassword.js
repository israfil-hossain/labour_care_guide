import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGTextInput,
  LCGButton,
  LCGDivider,
  LCGCenterModal,
} from "../../components";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { User, ResetPasword } from "../../reduxStates";
import { CommonUtils, EnumUtils } from "../../utils";

const ResetPassword = ({ navigation, route }) => {
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [newPassSecure, setNewPassSecure] = useState(true);
  const [confPassSecure, setConfPassSecure] = useState(true);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const dispatch = useDispatch();

  //Selectors
  const PasswordResetResponse = useSelector(ResetPasword.selectResetPass);
  const PasswordResErrorResponse = useSelector(
    ResetPasword.selectResetPassResponse
  );

  useEffect(() => {
    if (PasswordResetResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: PasswordResetResponse?.message,
      });
      navigation.navigate(config.routes.LOGIN);
    }
  }, [PasswordResetResponse]);

  useEffect(() => {
    if (PasswordResErrorResponse?.status == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: PasswordResErrorResponse?.message,
      });
      dispatch(ResetPasword.removeResetPassResponse());
    }
  }, [PasswordResErrorResponse]);

  const onPressSubmit = () => {
    if (newPassword == "" || newPassword.length < 3) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.NEW_PASSWORD,
      });
    } else if (confPassword == "" || confPassword != newPassword) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.CONFIRM_PASSWORD,
      });
    } else if (otpCode == "" || otpCode.length < 4) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_VALIDOTP,
      });
    } else {
      callResetPasswordApi();
    }
  };

  const callResetPasswordApi = () => {
    const payload = {
      email: route?.params?.emailUser,
      otp: otpCode,
      password: newPassword,
    };
    dispatch({
      type: "RESET_PASSWORD",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <View style={styles.upperContentWrapper}>
          <LCGTextInput
            containerStyle={styles.passwordContainer}
            rightAccessory={
              newPassSecure
                ? config.iconNames.EYE_HIDDEN
                : config.iconNames.EYE_VISIBLE
            }
            onPressRightAccessory={() => setNewPassSecure(!newPassSecure)}
            onChangeText={(text) => setNewPassword(text)}
            textInputProps={{
              value: newPassword,
              secureTextEntry: newPassSecure,
              placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.NEW_PASSWORD,
              keyboardType: config.keyboardTypes.ASCII_CAPABLE,
              returnKeyType: config.returnKeyTypes.DONE,
              maxLength: 20,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.NEW_PASSWORD}
          />

          <LCGTextInput
            containerStyle={styles.passwordContainer}
            rightAccessory={
              confPassSecure
                ? config.iconNames.EYE_HIDDEN
                : config.iconNames.EYE_VISIBLE
            }
            onPressRightAccessory={() => setConfPassSecure(!confPassSecure)}
            onChangeText={(text) => setConfPassword(text)}
            textInputProps={{
              value: confPassword,
              secureTextEntry: confPassSecure,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS
                  .CONFIRM_PASSWORD_PLACEHOLDER,
              keyboardType: config.keyboardTypes.ASCII_CAPABLE,
              returnKeyType: config.returnKeyTypes.DONE,
              maxLength: 20,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.CONFIRM_PASSWORD_LABEL}
          />

          <LCGTextInput
            containerStyle={styles.passwordContainer}
            onChangeText={(text) => setOtpCode(text)}
            textInputProps={{
              value: otpCode,
              placeholder: config.strings.TEXT_INPUT_PLACEHOLDERS.OTP,
              keyboardType: config.keyboardTypes.NUMBER_PAD,
              returnKeyType: config.returnKeyTypes.DONE,
              maxLength: 4,
            }}
            labelText={config.strings.OTHERS.OTP_SCREEN_HEADING}
          />
        </View>

        <LCGButton
          containerStyle={styles.buttonContainer}
          buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
          onPress={() => onPressSubmit()}
        />
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.white },
  keyboardScroll: { paddingBottom: 24 },
  upperContentWrapper: { paddingHorizontal: 25 },
  passwordContainer: { marginTop: 23 },
  buttonContainer: { marginVertical: 30, marginHorizontal: 20 },
});

export default ResetPassword;
