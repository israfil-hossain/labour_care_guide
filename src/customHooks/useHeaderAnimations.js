import {useEffect, useState} from 'react';
import {StatusBar, Animated} from 'react-native';


const useHeaderAnimations = (props) => {
  const {
    animatedValueScrollY = new Animated.Value(1),
    headerBackgroundColorExpanded = 'rgb(65, 143, 222)',
    headerBackgroundColorCollapsed = 'rgb(1000, 1000, 1000)',
    shadowColor = 'rgb(0, 0, 0)',
    isParentHeader = false,
    orientation = 'Portrait',
    middleAccessoryHeight = 0,
  } = props;

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isLandscapeMode, setIsLandscapeMode] = useState(false);

  useEffect(() => {
    setIsLandscapeMode(orientation === 'Landscape');
    StatusBar.setHidden(orientation === 'Landscape');
  }, [orientation]);

  const collapseHeaderLabelOpacity = animatedValueScrollY.interpolate({
    inputRange: [0, middleAccessoryHeight / 1.2, middleAccessoryHeight],
    outputRange: [
      headerBackgroundColorExpanded,
      headerBackgroundColorExpanded,
      headerBackgroundColorCollapsed,
    ],
  });

  const animatedBackgroundColor = animatedValueScrollY.interpolate({
    inputRange: [0, middleAccessoryHeight / 1.2, middleAccessoryHeight],
    outputRange: [
      headerBackgroundColorExpanded,
      headerBackgroundColorExpanded,
      headerBackgroundColorCollapsed,
    ],
    extrapolate: 'clamp',
  });

  const pullToSearchTranslateY = animatedValueScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -56],
    extrapolate: 'clamp',
  });

  const pullToSearchButtonOpacity = animatedValueScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const pullToSearchButtonHeight = animatedValueScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 0],
    extrapolate: 'clamp',
  });

  const animatedShadowColor =
    isParentHeader && !isLandscapeMode
      ? animatedValueScrollY.interpolate({
          inputRange: [0, middleAccessoryHeight / 1.2, middleAccessoryHeight],
          outputRange: [
            headerBackgroundColorExpanded,
            headerBackgroundColorExpanded,
            shadowColor,
          ],
          extrapolate: 'clamp',
        })
      : animatedValueScrollY.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgb(1000, 1000, 1000)', 'rgb(0, 0, 0)'],
          extrapolate: 'clamp',
        });

  const animatedElevation =
    isParentHeader && !isLandscapeMode
      ? animatedValueScrollY.interpolate({
          inputRange: [0, middleAccessoryHeight / 1.2, middleAccessoryHeight],
          outputRange: [0, 0, 8],
          extrapolate: 'clamp',
        })
      : animatedValueScrollY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 14],
          extrapolate: 'clamp',
        });

  try {
    animatedValueScrollY.addListener((progress) => {
      const animatedOffset =
        isParentHeader && !isLandscapeMode ? middleAccessoryHeight : 1;
      if (progress.value <= animatedOffset && isAnimationComplete) {
        setIsAnimationComplete(false);
      }
      if (progress.value > animatedOffset && !isAnimationComplete) {
        setIsAnimationComplete(true);
      }
    });
  } catch (e) {
    //   console.warn('error';)
  }

  return {
    collapseHeaderLabelOpacity,
    animatedBackgroundColor,
    animatedShadowColor,
    animatedElevation,
    isAnimationComplete,
    isLandscapeMode,
    pullToSearchTranslateY,
    pullToSearchButtonOpacity,
    pullToSearchButtonHeight,
  };
};

export default useHeaderAnimations;
