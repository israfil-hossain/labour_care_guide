import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: config.colors.white},
  keyboardScroll: {paddingBottom: 24},
  logo: {marginTop: 76, marginHorizontal: 97, marginBottom: 33},
  headingText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 26,
    lineHeight: 46,
    color: config.colors.appTheme1,
    marginBottom: 27,
  },
  upperContentWrapper: {paddingHorizontal: 25},
  passwordContainer: {marginTop: 23},
  buttonContainer: {marginTop: 33},
  orTextMainWrapper: {
    marginTop: 34,
    marginBottom: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orTextDivider: {backgroundColor: config.colors.orText, width: 41},
  orText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 16.8,
    color: config.colors.orText,
    marginHorizontal: 8,
  },
  socialBtnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 39,
  },
  googleIcon: {color: config.colors.google},
  facebookIcon: {color: config.colors.facebook},
  linkedInIcon: {color: config.colors.linkedIn},
  newUserTextContainer: {alignItems: 'center', justifyContent: 'center'},
  newUserText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 16.8,
    color: config.colors.neutralBlack,
  },
  registerNowText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 14,
    lineHeight: 16.8,
    color: config.colors.appTheme1,
  },
});
