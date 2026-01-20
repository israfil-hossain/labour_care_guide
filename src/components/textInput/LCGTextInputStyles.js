import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent'},
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  wrapperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: config.colors.divider,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  wrapperBoxError: {borderColor: config.colors.mandatoryAsterisk},
  wrapperBoxDisabled: {borderColor: config.colors.disabled, opacity: 0.4},
  boxInputLabel: {
    marginBottom: 5,
    color: config.colors.neutralBlack,
  },
  label: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 14,
    lineHeight: 20,
    color: config.colors.textInputLabel,
  },
  disabledLabel: {
    color: config.colors.disabled,
    opacity: 0.4,
  },
  placeholderTextColor: {color: config.colors.textInputLabel},
  rightAccessory: {
    color: config.colors.textInputLabel,
    paddingVertical: 5,
  },
  disabledRightAccessory: {
    color: config.colors.disabled,
    fontSize: 20,
    paddingBottom: 5,
    opacity: 0.4,
  },
  textInput: {
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 16,
    lineHeight: 19.5,
    color: config.colors.neutralBlack,
    flex: 1,
  },
  disabledTextInput: {color: config.colors.disabled, opacity: 0.4},
  dividerNonError: {backgroundColor: config.colors.divider},
  dividerError: {backgroundColor: config.colors.mandatoryAsterisk},
  disabledDivider: {backgroundColor: config.colors.disabled, opacity: 0.4},
});
