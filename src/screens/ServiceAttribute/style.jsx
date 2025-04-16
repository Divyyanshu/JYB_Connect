import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  serviceAttributeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    backgroundColor: COLORS.LIGHT_PRIMARY,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.PRIMARY,
    fontWeight: 500,
  },
});
