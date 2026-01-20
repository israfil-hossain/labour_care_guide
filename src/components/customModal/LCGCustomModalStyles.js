import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  layoutContainer: {
    backgroundColor: config.colors.white,
    height: '50%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {marginBottom: 12},
  headerTitle: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
    lineHeight: 24,
    color: config.colors.appTheme1,
    flex: 1,
    textAlign: 'center',
  },
  scroll: {flex: 1},
  listWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    flex: 1,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 16,
    lineHeight: 24,
    color: config.colors.neutralBlack,
    shadowOffset: {width: 0, height: 3},
    elevation: 20,
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  crossIconWrapper: {padding: 8},
  crossIcon: {color: config.colors.appTheme1},
  selectionIcon: {color: config.colors.appTheme1},
});
