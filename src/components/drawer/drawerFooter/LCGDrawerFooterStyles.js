import {StyleSheet} from 'react-native';
import config from '../../../config';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  addInstituteContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addInstituteIconContainer: {
    height: 22,
    width: 22,
    borderRadius: 6,
    backgroundColor: config.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  addInstituteText: {
    flex: 1,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 18,
    lineHeight: 35,
    color: config.colors.white,
  },
  versionText: {
    marginHorizontal: 15,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 13,
    lineHeight: 19.5,
    color: config.colors.textInputLabel,
    marginBottom: 13,
  },
  sloganText: {
    marginHorizontal: 15,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 13,
    lineHeight: 19.5,
    color: config.colors.neutralBlack,
  },
  divider: {
    marginBottom: 15,
    backgroundColor: config.colors.drawerFooterDivider,
  },
  heartIcon: {color: config.colors.appTheme1},
});
