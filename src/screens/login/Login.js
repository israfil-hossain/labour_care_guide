import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../reduxStates";
import { CommonUtils, EnumUtils } from "../../utils";
import { authClient } from "../../lib/auth-client";


const Login = ({ navigation }) => {
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  const UserResponse = useSelector(User.selectUserErrorResponse);

  useEffect(() => {
    if (UserResponse?.status == false) {
      showToast({
        type: toastTypes.WARNING,
        text2: UserResponse?.message,
      });
      dispatch(User.removeLoginResponse());
    }
  }, [UserResponse]);

  const onLoginBtnPress = async () => {
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
      try {
        const response = await authClient.signIn.email({
          email,
          password,
        });

        console.log("Login response:", JSON.stringify(response, null, 2));

        if (response.error) {
          showToast({
            type: toastTypes.WARNING,
            text2: response.error.message || "Login failed. Please try again.",
          });
        } else if (response.data) {
          // Serialize user data (convert Date objects to ISO strings for Redux)
          const serializedUser = {
            ...response.data.user,
            createdAt: response.data.user.createdAt?.toString(),
            updatedAt: response.data.user.updatedAt?.toString(),
          };

          // Save user data and token to Redux
          dispatch(User.saveUserLogin(serializedUser));

          // Better Auth stores token automatically, we just need to set a flag
          // Use user ID as the auth token indicator since better-auth handles token storage
          dispatch(User.saveUserAuthToken(response.data.user?.id || "authenticated"));

          console.log("User logged in, should navigate now");
        }
      } catch (error) {
        console.error("Login error:", error);
        showToast({
          type: toastTypes.WARNING,
          text2: error.message || "An error occurred during login. Please try again.",
        });
      }
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
