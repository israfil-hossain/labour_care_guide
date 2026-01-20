import {StyleSheet} from 'react-native';
import config from '../../config';
import {CommonUtils} from '../../utils';

export const styles = StyleSheet.create({
  mainBackViewStyle: {
    
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderStyle: {
    backgroundColor: `rgba(0,0,0,0.2)`,
    height: 90,
    width: 90,
    zIndex: 5,
    borderRadius: 13,
    justifyContent: 'space-around',
  },
});
