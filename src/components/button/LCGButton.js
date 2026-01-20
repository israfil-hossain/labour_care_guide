import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {LCGIcon} from '../icon';
import {styles} from './LCGButtonStyles';

type Props = {
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'social',
  buttonText?: string,
  onPress?: Function,
  buttonTextStyle?: Object,
  containerStyle?: Object,
  isDisabled?: boolean,
  iconName?: string,
  iconSize?: number,
  iconStyle?: Object,
  iconPlace?: 'text_prefix' | 'text_postfix',
};

const LCGButton = (props) => {
  const {
    buttonType = 'primary',
    buttonText = '',
    onPress,
    buttonTextStyle,
    containerStyle,
    isDisabled = false,
    iconName,
    iconSize = 24,
    iconStyle,
    iconPlace = 'text_prefix',
  } = props;

  const getBtnContainerStyle = () => {
    let style = [];
    switch (buttonType) {
      case 'secondary':
        style = [styles.commonBtnContainer, styles.secondaryBtnContainer];
        break;

      case 'tertiary':
        style = [styles.tertiaryBtnContainer];
        break;

      case 'quaternary':
        style = [styles.commonBtnContainer, styles.quaternaryBtnContainer];
        break;

      case 'social':
        style = [styles.commonBtnContainer, styles.socialBtnContainer];
        break;

      default:
        style = [styles.commonBtnContainer];
        break;
    }
    style.push(containerStyle);
    return style;
  };

  const getIconStyle = () => {
    let style =
      iconPlace === 'text_prefix'
        ? [styles.primaryPrefixIcon, iconStyle]
        : [styles.primaryPostfixIcon, iconStyle];
    if (buttonType === 'secondary') {
      style =
        iconPlace === 'text_prefix'
          ? [styles.secondaryPrefixIcon, iconStyle]
          : [styles.secondaryPostfixIcon, iconStyle];
    }
    return style;
  };

  const renderIcon = () => {
    return iconName && iconName !== '' ? (
      <LCGIcon name={iconName} size={iconSize} iconStyle={getIconStyle()} />
    ) : null;
  };

  const renderPrimaryButton = () => {
    return (
      <View style={styles.primarySecondaryBtnContentWrapper}>
        {iconPlace === 'text_prefix' ? renderIcon() : null}
        <Text
          style={[styles.primaryBtnText, buttonTextStyle]}
          numberOfLines={1}
        >
          {buttonText}
        </Text>
        {iconPlace === 'text_postfix' ? renderIcon() : null}
      </View>
    );
  };

  const renderSecondaryButton = () => {
    return (
      <View style={styles.primarySecondaryBtnContentWrapper}>
        {iconPlace === 'text_prefix' ? renderIcon() : null}
        <Text
          style={[styles.secondaryBtnText, buttonTextStyle]}
          numberOfLines={1}
        >
          {buttonText}
        </Text>
        {iconPlace === 'text_postfix' ? renderIcon() : null}
      </View>
    );
  };

  const renderTertiaryButton = () => {
    return (
      <Text style={[styles.tertiaryBtnText, buttonTextStyle]} numberOfLines={1}>
        {buttonText}
      </Text>
    );
  };

  const renderSocialButton = () => {
    return iconName && iconName !== '' ? (
      <LCGIcon name={iconName} size={iconSize} iconStyle={iconStyle} />
    ) : null;
  };

  const renderQuaternaryButton = () => {
    return (
      <Text
        style={[styles.quaternaryBtnText, buttonTextStyle]}
        numberOfLines={1}
      >
        {buttonText}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      disabled={isDisabled || !onPress}
      style={getBtnContainerStyle()}
    >
      {buttonType === 'primary' ? renderPrimaryButton() : null}
      {buttonType === 'secondary' ? renderSecondaryButton() : null}
      {buttonType === 'tertiary' ? renderTertiaryButton() : null}
      {buttonType === 'quaternary' ? renderQuaternaryButton() : null}
      {buttonType === 'social' ? renderSocialButton() : null}
    </TouchableOpacity>
  );
};

export default LCGButton;
