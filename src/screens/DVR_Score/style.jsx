import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tableContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: COLORS.WHITE,
    paddingVertical: 10,
    color: COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.WHITE,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  cellHeader: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.WHITE,
    fontWeight: 'bold',
    marginHorizontal: 14,
  },
  cellTotalHeader: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 18,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    color: COLORS.BLACK,
    backgroundColor: 'white',
  },
  totalRow: {
    flexDirection: 'row',
    textAlign: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
  },
  totalText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 14,
    color: COLORS.WHITE,
  },
});
