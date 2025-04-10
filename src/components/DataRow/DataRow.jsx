import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './style';

export const DataRow = ({item, DefId, onPress}) => {
  console.log('Rendering Row:', item);

  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={styles.cell}>{item.SubParameters}</Text>
      <Text style={styles.cell}>{item.Checkpoints}</Text>
      <Text style={[styles.common_marks, styles.cell]}>{item.MaxMarks}</Text>
      <Text
        style={[
          styles.common_marks,
          styles.cell,
          item.MaxObt < item.MaxMarks && styles.lowMarks,
        ]}>
        {item.MaxObt}
      </Text>
    </TouchableOpacity>
  );
};
