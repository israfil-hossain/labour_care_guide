import * as React from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./LCGTextInputStyles";
import { LCGDivider } from "../divider";
import { LCGIcon } from "../icon";

type Props = {
  textInputType?: "label" | "no_label" | "static" | "box" | "box_static",
  labelText?: string,
  onPressRightAccessory?: Function,
  isDividerVisible?: boolean,
  rightAccessory?: string,
  rightAccessorySize?: number,
  rightAccessoryStyle?: Object,
  wrapperStyle?: Object,
  containerStyle?: Object,
  dividerStyle?: Object,
  labelStyle?: Object,
  inputRef?: Object,
  textInputProps?: React.ElementConfig<typeof TextInput>,
  onChangeText?: Function,
  onEndEditing?: Function,
  minimumLength?: number,
  isHandleErrors?: boolean,
  isOptional?: boolean,
  emptyErrorMsg?: string,
  minLengthErrorMsg?: string,
  isDisabled?: boolean,
  error?: Function,
};

const LCGTextInput = ({
  textInputType = "box",
  labelText,
  rightAccessory,
  onPressRightAccessory,
  isDividerVisible = false,
  rightAccessorySize,
  rightAccessoryStyle,
  wrapperStyle,
  containerStyle,
  labelStyle,
  dividerStyle,
  inputRef,
  textInputProps,
  onChangeText,
  onEndEditing,
  minimumLength = 0,
  isOptional = true,
  isHandleErrors = false,
  emptyErrorMsg,
  minLengthErrorMsg,
  isDisabled = false,
  error,
}: Props) => {
  const [fieldText, setFieldText] = React.useState("");
  const [isFieldError, setIsFieldError] = React.useState(false);

  React.useEffect(() => {
    setIsFieldError(false);
  }, [textInputType]);

  const permittedToHandleErrs = () => {
    return (
      textInputType !== "static" &&
      textInputType !== "box_static" &&
      !isOptional &&
      isHandleErrors
    );
  };

  const handlingErrors = (text) => {
    const trimmedText = text.trim();
    const trimmedTextLength =
      trimmedText && trimmedText !== "" ? trimmedText.length : 0;
    let isError = false;
    let errMsg = "";
    if (permittedToHandleErrs() && (!trimmedText || trimmedText === "")) {
      isError = true;
      errMsg = emptyErrorMsg;
    } else if (
      permittedToHandleErrs() &&
      minimumLength &&
      minimumLength !== 0 &&
      trimmedTextLength < minimumLength
    ) {
      isError = true;
      errMsg = minLengthErrorMsg;
    }
    setIsFieldError(isError);
    error?.(isError, errMsg);
  };

  const onEditingEnd = (e) => {
    handlingErrors(fieldText);
    onEndEditing?.(e);
  };

  const getTextInputWrapperStyle = () => {
    let style = [];
    if (textInputType === "box" || textInputType === "box_static") {
      if (isFieldError && !isDisabled) {
        style = [styles.wrapperBox, styles.wrapperBoxError, wrapperStyle];
      } else if (isDisabled) {
        style = [styles.wrapperBox, wrapperStyle];
      } else {
        style = [styles.wrapperBox, wrapperStyle];
      }
    } else {
      style = [styles.wrapper, wrapperStyle];
      if (isDisabled) {
        style = [styles.wrapper];
      }
    }
    return style;
  };

  const isToShowLabel = () => {
    if (
      (textInputType === "label" ||
        textInputType === "static" ||
        textInputType === "box" ||
        textInputType === "box_static") &&
      labelText &&
      labelText !== ""
    ) {
      return true;
    }
    return false;
  };

  const getLabelStyle = () => {
    let style = [styles.label, labelStyle];
    if (textInputType === "box" || textInputType === "box_static") {
      style = [styles.label, styles.boxInputLabel, labelStyle];
    }
    if (isDisabled) {
      style.push(styles.disabledLabel);
    }
    return style;
  };

  const getDividerStyle = () => {
    let style = [styles.dividerNonError, dividerStyle];
    if (isFieldError && !isDisabled) {
      style = [dividerStyle, styles.dividerError];
    } else if (isDisabled) {
      style = [styles.disabledDivider];
    }
    return style;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {isToShowLabel() ? (
        <Text style={getLabelStyle()}>{labelText}</Text>
      ) : null}
      <View style={getTextInputWrapperStyle()}>
        <TextInput
          editable={
            textInputType !== "static" &&
            textInputType !== "box_static" &&
            !isDisabled
          }
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
          placeholderTextColor={styles.placeholderTextColor.color}
          autoCorrect={false}
          {...textInputProps}
          onEndEditing={onEditingEnd}
          onChangeText={(text) => {
            handlingErrors(text);
            setFieldText(text);
            onChangeText?.(text);
          }}
          style={
            isDisabled
              ? [
                  styles.textInput,
                  textInputProps?.style,
                  styles.disabledTextInput,
                ]
              : [styles.textInput, textInputProps?.style]
          }
          ref={inputRef}
        />
        {rightAccessory && rightAccessory !== "" ? (
          <TouchableOpacity
            onPress={() => onPressRightAccessory?.()}
            disabled={!onPressRightAccessory || isDisabled}
          >
            <LCGIcon
              name={rightAccessory}
              size={rightAccessorySize || 24}
              iconStyle={
                isDisabled
                  ? styles.disabledRightAccessory
                  : [styles.rightAccessory, rightAccessoryStyle]
              }
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {isDividerVisible &&
      textInputType !== "box" &&
      textInputType !== "box_static" ? (
        <LCGDivider style={getDividerStyle()} />
      ) : null}
    </View>
  );
};

export default LCGTextInput;
