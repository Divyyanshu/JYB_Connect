import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.SELECTED_COLOR2,
    padding: 2,
    backgroundColor: COLORS.GREY,
    borderColor: COLORS.DISABLE,
  },
  row: {
    flexDirection: 'row',
    borderRadius: 8,
  },
  cell: {
    width: '33.5%',
    alignItems: 'center',
    borderRightWidth: 1,
    paddingBottom: 5,
    borderColor: '#fff',
  },
  editCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: COLORS.LIGHT_PRIMARY,
    width: '100%',
    padding: 8,
    textAlign: 'center',
    color: COLORS.PRIMARY,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  text: {
    width: '100%',
    fontSize: 12,
    padding: 5,
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
