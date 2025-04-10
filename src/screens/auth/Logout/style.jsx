import {StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    marginBottom: 70,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    elevation: 5,
  },
  startText: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#fff',
  },
});
