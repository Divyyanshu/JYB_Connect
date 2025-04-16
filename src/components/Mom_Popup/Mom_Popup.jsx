import React, {useState, useEffect} from 'react';
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

const CustomFormModal = ({visible, onClose}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    parameter: '',
    remarks: '',
    counterMeasure: '',
    targetDate: '',
    responsibility: '',
  });
  const [fetchedData, setFetchedData] = useState([]);

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
      onClose();
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
          <Text style={styles.title}>Enter MOM Data</Text>
          <ScrollView>
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
                minimumDate={new Date()}
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
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

            {/* Display Fetched Data */}
            <View>
              {fetchedData.map((item, index) => (
                <View key={index} style={styles.dataItem}>
                  <Text>{item.parameter}</Text>
                  <Text>{item.remarks}</Text>
                  <Text>{item.counterMeasure}</Text>
                  <Text>{item.targetDate}</Text>
                  <Text>{item.responsibility}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomFormModal;
