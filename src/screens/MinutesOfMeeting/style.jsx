import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 6,
  },
  tableContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
    backgroundColor: COLORS.WHITE,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT_PRIMARY,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.PRIMARY,
    borderColor: '#000',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
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
