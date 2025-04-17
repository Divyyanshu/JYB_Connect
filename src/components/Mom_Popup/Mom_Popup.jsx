import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {styles} from './style';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {insertDataMomManuallyTable} from '../../database/db';

const CustomFormModal = ({visible, onClose, onSubmit}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    parameter: '',
    remarks: '',
    counterMeasure: '',
    targetDate: '',
    responsibility: '',
  });
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await insertDataMomManuallyTable(formData);
      console.log('formdata insert mom manually! >>>', formData);
      onSubmit();
    } catch (error) {
      Alert.alert('Error', 'Failed to insert data');
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      supportedOrientations={['landscape']}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Minutes of Meeting</Text>
          <ScrollView>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderBottomRightRadius: 18,
                borderBottomLeftRadius: 18,
              }}>
              <Text style={styles.label}>Parameter</Text>
              <TextInput
                style={styles.input}
                value={formData.parameter}
                onChangeText={text => handleChange('parameter', text)}
                placeholder="Enter Parameter"
              />
              <Text style={styles.label}>CL-PL Remarks</Text>
              <TextInput
                style={styles.input}
                value={formData.remarks}
                onChangeText={text => handleChange('remarks', text)}
                placeholder="Enter Remarks"
              />
              <Text style={styles.label}>Counter Measure Plan</Text>
              <TextInput
                style={styles.input}
                value={formData.counterMeasure}
                onChangeText={text => handleChange('counterMeasure', text)}
                placeholder="Enter Counter Measure"
              />
              <Text style={styles.label}>Target Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.input, {justifyContent: 'center'}]}>
                <Text style={{color: formData.targetDate ? '#000' : '#999'}}>
                  {formData.targetDate ? formData.targetDate : 'Select a date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    formData.targetDate
                      ? new Date(formData.targetDate)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  minimumDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formattedDate = selectedDate
                        .toISOString()
                        .split('T')[0];
                      handleChange('targetDate', formattedDate);
                    }
                  }}
                />
              )}
              <Text style={styles.label}>Responsibility</Text>
              <TextInput
                style={styles.input}
                value={formData.responsibility}
                onChangeText={text => handleChange('responsibility', text)}
                placeholder="Enter Responsibility"
              />
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonSubmitText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.buttonCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomFormModal;
