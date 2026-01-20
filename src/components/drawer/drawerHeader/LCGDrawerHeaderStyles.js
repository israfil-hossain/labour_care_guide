import {StyleSheet} from 'react-native';
import config from '../../../config';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: config.colors.appTheme1,
    flexDirection: 'row',
   justifyContent:'flex-end',
  },
  titleLabel: {
    flex: 1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 20,
    lineHeight: 24,
    color: config.colors.white,
  },
  iconContainer: {
    height: 28,
    width: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: config.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
