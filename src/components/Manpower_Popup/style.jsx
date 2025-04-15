import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

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
    borderRadius: 12,
    elevation: 4,
    backgroundColor: COLORS.PRIMARY,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'grey',
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
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
