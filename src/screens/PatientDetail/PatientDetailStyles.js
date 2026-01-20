import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: config.colors.screenBackground},
  arrowRight: {
    fontSize: 28,
    alignSelf: 'center',
    color: config.colors.headerLeftIcon,
  },
  stackCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: config.colors.white,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: config.colors.divider,
    borderRadius: 6,
    marginTop: 16,
  },
});
