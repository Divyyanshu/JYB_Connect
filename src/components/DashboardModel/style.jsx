import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../utils/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    minHeight: height * 0.3,
    maxHeight: height * 0.8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalHeader: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  optionCard: {
    width: '100%',
    backgroundColor: COLORS.LIGHT_PRIMARY,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginVertical: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },

  optionText: {
    color: COLORS.PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  comingSoonText: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: '600',
  },
  modelImages: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
