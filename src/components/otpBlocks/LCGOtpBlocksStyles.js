import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  textInput: {
    padding: 1,
    borderWidth: 1,
    marginRight: 5,
    textAlign: 'center',
    height: 45,
    width: 45,
    borderRadius: 6,
    borderColor: config.colors.orText,
    color: config.colors.orText,
  },
  blockFilled: {
    borderColor: config.colors.neutralBlack,
    color: config.colors.neutralBlack,
  },
  blockFilling: {
    borderColor: config.colors.appTheme1,
    color: config.colors.appTheme1,
  },
});
