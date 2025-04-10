import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY,
    padding: 16,
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
