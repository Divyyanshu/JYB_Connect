import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 0,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  input: {
    marginVertical: 6,
    backgroundColor: 'white',
  },
  percent: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
