import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: config.colors.toastBorder,
    borderRadius: 6,
    backgroundColor: config.colors.toastBG,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingVertical: 8,
    elevation: 2,
  },
  borderLeftDefault: {
    borderLeftWidth: 8,
    borderLeftColor: config.colors.toastDefault,
  },
  borderLeftSuccess: {
    borderLeftWidth: 8,
    borderLeftColor: config.colors.toastSuccess,
  },
  borderLeftError: {
    borderLeftWidth: 8,
    borderLeftColor: config.colors.toastError,
  },
  borderLeftInfo: {
    borderLeftWidth: 8,
    borderLeftColor: config.colors.toastInfo,
  },
  borderLeftWarning: {
    borderLeftWidth: 8,
    borderLeftColor: config.colors.toastWarning,
  },
  leadingIconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailingIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: config.colors.toastRightIconBGView,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    alignSelf: 'center',
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // in case of rtl the text will start from the right
  },
  trailingIcon: {
    color: config.colors.toastRightIcon,
  },
  leadingIconDefault: {
    marginVertical: 10,
    color: config.colors.toastDefault,
  },
  leadingIconSuccess: {
    marginVertical: 10,
    color: config.colors.toastSuccess,
  },
  leadingIconError: {
    marginVertical: 10,
    color: config.colors.toastError,
  },
  leadingIconInfo: {
    marginVertical: 10,
    color: config.colors.toastInfo,
  },
  leadingIconWarning: {
    marginVertical: 10,
    color: config.colors.toastWarning,
  },
  text1: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BLACK_900,
    color: config.colors.toastRightIcon,
    paddingTop: 10,
  },
  text2Default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.toastRightIcon,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text2Success: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.toastRightIcon,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text2Error: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.toastRightIcon,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text2Info: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.toastRightIcon,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text2Warning: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.toastRightIcon,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
