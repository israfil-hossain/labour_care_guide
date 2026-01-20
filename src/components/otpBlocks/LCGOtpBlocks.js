/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import OTPInputView, {InputProps} from '@twotalltotems/react-native-otp-input';
import {styles} from './LCGOtpBlocksStyles';

const RMOTPBlocks = (props) => {
  const {pinCount, style, onCodeFilled} = props;

  return (
    <OTPInputView
      style={{...styles.container, ...style}}
      pinCount={pinCount}
      autoFocusOnLoad
      codeInputFieldStyle={styles.textInput}
      codeInputHighlightStyle={{...styles.textInput, ...styles.blockFilling}}
      onCodeFilled={(code) => onCodeFilled?.(code)}
      keyboardAppearance="default"
    />
  );
};

export default RMOTPBlocks;
