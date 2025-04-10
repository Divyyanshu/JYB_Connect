import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  customButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },
});
