import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: config.colors.white},
  keyboardScroll: {paddingBottom: 24,},
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
    marginBottom: 37,
  },
  buttonContainer: {marginVertical: 20},
  textInputWrapper: {flexDirection: 'row'},
  pickerContainer: {flex: 0.3, marginRight: 10},
  textInputContainer: {flex: 0.7},
  orTextMainWrapper: {
    marginVertical:30,
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
});
