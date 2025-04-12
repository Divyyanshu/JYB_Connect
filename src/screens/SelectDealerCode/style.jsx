import {Dimensions, StyleSheet} from 'react-native';
import {COMMON_STYLES} from '../../utils/commonStyles';
import {COLORS} from '../../utils/colors';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: COMMON_STYLES.SCREEN_HORIZONTAL_SPACING,
 //   paddingVertical: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  segmentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    minHeight: 30,
    borderRadius: 10,
    marginHorizontal: 6,
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.1,
    borderColor: 'white',
    alignSelf: 'center',
  },
  segmentText: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeSegment: {
    backgroundColor: COLORS.PRIMARY,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  card: {
    backgroundColor: COLORS.GREY,
    padding: 18,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.1,
    marginHorizontal: COMMON_STYLES.SCREEN_HORIZONTAL_SPACING,
    // shadowColor: '#000',
    // shadowOffset: {width: -1, height: 2},
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  dealerDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  status: {
    fontSize: 12,
    color: COLORS.DISABLE,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
