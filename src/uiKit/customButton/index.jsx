import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../utils/colors';
import {styles} from './style';

export const CustomButton = ({
  title,
  onPress,
  loading,
  disabled,
  customContainerStyle,
  customTextStyle,
  variant = 'primary',
}) => {
  const canClick = loading || disabled;

  let dynamicStyle = {
    backgroundColor: '',
    titleColor: '',
  };

  switch (variant) {
    case 'primary':
      dynamicStyle.backgroundColor = COLORS.PRIMARY;
      dynamicStyle.titleColor = COLORS.WHITE;
      break;
    case 'secondary':
      dynamicStyle.backgroundColor = COLORS.DISABLE;
      dynamicStyle.titleColor = COLORS.WHITE;
      break;
    case 'tertiary':
      dynamicStyle.backgroundColor = COLORS.WHITE;
      dynamicStyle.titleColor = COLORS.BLACK;
      break;
    default:
      dynamicStyle.backgroundColor = COLORS.PRIMARY;
      dynamicStyle.titleColor = COLORS.WHITE;
  }

  return (
    <TouchableOpacity
      style={[
        styles.customButton,
        {
          opacity: canClick ? 0.5 : 1,
          backgroundColor: dynamicStyle.backgroundColor,
        },
        customContainerStyle,
      ]}
      onPress={canClick ? null : onPress}
      disabled={canClick}>
      <Text
        style={[
          styles.text,
          {
            color: dynamicStyle.titleColor,
          },
          customTextStyle,
        ]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};
