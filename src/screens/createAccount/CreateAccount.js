import React, {useRef, useState} from 'react';
import {View, Image, SafeAreaView, Text} from 'react-native';
import {styles} from './CreateAccountStyles';
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGTextInput,
  LCGButton,
  LCGDivider,
} from '../../components';
import config from '../../config';

const CreateAccount = ({navigation}) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const onCreateAccountBtnPress = () =>
    navigation.navigate(config.routes.PROFILE_SETUP, {isFromLogin: false});

  const onRegisterWithMobileBtnPress = () =>
    navigation.navigate(config.routes.MOBILE, {isFromLogin: false});

  const onGoogleBtnPress = () => {};

  const onFacebookBtnPress = () => {};

  const onLinkedInBtnPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <Image source={config.images.lcgAppLogo} style={styles.logo} />
        <View style={styles.upperContentWrapper}>
          <Text style={styles.headingText}>
            {config.strings.OTHERS.CREATE_ACCOUNT_SCREEN_HEADING_TEXT}
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
            onChangeText={text => setPassword(text)}
            textInputProps={{
              value: password,
              secureTextEntry: isSecurePassword,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.PASSWORD_PLACEHOLDER,
              keyboardType: config.keyboardTypes.ASCII_CAPABLE,
              returnKeyType: config.returnKeyTypes.NEXT,
              maxLength: 20,
              onSubmitEditing: () =>
                confirmPasswordRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.PASSWORD_LABEL}
          />
          <LCGTextInput
            containerStyle={styles.passwordContainer}
            rightAccessory={
              isSecureConfirmPassword
                ? config.iconNames.EYE_HIDDEN
                : config.iconNames.EYE_VISIBLE
            }
            onPressRightAccessory={() =>
              setIsSecureConfirmPassword(!isSecureConfirmPassword)
            }
            inputRef={confirmPasswordRef}
            onChangeText={text => setConfirmPassword(text)}
            textInputProps={{
              value: confirmPassword,
              secureTextEntry: isSecureConfirmPassword,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS
                  .CONFIRM_PASSWORD_PLACEHOLDER,
              keyboardType: config.keyboardTypes.ASCII_CAPABLE,
              returnKeyType: config.returnKeyTypes.DONE,
              maxLength: 20,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.CONFIRM_PASSWORD_LABEL}
          />
          <LCGButton
            containerStyle={styles.buttonContainer}
            buttonText={config.strings.BTN_TEXTS.CREATE_ACCOUNT_BTN_TEXT}
            onPress={onCreateAccountBtnPress}
          />
          <LCGButton
            buttonType="secondary"
            containerStyle={styles.buttonContainer}
            buttonText={config.strings.BTN_TEXTS.REGISTER_WITH_MOBILE_BTN_TEXT}
            onPress={onRegisterWithMobileBtnPress}
          />
          <View style={styles.orTextMainWrapper}>
            <LCGDivider style={styles.orTextDivider} />
            <Text style={styles.orText}>{config.strings.OTHERS.OR_TEXT}</Text>
            <LCGDivider style={styles.orTextDivider} />
          </View>
        </View>
        <View style={styles.socialBtnsWrapper}>
          <LCGButton
            buttonType="social"
            iconName={config.iconNames.GOOGLE}
            iconStyle={styles.googleIcon}
            onPress={onGoogleBtnPress}
          />
          <LCGButton
            buttonType="social"
            iconName={config.iconNames.FACEBOOK}
            iconStyle={styles.facebookIcon}
            onPress={onFacebookBtnPress}
          />
          <LCGButton
            buttonType="social"
            iconName={config.iconNames.LINKED_IN}
            iconStyle={styles.linkedInIcon}
            onPress={onLinkedInBtnPress}
          />
        </View>
        <View style={styles.newUserTextContainer}>
          <Text style={styles.newUserText}>
            {config.strings.OTHERS.ALREADY_HAVE_ACCOUNT_TEXT}
            <Text
              style={styles.registerNowText}
              onPress={() => navigation.goBack()}
            >
              {` ${config.strings.OTHERS.LOGIN_SCREEN_HEADING_TEXT}`}
            </Text>
          </Text>
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default CreateAccount;
