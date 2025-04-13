import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    width: '45%',
  },
  input: {
    width: '55%',
    color: '#000',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: 'yellow',
  },
  image: {
    width: 110,
    height: 110,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginVertical: 16,
    alignItems: 'center',
    borderRadius: 20,
  },
  placeholderStyle: {
    flex: 1,
    color: '#000',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#bbb',
    borderRadius: 10,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  centeredButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
