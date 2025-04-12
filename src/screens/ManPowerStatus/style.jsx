import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F1EFEC',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: '33.5%',
    alignItems: 'center',
    marginBottom: 10,
    borderRightWidth: 1,
    borderColor: '#fff',
  },
  editCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    width: '100%',
    padding: 5,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    width: '100%',
    fontSize: 12,
    padding: 5,
    borderRightWidth: 1,
    borderColor: 'grey',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 22,
    color: COLORS.PRIMARY,
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 50,
  },
  input_MTD_Actual: {
    padding: 5,
    fontSize: 12,
  },
});
