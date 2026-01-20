import {StyleSheet} from 'react-native';
import config from '../../../config';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: config.colors.appTheme1,
    flexDirection: 'row',
    alignItems: 'center',bottom:5,height:150
  },
  logoContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: config.colors.white,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  title: {
    flex: 1,
    marginHorizontal:20,
    color: config.colors.white,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: config.colors.white,
  },
  hospitalImage:{width:60,height:60}
});
