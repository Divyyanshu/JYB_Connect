import {Text, View} from 'react-native';
import {styles} from './style';
export const HeaderRow = () => (
  <View style={styles.headerRow}>
    <Text style={styles.headerCell}>Sub Parameter</Text>
    <Text style={styles.headerCell}>Checkpoint</Text>
    <Text style={styles.headerCell}>Max Marks</Text>
    <Text style={styles.headerCell}>Marks Obt.</Text>
  </View>
);
