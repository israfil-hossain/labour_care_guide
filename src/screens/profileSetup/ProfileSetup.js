import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
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
import {styles} from './ProfileSetupStyles';
import {profileSetup} from '../../staticData';
import {User} from '../../reduxStates';

const ProfileSetup = ({navigation, route}) => {
  const dispatch = useDispatch();

  const ageRef = useRef();
  const instituteRef = useRef();
  const cityRef = useRef();
  const medicalCounsilRef = useRef();

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [medicalCouncil, setMedicalCouncil] = useState('');

  const routeParams = route?.params;

  const onSubmitBtnPress = () => {
    const isFromLogin = routeParams?.isFromLogin;
    if (isFromLogin) {
      dispatch(User.saveUserLogin({jwt_token: 'dasdasgueygyuagdua'}));
    } else {
      navigation.navigate(config.routes.LOGIN);
    }
  };

  const onAddPhotoBtnPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <LCGKeyboardAvoidingAnimatedScroll
        navigation={navigation}
        customContentContainerStyle={styles.keyboardScroll}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {config.strings.OTHERS.ARE_YOU_A_TEXT}
          </Text>
          <LCGRadioButtons
            btnsArray={profileSetup.getTypeRadioButtonsArr()}
            selectedItemIndex={selectedTypeIndex}
            onSelectingItem={({newSelectedIndex}) =>
              setSelectedTypeIndex(newSelectedIndex)
            }
          />
        </View>
        <View style={styles.avatarContentWrapper}>
          <LCGAvatar placeholder={config.images.lcgUserImgPlaceholder} />
          <LCGButton
            buttonType="quaternary"
            containerStyle={styles.addPhotoBtnContainer}
            buttonText={config.strings.BTN_TEXTS.ADD_PHOTO_BTN_TEXT}
            onPress={onAddPhotoBtnPress}
          />
        </View>
        <View style={styles.contentWrapper}>
          <LCGTextInput
            onChangeText={text => setName(text)}
            containerStyle={styles.inputContainer}
            textInputProps={{
              value: name,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.NAME_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
              onSubmitEditing: () => ageRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.NAME_LABEL}
          />
          <LCGTextInput
            onChangeText={text => setAge(text)}
            containerStyle={styles.inputContainer}
            inputRef={ageRef}
            textInputProps={{
              value: age,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.AGE_PLACEHOLDER,
              keyboardType: config.keyboardTypes.NUMBER_PAD,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.NONE,
              onSubmitEditing: () => instituteRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.AGE_LABEL}
          />
          <LCGCustomPicker
            containerStyle={styles.inputContainer}
            textInputLabelText={config.strings.TEXT_INPUT_LABELS.GENDER_LABEL}
            placeholderText={
              config.strings.TEXT_INPUT_PLACEHOLDERS.GENDER_PLACEHOLDER
            }
            textInputType="box_static"
            listArray={profileSetup.getGenderArr()}
            defaultSelectedItem={selectedGender}
            onSelectingItem={({item}) => setSelectedGender(item)}
            valueForField={selectedGender?.text}
          />
          <LCGTextInput
            onChangeText={text => setInstitute(text)}
            containerStyle={styles.inputContainer}
            inputRef={instituteRef}
            textInputProps={{
              value: institute,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.INSTITUTE_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
              onSubmitEditing: () => cityRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.INSTITUTE_LABEL}
          />
          <LCGTextInput
            onChangeText={text => setCity(text)}
            containerStyle={styles.inputContainer}
            inputRef={cityRef}
            textInputProps={{
              value: city,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.CITY_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.NEXT,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
              onSubmitEditing: () => medicalCounsilRef.current?.focus?.(),
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.CITY_LABEL}
          />
          <LCGTextInput
            onChangeText={text => setMedicalCouncil(text)}
            containerStyle={styles.inputContainer}
            inputRef={medicalCounsilRef}
            textInputProps={{
              value: medicalCouncil,
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS
                  .MEDICAL_COUNCIL_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.DONE,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
            }}
            labelText={config.strings.TEXT_INPUT_LABELS.MEDICAL_COUNCIL_LABEL}
          />
          <LCGButton
            containerStyle={styles.submitBtnContainer}
            buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
            onPress={onSubmitBtnPress}
          />
        </View>
      </LCGKeyboardAvoidingAnimatedScroll>
    </SafeAreaView>
  );
};

export default ProfileSetup;
