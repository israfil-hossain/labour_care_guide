import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  commonRadio: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  uncheckedRadioOuterCircle: {
    borderColor: config.colors.tabInactive,
  },
  checkedRadioOuterCircle: {
    borderColor: config.colors.appTheme1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedRadioInnerCircle: {
    backgroundColor: config.colors.appTheme1,
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  commonRadioText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 16.8,
  },
  uncheckedRadioText: {color: config.colors.tabInactive},
  checkedRadioText: {color: config.colors.neutralBlack},
  radioBtnWithTextWrapper: {flexDirection: 'row', alignSelf: 'flex-start'},
  horizontalRadioContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  verticalRadioContainer: {flexDirection: 'column', alignSelf: 'flex-start'},
  scrollContainer: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  horizontalRadios: {marginRight: 23},
  verticalRadios: {marginBottom: 12},
  overflowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
});
