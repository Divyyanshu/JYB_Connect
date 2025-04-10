import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 6,
  },
  tableContainer: {
    marginHorizontal: 40,
    backgroundColor: COLORS.WHITE,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.WHITE,
    borderColor: '#000',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#000',
    padding: 5,
  },
  input: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#000',
    padding: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
  },
});
