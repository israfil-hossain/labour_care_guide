import React, {useEffect, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {styles} from './LCGCustomPickerStyles';
import config from '../../config';
import {LCGTextInput} from '../textInput';
import {LCGCustomModal} from '../customModal';

type Props = {
  textInputType?: 'static' | 'box_static',
  containerStyle?: Object,
  textInputContainerStyle?: Object,
  placeholderText?: string,
  rightAccessory?: string,
  textInputLabelText?: string,
  onOpeningModal?: Function,
  onDismissingModal?: Function,
  onSelectingItem?: Function,
  modalHeaderTitle?: string,
  listArray?: Array<{id: string, text: string}>,
  isEmptyField?: boolean,
  disabled?: boolean,
  customKeyToShowText?: string,
  valueForField?: string,
  defaultSelectedItem?: Object,
};

const LCGCustomPicker = (props) => {
  const {
    textInputType = 'static',
    modalHeaderTitle,
    listArray = [],
    containerStyle,
    textInputContainerStyle,
    placeholderText = 'Select',
    rightAccessory = config.iconNames.CHEVRON_DOWN_THIN,
    textInputLabelText = '',
    onOpeningModal,
    onDismissingModal,
    onSelectingItem,
    isEmptyField,
    disabled = false,
    customKeyToShowText,
    valueForField = '',
    defaultSelectedItem,
    wrapperStyle,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (valueForField && valueForField !== '') {
      isEmptyField?.(false);
    } else {
      isEmptyField?.(true);
    }
  }, [valueForField]);

  const openCustomModal = () => {
    setIsModalVisible(true);
    onOpeningModal?.();
  };

  const dismissCustomModal = () => {
    setIsModalVisible(false);
    onDismissingModal?.();
  };

  const onItemSelection = ({item, index}) => {
    onSelectingItem?.({item, index});
    dismissCustomModal();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={openCustomModal}
        disabled={Platform.OS === 'ios' || disabled}
      >
        <LCGTextInput
          isDisabled={disabled}
          wrapperStyle={wrapperStyle}
          textInputType={textInputType}
          containerStyle={[styles.textInputContainer, textInputContainerStyle]}
          rightAccessory={rightAccessory}
          rightAccessorySize={20}
          onPressRightAccessory={openCustomModal}
          labelText={textInputLabelText}
          textInputProps={{
            onTouchStart: () => {
              if (!disabled) {
                openCustomModal();
              }
            },
            value: valueForField,
            placeholder: placeholderText,
          }}
          isDividerVisible={textInputType === 'static'}
        />
      </TouchableOpacity>
      <LCGCustomModal
        isModalVisible={isModalVisible}
        onCloseModal={dismissCustomModal}
        modalHeaderTitle={modalHeaderTitle}
        defaultSelectedItem={defaultSelectedItem}
        customKeyToShowText={customKeyToShowText}
        listArray={listArray}
        listTextNumLines={1}
        onListItemPress={onItemSelection}
        modalProps={{
          onBackdropPress: () => dismissCustomModal(),
          onBackButtonPress: () => dismissCustomModal(),
          onSwipeComplete: () => dismissCustomModal(),
        }}
      />
    </View>
  );
};

export default LCGCustomPicker;
