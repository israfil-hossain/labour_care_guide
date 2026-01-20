import {StyleSheet,Dimensions} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  layoout: {backgroundColor: config.colors.white},
  container: {
    backgroundColor: config.colors.white,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 18,
  },
  leftAccessory: {
    alignSelf: 'center',
    color: config.colors.headerLeftIcon,
  },
  rightAccessoryContainer: {alignSelf: 'center'},
  righttAccessoryIcon: {
    alignSelf: 'center',
    color: config.colors.appTheme1,
  },
  titleWrapper: {flex: 1, flexDirection: 'row', alignItems: 'center',},
  title: {
    flex: 0.7,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 17,
    color: config.colors.black,
    textAlign: 'left',
    marginHorizontal: 8,
  },
  titleLeftAccessoryContainer: {flex: 0.3},
  titleLeftImage: {width: 23, height: 27, marginLeft: 15},
  titleLeftIcon: {
    fontSize: 28,
    alignSelf: 'center',
    color: config.colors.appTheme1,
    marginLeft: 15,
  },
  hospitalImage:{
    borderRadius:20,
    marginLeft: 13,
    width: 35,
    height: 35,
   
  },
  hospitalNameText:{
    marginLeft: 10,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
    lineHeight: 19,
    color: "#25282B",
  },
  notImage:{
    marginHorizontal: 10,
    width: 20,
    height: 20,
  }
});
