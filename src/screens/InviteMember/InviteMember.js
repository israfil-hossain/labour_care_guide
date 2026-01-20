/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {styles} from './InviteMemberStyles';
import {useDispatch} from 'react-redux';
import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGRadioButtons,
  LCGTextInput,
  LCGCustomPicker,
  LCGButton,
  LCGAvatar,
} from '../../components';
import config from '../../config';
import {profileSetup} from '../../staticData';
import {User} from '../../reduxStates';
import LCGInviteHeader from '../../components/customHeader/LCGInviteHeader';
import fontFamily from '../../config/fontFamily';

const InviteMember = ({navigation, route}) => {
  const dispatch = useDispatch();

  const uhidRef = useRef();
  const parityRef = useRef();
  const labourRef = useRef();
  const cityRef = useRef();
  const medicalCounsilRef = useRef();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [medicalCouncil, setMedicalCouncil] = useState('');

  const routeParams = route?.params;

  const onSubmitBtnPress = () => {
    navigation.goBack();
    // const isFromLogin = routeParams?.isFromLogin;
    // if (isFromLogin) {
    //   dispatch(User.saveUserLogin({jwt_token: 'dasdasgueygyuagdua'}));
    // } else {
    //   navigation.navigate(config.routes.LOGIN);
    // }
  };

  const onAddPhotoBtnPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <LCGInviteHeader
        route={route}
        onPressLeftAccessory={() => {
          navigation.goBack();
        }}
        onPressRightAccessory={() => {
          // navigation.navigate(config.routes.INVITE_MEMBER);
        }}
        leftAccessoryName={config.iconNames.CROSS_LIGHT}
        title={config.strings.Invite}
      />
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        {/* <View style={styles.avatarContentWrapper}>
          <LCGAvatar placeholder={config.images.lcgUserImgPlaceholder} />
          <LCGButton
            buttonType="quaternary"
            containerStyle={styles.addPhotoBtnContainer}
            buttonText={config.strings.BTN_TEXTS.ADD_PHOTO_BTN_TEXT}
            onPress={onAddPhotoBtnPress}
          />
        </View> */}
        <View style={styles.contentWrapper}>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: '#25282B',
                fontFamily: config.fontFamily.LATO_REGULAR_400,
                fontWeight: '600',
                fontSize: 18,
                marginBottom: 20,
                fontStyle: 'normal',
              }}
            >
              Know any coworker who should join?
            </Text>
          </View>
          <LCGTextInput
            onChangeText={text => setName(text)}
            containerStyle={styles.inputContainer}
            textInputProps={{
              value: name,
              placeholder: config.strings.TEXT_INPUT_LABELS.Enter_Email_id,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
              onSubmitEditing: () => uhidRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.Add_email_address}
          />
          <LCGTextInput
            onChangeText={text => setAge(text)}
            containerStyle={styles.inputContainer}
            inputRef={uhidRef}
            textInputProps={{
              value: age,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.UHID_PLACEHOLDER,
              keyboardType: config.keyboardTypes.NUMBER_PAD,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.NONE,
              onSubmitEditing: () => parityRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.UHID_LABEL}
          />

          <LCGButton
            containerStyle={styles.submitBtnContainer}
            buttonText={config.strings.BTN_TEXTS.Share_your_invite_link}
            onPress={onSubmitBtnPress}
          />
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default InviteMember;
