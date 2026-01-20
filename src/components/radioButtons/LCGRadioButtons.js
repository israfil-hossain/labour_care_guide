import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonUtils} from '../../utils';
import {styles} from './LCGRadioButtonsStyles';

type RadioButtonObjectProps = {
  id?: string | number,
  title?: string,
};

type Props = {
  btnsArray?: Array<RadioButtonObjectProps>,
  isHorizontal?: boolean,
  overflowType?: 'wrapped' | 'scroll',
  containerStyle?: Object,
  onSelectingItem?: Function,
  selectedItemIndex?: number,
  scrollContainerStyle?: Object,
};

const LCGRadioButtons = (props) => {
  const [screenContentWidth, setScreenContentWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenContentHeight, setScreenContentHeight] = useState(
    Dimensions.get('window').height,
  );

  const {
    btnsArray = [],
    isHorizontal = true,
    overflowType = 'scroll',
    containerStyle,
    onSelectingItem,
    selectedItemIndex,
    scrollContainerStyle,
  } = props;

  const uncheckedRadio = () => {
    return (
      <View style={[styles.commonRadio, styles.uncheckedRadioOuterCircle]} />
    );
  };

  const checkedRadio = () => {
    return (
      <View style={[styles.commonRadio, styles.checkedRadioOuterCircle]}>
        <View style={styles.checkedRadioInnerCircle} />
      </View>
    );
  };

  const getRadioTextStyle = index => {
    let style = [styles.commonRadioText, styles.uncheckedRadioText];
    if (index === selectedItemIndex) {
      style = [styles.commonRadioText, styles.checkedRadioText];
    }
    return style;
  };

  const onSelectRadioBtn = (item, index) => {
    if (selectedItemIndex === null || index !== selectedItemIndex) {
      onSelectingItem?.({
        selectedItem: item,
        prevSelectedIndex: selectedItemIndex,
        newSelectedIndex: index,
      });
    }
  };

  const getRadioWithTextContainerStyle = () => {
    let style = [styles.radioBtnWithTextWrapper, styles.verticalRadios];
    if (isHorizontal) {
      style = [styles.radioBtnWithTextWrapper, styles.horizontalRadios];
    }
    return style;
  };

  const radioBtnWithText = (item, index) => {
    const {title} = item;
    return (
      <TouchableOpacity
        key={`${index.toString()}`}
        style={getRadioWithTextContainerStyle()}
        onPress={() => onSelectRadioBtn(item, index)}
      >
        {index === selectedItemIndex ? checkedRadio() : uncheckedRadio()}
        <Text style={getRadioTextStyle(index)}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    if (isHorizontal) {
      setScreenContentWidth(contentWidth);
    } else {
      setScreenContentHeight(contentHeight);
    }
  };

  const isScrollEnabled = () => {
    return isHorizontal
      ? CommonUtils.isHorizontalScrollEnabled(screenContentWidth)
      : CommonUtils.isVerticalScrollEnabled(screenContentHeight);
  };

  const radioBtnsWithScroll = () => {
    return (
      <ScrollView
        horizontal={isHorizontal}
        contentContainerStyle={[styles.scrollContainer, scrollContainerStyle]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(contentWidth, contentHeight) =>
          onContentSizeChange(contentWidth, contentHeight)
        }
        scrollEnabled={isScrollEnabled()}
        automaticallyAdjustContentInsets={false}
      >
        <View
          style={
            isHorizontal
              ? styles.horizontalRadioContainer
              : styles.verticalRadioContainer
          }
        >
          {btnsArray.map((item, index) => {
            return radioBtnWithText(item, index);
          })}
        </View>
      </ScrollView>
    );
  };

  const radioBtnsWithoutScroll = () => {
    return (
      <View style={styles.overflowWrap}>
        {btnsArray.map((item, index) => {
          return radioBtnWithText(item, index);
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!isHorizontal || (isHorizontal && overflowType === 'scroll')
        ? radioBtnsWithScroll()
        : radioBtnsWithoutScroll()}
    </View>
  );
};

export default LCGRadioButtons;
