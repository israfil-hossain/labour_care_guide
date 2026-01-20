/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../../config';
import {EnumUtils} from '../../utils';
import {styles} from './LCGToastStyles';
import {LCGIcon} from '../icon';

type Props = {
  viewType?: string,
  text1?: string,
  text2?: string,
  props?: Object,
};

const LCGToast = () => {
  /**
   * This function gets the border left style
   * @param viewType : is a type of toastTypes in EnumUtils
   */
  const getBorderLeftStyle = (
    viewType: string,
  ) => {
    let borderLeft = styles.borderLeftDefault;
    switch (viewType) {
      case EnumUtils.toastTypes.SUCCESS:
        borderLeft = styles.borderLeftSuccess;
        break;
      case EnumUtils.toastTypes.ERROR:
        borderLeft = styles.borderLeftError;
        break;
      case EnumUtils.toastTypes.INFO:
        borderLeft = styles.borderLeftInfo;
        break;
      case EnumUtils.toastTypes.WARNING:
        borderLeft = styles.borderLeftWarning;
        break;
      default:
        break;
    }
    return borderLeft;
  };

  /**
   * This function gets the text2 style
   * @param viewType : is a type of toastTypes in EnumUtils
   */
  const getText2Style = (
    viewType: string,
  ) => {
    let text2Style = styles.text2Default;
    switch (viewType) {
      case EnumUtils.toastTypes.SUCCESS:
        text2Style = styles.text2Success;
        break;
      case EnumUtils.toastTypes.ERROR:
        text2Style = styles.text2Error;
        break;
      case EnumUtils.toastTypes.INFO:
        text2Style = styles.text2Info;
        break;
      case EnumUtils.toastTypes.WARNING:
        text2Style = styles.text2Warning;
        break;
      default:
        break;
    }
    return text2Style;
  };

  /**
   * This function gets the leading icon props contains name and style
   * @param viewType : is a type of toastTypes in EnumUtils
   */
  const getLeadingIconProps = (
    viewType: string,
  ) => {
    let props = {
      name: config.iconNames.BLOCKED,
      style: styles.leadingIconDefault,
      size: 24,
    };
    switch (viewType) {
      case EnumUtils.toastTypes.SUCCESS:
        props = {
          name: config.iconNames.SUCCESS,
          style: styles.leadingIconSuccess,
          size: 24,
        };
        break;
      case EnumUtils.toastTypes.ERROR:
        props = {
          name: config.iconNames.ERROR,
          style: styles.leadingIconError,
          size: 24,
        };
        break;
      case EnumUtils.toastTypes.INFO:
        props = {
          name: config.iconNames.INFO,
          style: styles.leadingIconInfo,
          size: 24,
        };
        break;
      case EnumUtils.toastTypes.WARNING:
        props = {
          name: config.iconNames.WARNING,
          style: styles.leadingIconWarning,
          size: 24,
        };
        break;
      default:
        break;
    }
    return props;
  };

  /**
   * This function returns the toast view
   * @param {EnumUtils.toastTypes} viewType
   * @param {string} text1
   * @param {string} text2
   * @param {any} props
   */
  const getToastView = ({viewType, text1, text2, props}) => {
    const leadingIconProps = getLeadingIconProps(viewType);
    return (
      <TouchableOpacity
        style={[styles.base, getBorderLeftStyle(viewType)]}
        onPress={props?.onPress}
        activeOpacity={props?.onPress ? props.activeOpacity : 1}
      >
        <TouchableOpacity
          style={styles.leadingIconContainer}
          onPress={props?.onLeadingIconPress}
          activeOpacity={props?.onLeadingIconPress ? props?.activeOpacity : 1}
        >
          <LCGIcon
            name={leadingIconProps.name}
            iconStyle={leadingIconProps.style}
            size={leadingIconProps.size}
          />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          {text1 && text1 !== '' ? (
            <View>
              <Text style={styles.text1}>{text1}</Text>
            </View>
          ) : null}
          {text2 && text2 !== '' ? (
            <View>
              <Text style={getText2Style(viewType)}>{text2}</Text>
            </View>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.trailingIconContainer}
          onPress={() => {
            Toast.hide();
            props?.onTrailingIconPress?.();
          }}
          activeOpacity={props?.onTrailingIconPress ? props?.activeOpacity : 1}
        >
          <LCGIcon
            name={config.iconNames.CROSS_LIGHT}
            iconStyle={styles.trailingIcon}
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const toastConfig = {
    default: ({text1, text2, props}: Props) =>
      getToastView({
        viewType: EnumUtils.toastTypes.DEFAULT,
        text1,
        text2,
        props,
      }),
    success: ({text1, text2, props}: Props) =>
      getToastView({
        viewType: EnumUtils.toastTypes.SUCCESS,
        text1,
        text2,
        props,
      }),
    error: ({text1, text2, props}: Props) =>
      getToastView({viewType: EnumUtils.toastTypes.ERROR, text1, text2, props}),
    info: ({text1, text2, props}: Props) =>
      getToastView({viewType: EnumUtils.toastTypes.INFO, text1, text2, props}),
    warning: ({text1, text2, props}: Props) =>
      getToastView({
        viewType: EnumUtils.toastTypes.WARNING,
        text1,
        text2,
        props,
      }),
  };

  return <Toast config={toastConfig} refs={(ref) => Toast.setRef(ref)} />;
};

export default LCGToast;
