import {Dimensions, StyleSheet} from 'react-native';
import {COMMON_STYLES} from '../../../utils/commonStyles';
import {COLORS} from '../../../utils/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: COMMON_STYLES.SCREEN_HORIZONTAL_SPACING,
    paddingVertical: COMMON_STYLES.SCREEN_VERTICAL_SPACING,
    backgroundColor: 'white',
  },
  Subtitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: '',
    color: COLORS.BLACK,
  },
  image: {
    width: 400,
    height: 180,
  },
  inputBoxContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
  },
  inputBox: {
    fontSize: width * 0.04,
    fontFamily: COMMON_STYLES.FONT_REGULAR,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: COMMON_STYLES.FONT_REGULAR,
    backgroundColor: '#f1f1f1',
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    color: 'black',
    paddingVertical: height * 0.015,
    fontSize: width * 0.04,
  },
});
