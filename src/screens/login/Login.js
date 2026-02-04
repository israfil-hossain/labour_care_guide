import React, { useRef, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { styles } from "./LoginStyles";
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGTextInput,
  LCGButton,
  LCGDivider,
  LCGCenterModal,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { useLogin } from "../../hooks/useAuth";


const Login = ({ navigation }) => {
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const { mutate: login, isPending } = useLogin();

  const onLoginBtnPress = () => {
    const validEmail = validateEmail();
    if (email == "" || validEmail != true) {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_EMAIL,
      });
    } else if (password == "") {
      showToast({
        type: toastTypes.WARNING,
        text2: config.strings.VALIDATION_MSG.ENTER_PASSWORD,
      });
    } else {
      login({ email, password });
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

  const onLoginWithMobileBtnPress = () => {
    navigation.navigate(config.routes.MOBILE);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsVisible(!isVisible)}
          style={styles.infoImageView}
        >
          <Image source={config.images.Info} style={styles.infoImage} />
        </TouchableOpacity>
        <LCGCenterModal
          visible={isVisible}
          onClose={() => setIsVisible(false)}
          modalContent={() => (
            <View style={styles.messageHeadingView}>
              <Text style={styles.messageHeadingText}>Message</Text>
              <Text style={styles.messageDataText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
            </View>
          )}
        />

        <Image source={config.images.lcgAppLogo} style={styles.logo} />

        <View style={styles.upperContentWrapper}>
          <Text style={styles.headingText}>
            {config.strings.OTHERS.LOGIN_SCREEN_HEADING_TEXT}
          </Text>
          <LCGTextInput
            onChangeText={(text) => setEmail(text)}
            textInputProps={{
              value: email,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.EMAIL_PLACEHOLDER,
              keyboardType: config.keyboardTypes.EMAIL_ADDRESS,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.NONE,
              onSubmitEditing: () => passwordRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.EMAIL_LABEL}
          />
          <LCGTextInput
            containerStyle={styles.passwordContainer}
            rightAccessory={
              isSecurePassword
                ? config.iconNames.EYE_HIDDEN
                : config.iconNames.EYE_VISIBLE
            }
            onPressRightAccessory={() => setIsSecurePassword(!isSecurePassword)}
            inputRef={passwordRef}
            onChangeText={(text) => setPassword(text)}
            textInputProps={{
              value: password,
              secureTextEntry: isSecurePassword,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.PASSWORD_PLACEHOLDER,
              keyboardType: config.keyboardTypes.ASCII_CAPABLE,
              returnKeyType: config.returnKeyTypes.DONE,
              maxLength: 20,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.PASSWORD_LABEL}
          />

          <View style={styles.forgotPasswordView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate(config.routes.FORGOT_PASSWORD)}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <LCGButton
            containerStyle={styles.buttonContainer}
            buttonText={config.strings.BTN_TEXTS.LOGIN_BTN_TEXT}
            onPress={onLoginBtnPress}
            disabled={isPending}
          />

          <View style={styles.orTextMainWrapper}>
            <LCGDivider style={styles.orTextDivider} />
            <Text style={styles.orText}>{config.strings.OTHERS.OR_TEXT}</Text>
            <LCGDivider style={styles.orTextDivider} />
          </View>

          <LCGButton
            buttonType="secondary"
            containerStyle={styles.buttonContainer}
            buttonText={config.strings.BTN_TEXTS.LOGIN_WITH_MOBILE_BTN_TEXT}
            onPress={onLoginWithMobileBtnPress}
          />
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default Login;
