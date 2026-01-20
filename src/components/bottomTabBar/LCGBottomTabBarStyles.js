import {Platform, StyleSheet} from 'react-native';
import config from '../../config';
import {hasNotch} from '../../customHooks';

const hasNotchAndIosDevice = !!(hasNotch.hasNotch() && Platform.OS === 'ios');

export const styles = (isTabLabel, isBottomSafeSpaceColorManaged) => {
  const absolutePositionContainer = {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 0,
    backgroundColor: config.colors.white,
  };

  const layout = {
    backgroundColor: config.colors.white,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: config.colors.tabBorder,
    borderLeftColor: config.colors.tabBorder,
    borderRightColor: config.colors.tabBorder,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  };

  return StyleSheet.create({
    layout,
    container:
      !isBottomSafeSpaceColorManaged && hasNotchAndIosDevice
        ? {
            flexDirection: 'row',
            shadowOffset: {width: 0, height: 0},
            elevation: 20,
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }
        : {flexDirection: 'row', ...absolutePositionContainer, ...layout},
    tabsWrapper: {
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: 8,
      justifyContent: 'space-around',
      marginBottom: hasNotchAndIosDevice ? 0 : 8,
    },
    tabLabelText: {
      fontFamily: config.fontFamily.LATO_REGULAR_400,
      fontSize: 10,
      lineHeight: 14,
      textAlign: 'center',
      marginTop: 2,
    },
    tabbarNotifBadge: {
      height: 8,
      width: 8,
      borderRadius: 4,
      alignSelf: 'flex-end',
      marginRight: -8,
    },
    tabbarItem: {
      flex: 1,
      paddingTop: 6,
      paddingBottom: isTabLabel ? 4 : 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    circularTabItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      backgroundColor: config.colors.appTheme1,
      borderRadius: 24,
      marginTop: -20,
    },
    tabbarItemWrapper: {alignItems: 'center', justifyContent: 'center'},
  });
};
