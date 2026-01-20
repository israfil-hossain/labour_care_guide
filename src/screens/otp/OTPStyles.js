import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: config.colors.white},
  keyboardScroll: {paddingBottom: 24},
  screenContentWrapper: {flex: 1, paddingHorizontal: 25, paddingTop: 16},
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
    marginBottom: 38,
  },
  subheadingMobileText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 21,
    color: config.colors.appTheme1,
  },
  pinContainer: {marginBottom: 41, marginHorizontal: 40},
  timerText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 21,
    color: config.colors.neutralBlack,
  },
  resendBtnContainer: {alignSelf: 'center'},
  countdownContainer: {
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
