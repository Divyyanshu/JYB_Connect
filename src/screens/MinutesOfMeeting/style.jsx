import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  tableContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
    backgroundColor: COLORS.WHITE,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT_PRIMARY,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.PRIMARY,
    borderColor: '#000',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderColor: '#000',
    padding: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
  },
  addButton: {
    position: 'absolute',
    top: 65,
    right: 20,
    backgroundColor: '#A6192E',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#A6192E',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
