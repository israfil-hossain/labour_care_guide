import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 74,
    width: 74,
    borderRadius: 40,
  },
  buttonBGColor: {backgroundColor: config.colors.avatarBGColor},
  rootView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    overflow: 'hidden',
    height: 74,
    width: 74,
    borderRadius: 40,
  },
  placeholderImage: {
    overflow: 'hidden',
    height: 40,
    width: 40,
    borderRadius: 24,
    alignSelf: 'center',
  },
});
