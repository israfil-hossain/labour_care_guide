import {Alert} from 'react-native';

const LCGAlert = (
  title: string,
  message?: string,
  buttonsArray?: Array<string>,
  callback?: Function,
) => {
  const btnArr = buttonsArray?.map((element, index) => {
    const btnData = {
      text: element,
      onPress: () => callback?.({buttonClicked: index}),
    };

    return btnData;
  });
  Alert.alert(title, message, btnArr);
};

export default LCGAlert;
