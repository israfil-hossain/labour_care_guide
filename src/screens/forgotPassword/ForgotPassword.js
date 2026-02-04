import React, { useState } from "react";
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
import { CommonUtils, EnumUtils } from "../../utils";
import { useForgotPassword } from "../../hooks/useAuth";

const ForgotPassowrd = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onPressSubmit = () => {
    const validEmail = validateEmail();
    if (email == "" || validEmail != true) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_EMAIL,
      });
    } else {
      forgotPassword(
        { email },
        {
          onSuccess: () => {
            setIsVisible(true);
          },
        }
      );
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

  const onCloseModal = () => {
    setIsVisible(false);
    navigation.navigate(config.routes.RESET_PASSWORD, { emailUser: email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <View style={styles.screenContentWrapper}>
          <Text style={styles.headingText}>
            {config.strings.TEXT_INPUT_LABELS.EMAIL_LABEL}
          </Text>
          <Text style={styles.subheadingText}>
            {config.strings.OTHERS.RECEIVE_LINK}
          </Text>
        </View>

        <View style={styles.upperContentWrapper}>
          <LCGTextInput
            onChangeText={(text) => setEmail(text)}
            textInputProps={{
              value: email,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.EMAIL_PLACEHOLDER,
              keyboardType: config.keyboardTypes.EMAIL_ADDRESS,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.NONE,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.EMAIL_LABEL}
          />
        </View>

        <LCGButton
          containerStyle={styles.buttonContainer}
          buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
          onPress={() => onPressSubmit()}
          disabled={isPending}
        />

        <LCGCenterModal
          visible={isVisible}
          onClose={() => onCloseModal()}
          modalContent={() => {
            return (
              <View style={styles.messageHeadingView}>
                <Image
                  source={config.images.ResetPassword}
                  style={styles.passwordImage}
                />
                <Text style={styles.messageHeadingText}>
                  {config.strings.OTHERS.RESET_PASSWORD_HEADING}
                </Text>
                <LCGButton
                  containerStyle={{ ...styles.buttonContainer, width: "50%" }}
                  buttonText={config.strings.BTN_TEXTS.OK}
                  onPress={() => onCloseModal()}
                />
              </View>
            );
          }}
        />
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default ForgotPassowrd;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.white },
  keyboardScroll: { paddingBottom: 24 },
  screenContentWrapper: { flex: 1, paddingHorizontal: 25, paddingTop: 16 },
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
  buttonContainer: { marginVertical: 30, marginHorizontal: 20 },
  textInputWrapper: { flexDirection: "row" },
  pickerContainer: { flex: 0.3, marginRight: 10 },
  textInputContainer: { flex: 0.7 },
  orTextMainWrapper: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  orTextDivider: { backgroundColor: config.colors.orText, width: 41 },
  orText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 16.8,
    color: config.colors.orText,
    marginHorizontal: 8,
  },
  headingText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 26,
    lineHeight: 46,
    color: config.colors.appTheme1,
    marginBottom: 27,
  },
  upperContentWrapper: { paddingHorizontal: 25 },

  orTextMainWrapper: {
    marginVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  messageHeadingView: { alignItems: "center" },
  passwordImage: { width: 50, height: 50 },
  messageHeadingText: {
    color: config.colors.neutralBlack,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 17,
  },
});
