import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const useKeyboard = (KeyboardEventCallback) => {
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowEventName =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const keyboardHideEventName =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(
      keyboardShowEventName,
      (event) => {
        KeyboardEventCallback?.didShow?.(event);
        setIsKeyboardUp(true);
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const hideListener = Keyboard.addListener(
      keyboardHideEventName,
      (event) => {
        KeyboardEventCallback?.didHide?.(event);
        setIsKeyboardUp(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { isKeyboardUp, keyboardHeight };
};

export default useKeyboard;
