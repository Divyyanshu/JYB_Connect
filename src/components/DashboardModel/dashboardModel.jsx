import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import {STACKS} from '../../utils/stacks';
import {COLORS} from '../../utils/colors';
import CustomAlert from '../../uiKit/customAlert/customAlert';

const CustomModal = ({visible, onClose, modalType}) => {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({title: '', message: ''});
  const go_to_selectDealerCode = () => {
    onClose();
    navigation.navigate(STACKS.MAIN_STACK, {
      screen: SCREENS.MAIN_STACK.SELECT_DEALER_CODE,
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {modalType === 'sales' ? (
              <CustomAlert />
            ) : (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Service</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Dealer Visit Report */}
                <View style={{backgroundColor: COLORS.WHITE, padding: 20}}>
                  <TouchableOpacity
                    style={styles.optionCard}
                    onPress={go_to_selectDealerCode}>
                    <Image
                      source={require('../../assets/icons/dvr.png')}
                      style={styles.modelImages}
                    />
                    <Text style={styles.optionText}>Dealer Visit Report</Text>
                  </TouchableOpacity>
                </View>
                <CustomAlert
                  visible={alertVisible}
                  onClose={() => setAlertVisible(false)}
                  title={alertData.title}
                  message={alertData.message}
                />
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
