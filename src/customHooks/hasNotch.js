import {Platform, Dimensions} from 'react-native';
import Constants from 'expo-constants';

export const hasNotch = () => {
  if (Platform.OS === 'ios') {
    const {height, width} = Dimensions.get('window');
    const statusBarHeight = Constants.statusBarHeight;
    
    // Check for notch based on screen dimensions and status bar height
    const isIPhoneX = height >= 812 && width >= 375 && statusBarHeight > 20;
    return isIPhoneX;
  }
  
  // For Android, check status bar height
  return Constants.statusBarHeight > 24;
};

export default hasNotch;
