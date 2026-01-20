import React, { useRef, useState,useEffect } from "react";
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
import { User, ResetPasword, PassChange } from "../../reduxStates";
import { CommonUtils, EnumUtils } from "../../utils";

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [newPassSecure, setNewPassSecure] = useState(true);
  const [confPassSecure, setConfPassSecure] = useState(true);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const dispatch = useDispatch();

  const PassChangeResponse = useSelector(PassChange.selectPassChange);

  useEffect(() => {
    if (PassChangeResponse?.success == true) {
      showToast({
        type: toastTypes.SUCCESS,
        text2: PassChangeResponse?.message,
      });
      navigation.goBack()
    }
  }, [PassChangeResponse]);

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
    } else {
      callChangePasswordApi();
    }
  };

  const callChangePasswordApi = () => {
    const payload = {
      password: newPassword,
    };
    dispatch({
      type: "CHANGE_PASSWORD",
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

export default ChangePassword;
