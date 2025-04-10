import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  common_marks: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 0.5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
  },
  lowMarks: {
    color: 'red',
    fontWeight: 'bold',
  },
});
