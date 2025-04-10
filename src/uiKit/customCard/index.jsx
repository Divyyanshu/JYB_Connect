import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../utils/colors';

const CustomCard = ({centerName, imageSource, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.cardContainer}>
      <LinearGradient
        colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_PRIMARY]}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.card}>
        <Image source={imageSource} style={styles.imageIcon} />
        <Text style={styles.cardText}>{centerName}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomCard;
