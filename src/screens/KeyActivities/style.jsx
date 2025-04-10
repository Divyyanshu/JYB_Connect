import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  activityContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
  },
  activityRow: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: COLORS.LIGHT_PRIMARY,
    borderRadius: 8,
    borderCurve: 'continuous',
    padding: 12,
    backgroundColor: COLORS.LIGHT_PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.PRIMARY,
  },
  tickIcon: {
    height: 24,
    width: 24,
  },
  submitButton: {
    margin: 20,
    paddingBottom: 20,
  },
});
