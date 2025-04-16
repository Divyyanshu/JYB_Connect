import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  activityContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activityRow: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: COLORS.LIGHT_PRIMARY,
    borderRadius: 18,
    borderCurve: 'circular',
    padding: 14,
    backgroundColor: COLORS.LIGHT_PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-between',
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
