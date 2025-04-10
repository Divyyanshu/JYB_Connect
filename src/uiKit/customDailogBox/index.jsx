import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import CustomCard from './CustomCard';
const CustomDialog = ({visible, onClose, card1, card2}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* Cards */}
          <CustomCard {...card1} />
          <CustomCard {...card2} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomDialog;
