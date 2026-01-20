import * as React from 'react';
import {Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
import {toastTypes} from './enumUtils';

export const getHexColorWithOpacity = (
  hexColorCode,
  opacity,
) => {
  const newOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return `${hexColorCode}${newOpacity.toString(16).toUpperCase()}`;
};

export const isHorizontalScrollEnabled = (
  screenContentWidth,
) => {
  if (screenContentWidth > Dimensions.get('window').width) {
    return true;
  }
  return false;
};

export const isVerticalScrollEnabled = (
  screenContentHeight,
) => {
  if (screenContentHeight > Dimensions.get('window').height) {
    return true;
  }
  return false;
};

export const showToast = (options) => {
  let toastType = 'default';
  switch (options.type) {
    case toastTypes.SUCCESS:
      toastType = 'success';
      break;
    case toastTypes.ERROR:
      toastType = 'error';
      break;
    case toastTypes.INFO:
      toastType = 'info';
      break;
    case toastTypes.WARNING:
      toastType = 'warning';
      break;
    default:
      break;
  }
  Toast.show({
    type: toastType,
    position: options.position ? options.position : 'top',
    text1: options.text1 ? options.text1 : '',
    text2: options.text2 ? options.text2 : '',
    visibilityTime: options.visibilityTime ? options.visibilityTime : 4000,
    autoHide: !!(options.autoHide === null || options.autoHide === undefined),
    topOffset: options.topOffset ? options.topOffset : 30,
    bottomOffset: options.bottomOffset ? options.bottomOffset : 30,
    props: options.props,
  });
};
