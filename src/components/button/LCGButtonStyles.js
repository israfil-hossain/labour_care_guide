import {StyleSheet} from 'react-native';
import config from '../../config';
import {CommonUtils} from '../../utils';

export const styles = StyleSheet.create({
  commonBtnContainer: {
    backgroundColor: config.colors.appTheme1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowColor: CommonUtils.getHexColorWithOpacity(config.colors.shadow, 0.5),
    paddingHorizontal: 5,
    elevation: 5,
  },
  secondaryBtnContainer: {
    backgroundColor: config.colors.white,
    borderWidth: 1,
    borderColor: config.colors.black,
  },
  tertiaryBtnContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  quaternaryBtnContainer: {
    height: 26,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },
  socialBtnContainer: {
    backgroundColor: config.colors.white,
    width: 62,
    height: 46,
  },
  primarySecondaryBtnContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    textAlign: 'center',
    color: config.colors.white,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 15,
    lineHeight: 18,
  },
  secondaryBtnText: {
    textAlign: 'center',
    color: config.colors.black,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 15,
    lineHeight: 18,
  },
  tertiaryBtnText: {
    textAlign: 'left',
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    lineHeight: 16.8,
  },
  quaternaryBtnText: {
    textAlign: 'center',
    color: config.colors.white,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 12,
    lineHeight: 16,
  },
  primaryPrefixIcon: {
    marginRight: 10,
    color: config.colors.white,
  },
  primaryPostfixIcon: {
    marginLeft: 10,
    color: config.colors.white,
  },
  secondaryPrefixIcon: {
    marginRight: 10,
    color: config.colors.black,
  },
  secondaryPostfixIcon: {
    marginLeft: 10,
    color: config.colors.black,
  },
});
