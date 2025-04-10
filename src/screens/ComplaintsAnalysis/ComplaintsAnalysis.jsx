import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {CustomButton} from '../../uiKit/customButton';
import {styles} from './style';
import ServiceAttributeModel from '../../components/ServiceAttributeModel/ServiceAttributeModel';

const CustomerComplaintAnalysis = () => {
  const [formData, setFormData] = useState({
    received: '',
    closed: '',
    within72: '',
    occurrences: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (key, value) => {
    if (!/^\d*$/.test(value)) return;

    if (
      key !== 'received' &&
      formData.received !== '' &&
      Number(value) > Number(formData.received)
    ) {
      Alert.alert(
        'Invalid Input',
        'Value cannot be greater than Complaint Received',
      );
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    Alert.alert('OK');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Number of Complaint Received"
              keyboardType="numeric"
              value={formData.received}
              onChangeText={text => handleChange('received', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Number of Complaint Closed"
              keyboardType="numeric"
              value={formData.closed}
              onChangeText={text => handleChange('closed', text)}
            />

            <View style={styles.pendingContainer}>
              <Text style={styles.pendingHeading}>Pending Complaints</Text>
              <TextInput
                style={styles.input}
                placeholder="Complaint Received within 72hrs"
                keyboardType="numeric"
                value={formData.within72}
                onChangeText={text => handleChange('within72', text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Complaint Occurrences"
              keyboardType="numeric"
              value={formData.occurrences}
              onChangeText={text => handleChange('occurrences', text)}
            />
            <TouchableOpacity
              style={styles.actionPlanContainer}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.action_text}>Action Plan</Text>
            </TouchableOpacity>
            <ServiceAttributeModel
              visible={modalVisible}
              item={selectedItem}
              onClose={() => setModalVisible(false)}
              onSubmit={() => setModalVisible(false)}
            />
            <View style={styles.ButtonContainer}>
              <CustomButton title={'Next'} onPress={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CustomerComplaintAnalysis;
