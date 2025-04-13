import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: COLORS.PRIMARY,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 30,
    margin: 40,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
