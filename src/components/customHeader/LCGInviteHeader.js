/* eslint-disable react/self-closing-comp */
/* eslint-disable no-use-before-define */
// @flow
import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import {styles} from './LCGCustomHeaderStyles';
import {LCGDivider} from '../divider';
import {LCGIcon} from '../icon';
import config from '../../config';

type CVDHeaderAccessoriesTypes = {
  name?: string,
  style?: Object,
  onPress?: () => void,
  isToShow?: boolean,
};

type LCGInviteHeaderProps = {
  route?: Object,
  title?: string,
  titleLeftAccessory?: Function,
  rightAccessory?: Function,
  titleStyle?: Object,
  isToShowTitle?: boolean,
  isToShowLeftAccessory?: boolean,
  leftAccessoryName?: string,
  leftAccessoryStyle?: Object,
  onPressLeftAccessory?: () => void,
  onPressRightAccessory?: () => void,
};

const LCGInviteHeader = (props: LCGInviteHeaderProps) => {
  const {
    route,
    title = '',
    leftAccessoryStyle,
    titleStyle,
    isToShowTitle = true,
    isToShowLeftAccessory = true,
    leftAccessoryName = config.iconNames.LEFT_CHEVRON,
    onPressLeftAccessory,
    onPressRightAccessory,
  } = props;

  const accessoriesData: CVDHeaderAccessoriesTypes[] = [
    {
      name: leftAccessoryName || config.iconsNames.CHEVRON_THIN_LEFT,
      style: [styles.leftAccessory, leftAccessoryStyle],
      onPress: () => {
        if (isToShowLeftAccessory && onPressLeftAccessory) {
          onPressLeftAccessory();
        }
      },
      isToShow: isToShowLeftAccessory,
    },
  ];

  const getTitle = () => {
    if (isToShowTitle) {
      if (title && title !== '') {
        return title;
      }
      if (route?.name && route.name !== '') {
        return route.name;
      }
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.layoout}>
      <View style={localStyle.head}>
        <View
          style={{
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={onPressLeftAccessory}
          >
            <Image source={require('../../assets/images/myBackArrow.png')} />
            <Text
              style={{
                // textAlign: 'center',
                fontFamily: config.fontFamily.LATO_REGULAR_400,
                fontSize: 17,
                color: config.colors.black,
                textAlign: 'left',
                marginLeft: 12,
              }}
              numberOfLines={1}
            >
              {getTitle()}
            </Text>
          </Pressable>
        </View>
        <View style={localStyle.container}>
          <Text
            style={[styles.title, titleStyle, {textAlign: 'center'}]}
            numberOfLines={1}
          >
            {/* {getTitle()} */}
          </Text>
        </View>
        <View
          style={{
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <Pressable onPress={onPressRightAccessory}>
            <Text
              style={{
                // textAlign: 'center',
                fontFamily: config.fontFamily.LATO_REGULAR_400,
                fontSize: 17,
                color: `#8D939E`,
                textAlign: 'left',
                marginLeft: 12,
              }}
              numberOfLines={1}
            >
              send
            </Text>
          </Pressable>
        </View>
      </View>
      <LCGDivider />
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  head: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: config.colors.white,
    flexDirection: 'row',
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default LCGInviteHeader;
