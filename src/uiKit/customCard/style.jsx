import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../utils/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardContainer: {
    width: '85%',
    marginVertical: height * 0.05,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageIcon: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
});
