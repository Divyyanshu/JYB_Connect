import {StyleSheet} from 'react-native';
import {COMMON_STYLES} from '../../../utils/commonStyles';
import {COLORS} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  ButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'left',
  },
});
