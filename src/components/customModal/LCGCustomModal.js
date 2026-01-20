/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './LCGCustomModalStyles';
import {LCGDivider} from '../divider';
import config from '../../config';
import {LCGIcon} from '../icon';


type Props = {
  modalHeaderTitle?: string,
  modalHeaderTitleStyle?: Object,
  children?: React.Node,
  isModalVisible?: boolean,
  modalProps?: Object,
  listTextNumLines?: number,
  listArray?: Array<Object>,
  onListItemPress?: Function,
  onCloseModal?: Function,
  customKeyToShowText?: string,
  defaultSelectedItem?: Object,
  selectionIconName?: string,
  containerStyle?: Object,
  modalStyle?: Object,
};

const LCGCustomModal = (props) => {
  const {
    modalHeaderTitleStyle,
    containerStyle,
    modalStyle,
    modalHeaderTitle = 'Title',
    children,
    isModalVisible = false,
    modalProps,
    listArray = [],
    onListItemPress,
    listTextNumLines = 1,
    onCloseModal,
    customKeyToShowText,
    defaultSelectedItem,
    selectionIconName = config.iconNames.CHECKMARK_STYLISH_LIGHT,
  } = props;

  const [selectedItem, setSelectedItem] = React.useState(defaultSelectedItem);

  React.useEffect(() => {
    setSelectedItem(defaultSelectedItem);
  }, [defaultSelectedItem]);

  const onPressListItem = ({item, index}) => {
    onListItemPress?.({item, index});
  };

  const isSelected = item => {
    if (selectedItem && selectedItem.id === item.id) {
      return true;
    }
    return false;
  };

  const showText = item => {
    if (
      customKeyToShowText &&
      customKeyToShowText !== '' &&
      item?.[customKeyToShowText]
    ) {
      return item[customKeyToShowText];
    }
    return item?.text ?? '';
  };

  return (
    <Modal
      testID="modal"
      {...modalProps}
      isVisible={isModalVisible}
      style={[styles.modalView, modalStyle]}
    >
      <SafeAreaView style={[styles.layoutContainer, containerStyle]}>
        <View style={styles.headerWrapper}>
          <Text style={[styles.headerTitle, modalHeaderTitleStyle]}>
            {modalHeaderTitle}
          </Text>
          <TouchableOpacity
            style={styles.crossIconWrapper}
            onPress={() => onCloseModal?.()}
          >
            <LCGIcon
              name={config.iconNames.CROSS_LIGHT}
              iconStyle={styles.crossIcon}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <LCGDivider style={styles.divider} />
        {children || (
          <ScrollView style={styles.scroll}>
            {listArray?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`${index.toString()}`}
                  style={styles.listWrapper}
                  disabled={!onListItemPress}
                  onPress={() => onPressListItem({item, index})}
                >
                  <Text
                    style={styles.listText}
                    numberOfLines={listTextNumLines}
                  >
                    {showText(item)}
                  </Text>
                  {isSelected(item) ? (
                    <LCGIcon
                      name={selectionIconName}
                      iconStyle={styles.selectionIcon}
                      size={18}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default LCGCustomModal;
