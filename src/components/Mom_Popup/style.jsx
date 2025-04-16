import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.PRIMARY,
    width: '90%',
    height: '90%',
    borderRadius: 18,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 18,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.8,
    borderColor: COLORS.PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginTop: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonSubmitText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  buttonCloseText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});
