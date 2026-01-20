// @flow
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './LCGBottomTabBarStyles';
import config from '../../config';

type Props = {
  state?: Object,
  descriptors?: Object,
  navigation?: Object,
  onTabPress?: Function,
  onTabLongPress?: Function,
  isTabLabel?: boolean,
  isBottomSafeSpaceColorManaged?: boolean,
};

const LCGBottomTabBar = ({
  state,
  descriptors,
  navigation,
  onTabPress,
  onTabLongPress,
  isTabLabel,
  isBottomSafeSpaceColorManaged = false,
}: Props) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const newStyles = styles(isTabLabel, isBottomSafeSpaceColorManaged);

  const getDataForRenderingTabs = (route, index) => {
    const descriptorOptions = descriptors?.[route.key]?.options ?? {};
    const {tabBarLabel, tabBarIcon, title} = descriptorOptions;
    // Detect special round tab by route name instead of custom option
    const isSpecialRoundTab = route.name === 'addPatient';

    if (typeof tabBarIcon !== 'function') {
      // console.error('tabbar icon prop must be a function')
    }

    let tabLabelText = route.name;
    if (tabBarLabel && tabBarLabel !== '') {
      tabLabelText = tabBarLabel;
    } else if (title && title !== '') {
      tabLabelText = title;
    }
   
    const defaultName = route.name || route.routeName;
    const isFocused = state.index === index;

    const onPress = () => {
      if (onTabPress) {
        onTabPress(route, index);
      }
      if (!isFocused && navigation?.navigate) {
        navigation.navigate(defaultName);
      }
    };

    const onLongPress = () => {
      if (onTabLongPress) {
        onTabLongPress(route, index);
      }
    };

    const labelTextColor = isFocused
      ? config.colors.appTheme1
      : config.colors.tabInactive;
    const tabIconTintColor = isFocused
      ? config.colors.appTheme1
      : config.colors.tabInactive;
    const labelTextStyle = {...newStyles.tabLabelText, color: labelTextColor};

    return {
      tabLabelText,
      onPress,
      onLongPress,
      tabIconTintColor,
      labelTextStyle,
      tabBarIcon,
      isSpecialRoundTab,
    };
  };

  const renderCircularTab = (route, index) => {
    const {onPress, onLongPress, tabIconTintColor, tabBarIcon} =
      getDataForRenderingTabs(route, index);
    return (
      <Pressable
        key={`${index.toString()}`}
        onPress={onPress}
        onLongPress={onLongPress}
        style={newStyles.circularTabItem}
      >
        <View style={newStyles.tabbarItemWrapper}>
          {typeof tabBarIcon === 'function'
            ? tabBarIcon({tintColor: tabIconTintColor})
            : null}
        </View>
      </Pressable>
    );
  };

  const renderTab = (route, index) => {
    const {
      tabLabelText,
      onPress,
      onLongPress,
      tabIconTintColor,
      labelTextStyle,
      tabBarIcon,
      isSpecialRoundTab,
    } = getDataForRenderingTabs(route, index);
    return !isSpecialRoundTab ? (
      <Pressable
        key={`${index.toString()}`}
        onPress={onPress}
        onLongPress={onLongPress}
        style={newStyles.tabbarItem}
      >
        <View style={newStyles.tabbarItemWrapper}>
          {typeof tabBarIcon === 'function'
            ? tabBarIcon({tintColor: tabIconTintColor})
            : null}
          {isTabLabel ? (
            <Text style={labelTextStyle}>{tabLabelText}</Text>
          ) : null}
        </View>
      </Pressable>
    ) : (
      renderCircularTab(route, index)
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={newStyles.layout}>
      <View style={newStyles.container}>
        <View style={newStyles.tabsWrapper}>
          {state?.routes.map((route, index) => {
            return renderTab(route, index);
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LCGBottomTabBar;
