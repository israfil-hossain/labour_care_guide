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
      marginBottom: hasNotchAndIosDevice ? 0 : 12,
    },
    tabLabelText: {
      fontFamily: config.fontFamily.LATO_REGULAR_400,
      fontSize: 11,
      lineHeight: 16,
      textAlign: 'center',
      marginTop: 4,
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
      paddingTop: 12,
      paddingBottom: isTabLabel ? 8 : 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    circularTabItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 56,
      height: 56,
      backgroundColor: config.colors.appTheme1,
      borderRadius: 28,
      marginTop: -24,
    },
    tabbarItemWrapper: {alignItems: 'center', justifyContent: 'center'},
  });
};
