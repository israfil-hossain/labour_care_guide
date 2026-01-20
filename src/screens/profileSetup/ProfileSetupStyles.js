import {StyleSheet} from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: config.colors.white},
  keyboardScroll: {paddingBottom: 24},
  headingContainer: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    marginRight: 25,
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    textAlign: 'right',
    marginRight: 20,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 18,
    lineHeight: 21.6,
    color: config.colors.neutralBlack,
  },
  contentWrapper: {paddingHorizontal: 25, marginTop: 25},
  inputContainer: {marginBottom: 18},
  submitBtnContainer: {marginTop: 24},
  avatarContentWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  addPhotoBtnContainer: {marginLeft: 22, alignSelf: 'center'},
});
