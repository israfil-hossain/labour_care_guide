import React, {useCallback, useRef} from 'react';
import {
  Platform,
  TextInput,
  findNodeHandle,
  UIManager,
  ScrollViewProps,
} from 'react-native';
import {LCGAnimatedScrollWrapper} from '../animatedScrollWrapper';
import {hasNotch, useKeyboard} from '../../customHooks';

type Props = {
  contentInset?: number,
  children?: React.Node,
  scrollViewProps?: Object,
  navigation?: Object,
  customContentContainerStyle?: Object,
};

const LCGKeyboardAvoidingAnimatedScroll = (props) => {
  const {
    children,
    contentInset = 0,
    navigation,
    scrollViewProps = {},
    customContentContainerStyle = null,
  } = props;

  const scrollRef = React.createRef();
  const lastInputRef = useRef();

  let keyboardVerticalOffset = 40;
  if (Platform.OS === 'ios') {
    if (hasNotch.hasNotch()) {
      keyboardVerticalOffset += 90;
    } else {
      keyboardVerticalOffset += 62;
    }
  }

  const keyboardDidShow = useCallback(() => {
    if (Platform.OS !== 'ios') {
      return;
    }
    const scrollResponder = scrollRef?.current?.getScrollResponder();
    const currentlyFocusedField = TextInput.State.currentlyFocusedInput
      ? findNodeHandle(TextInput.State.currentlyFocusedInput())
      : TextInput.State.currentlyFocusedField();
    if (!currentlyFocusedField) {
      return;
    }
    try {
      UIManager.viewIsDescendantOf(
        currentlyFocusedField,
        scrollResponder.getInnerViewNode(),
        (isAncestor) => {
          if (isAncestor) {
            lastInputRef.current = currentlyFocusedField;
            scrollResponder?.scrollResponderScrollNativeHandleToKeyboard(
              currentlyFocusedField,
              keyboardVerticalOffset,
              true,
            );
          }
        },
      );
    } catch (e) {
      // console.warn('error');
    }
  }, []);

  const keyboardDidHide = useCallback(() => {
    if (Platform.OS !== 'ios') {
      return;
    }
    const scrollResponder = scrollRef?.current?.getScrollResponder();
    if (lastInputRef.current) {
      scrollResponder?.scrollResponderScrollNativeHandleToKeyboard(
        lastInputRef.current,
        250,
        true,
      );
      lastInputRef.current = null;
    }
  }, []);

  useKeyboard.useKeyboard({didShow: keyboardDidShow, didHide: keyboardDidHide});

  return (
    <LCGAnimatedScrollWrapper
      navigation={navigation}
      customContentContainerStyle={customContentContainerStyle}
      scrollViewProps={{
        contentInset: {bottom: contentInset},
        keyboardDismissMode: 'on-drag',
        ref: scrollRef,
        scrollToOverflowEnabled: true,
        ...scrollViewProps,
      }}
    >
      {children}
    </LCGAnimatedScrollWrapper>
  );
};

export default LCGKeyboardAvoidingAnimatedScroll;
