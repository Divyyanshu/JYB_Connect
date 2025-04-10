// import {StyleSheet} from 'react-native';
// import {COLORS} from '../../utils/colors';

// export const styles = StyleSheet.create({
//   card: {
//     width: '90%',
//     padding: 20,
//     height: 200,
//     backgroundColor: COLORS.PRIMARY,
//     borderRadius: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//     gap: 10,
//   },
//   imageIcon: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   cardText: {
//     fontSize: 28,
//     letterSpacing: 1.2,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });
// import {StyleSheet, Dimensions} from 'react-native';
// import {COLORS} from '../../utils/colors';

// const {width, height} = Dimensions.get('window');

// export const styles = StyleSheet.create({
//   card: {
//     width: '90%',
//     padding: width * 0.05,
//     height: height * 0.2,
//     backgroundColor: COLORS.PRIMARY,
//     borderRadius: 10,
//     borderCurve: 'continuous',
//     // elevation: 5,
//     // shadowColor: '#000',
//     // shadowOffset: {width: 0, height: 2},
//     // shadowOpacity: 0.2,
//     // shadowRadius: 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: height * 0.02,
//     gap: height * 0.01,
//   },
//   imageIcon: {
//     width: width * 0.15,
//     height: width * 0.15,
//     alignSelf: 'center',
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: width * 0.07,
//     // letterSpacing: 1.2,
//     fontWeight: 'bold',
//     color: '#fff',
//     alignSelf: 'center',
//   },
// });
import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../utils/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardContainer: {
    width: '85%',
    marginVertical: height * 0.02,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: height * 0.2,
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
