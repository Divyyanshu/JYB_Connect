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
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  nativeInput: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
  },
  submitBtn: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 10,
  },
});
