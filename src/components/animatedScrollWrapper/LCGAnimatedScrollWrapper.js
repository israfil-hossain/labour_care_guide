import React, {useRef, useEffect} from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
} from 'react-native';
import useHeaderAnimations from '../../customHooks/useHeaderAnimations';

type ScrollEvent = {
  nativeEvent: {contentOffset: {y: number}},
};

type CVDScrollViewProps = {
  contentContainerStyle?: Object,
  bounces?: boolean,
  alwaysBounceVertical?: boolean,
  refreshControl?: Object,
  showsVerticalScrollIndicator?: boolean,
  ref?: Object,
};

type Props = {
  children?: React.Node,
  navigation?: Object,
  onScrollCallback?: Function,
  scrollViewProps?: Object,
  customContentContainerStyle?: Object,
  isParentHeader?: boolean,
  middleAccessoryHeight?: number,
};

const LCGAnimatedScrollWrapper = (props) => {
  const {
    children,
    navigation,
    onScrollCallback = null,
    scrollViewProps = {},
    customContentContainerStyle = null,
    isParentHeader = false,
    middleAccessoryHeight = 0,
  } = props;

  const scrollViewRef = useRef({scrollTo: (params) => params});

  const animatedValueScrollY = useRef(
    new Animated.Value(Platform.OS === 'ios' ? 1 : 0),
  ).current;
  const orientation = 'Portrait';

  const {isLandscapeMode} = useHeaderAnimations({
    animatedValueScrollY,
    isParentHeader,
    orientation,
    middleAccessoryHeight,
  });

  const scrollToOffset = (offset) => {
    scrollViewRef.current.scrollTo({y: offset, animated: true});
  };

  const handleScrollEnd = (event) => {
    const verticalOffset = event.nativeEvent.contentOffset.y;
    if (
      verticalOffset > 1 &&
      verticalOffset <= middleAccessoryHeight &&
      !isLandscapeMode &&
      isParentHeader
    ) {
      if (verticalOffset < middleAccessoryHeight / 2) {
        return scrollToOffset(1);
      }
      if (
        verticalOffset < middleAccessoryHeight &&
        verticalOffset >= middleAccessoryHeight
      ) {
        return scrollToOffset(middleAccessoryHeight + 1);
      }
      if (verticalOffset >= middleAccessoryHeight / 2) {
        return scrollToOffset(middleAccessoryHeight + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    if (navigation?.setOptions) {
      navigation.setOptions({animatedValueScrollY});
    }
  }, []);

  const handleScroll = (event) => {
    if (onScrollCallback) {
      onScrollCallback(event);
    }
  };

  let contentContainerStyle = {};

  if (scrollViewProps && scrollViewProps.contentContainerStyle) {
    contentContainerStyle = {
      ...contentContainerStyle,
      ...scrollViewProps.contentContainerStyle,
    };
  }

  return (
    <Animated.ScrollView
      testID="test-id-hh-animated-scroll-wrapper"
      ref={scrollViewRef}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollToOverflowEnabled
      overScrollMode="always"
      alwaysBounceVertical={false}
      onScrollEndDrag={(event) => handleScrollEnd(event)}
      onMomentumScrollEnd={(event) => handleScrollEnd(event)}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {y: animatedValueScrollY},
            },
          },
        ],
        {listener: event => handleScroll(event), useNativeDriver: false},
      )}
      scrollEventThrottle={16}
      {...scrollViewProps}
      stickyHeaderIndices={undefined}
      contentContainerStyle={[
        contentContainerStyle,
        customContentContainerStyle,
      ]}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default LCGAnimatedScrollWrapper;
