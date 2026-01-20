// @flow
import React, {useEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

type LCGCustomHeaderAddPatientProps = {
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
};

const LCGCustomHeaderAddPatient = (props: LCGCustomHeaderAddPatientProps) => {
  const {
    route,
    title = '',
    titleLeftAccessory,
    leftAccessoryStyle,
    rightAccessory,
    titleStyle,
    isToShowTitle = true,
    isToShowLeftAccessory = true,
    leftAccessoryName = config.iconNames.LEFT_CHEVRON,
    onPressLeftAccessory,
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
    <SafeAreaView edges={['top']} style={styles.layoout}>
      <View style={styles.container}>
        {accessoriesData[0].isToShow ? (
          <Pressable onPress={accessoriesData[0].onPress}>
            <LCGIcon
              name={accessoriesData[0]?.name ?? ''}
              style={accessoriesData[0]?.style}
            />
          </Pressable>
        ) : null}
        <View style={styles.titleWrapper}>
          <View style={styles.titleLeftAccessoryContainer}>
            {titleLeftAccessory?.({
              imageStyle: styles.titleLeftImage,
              iconStyle: styles.titleLeftIcon,
            })}
          </View>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {getTitle()} 
          </Text>
        </View>
        <View style={styles.rightAccessoryContainer}>
          {rightAccessory?.({iconStyle: styles.righttAccessoryIcon})}
        </View>
      </View>
      <LCGDivider />
    </SafeAreaView>
  );
};

export default LCGCustomHeaderAddPatient;
