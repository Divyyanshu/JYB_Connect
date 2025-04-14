import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../../components/CommonComponents/TopBar';
import {COLORS} from '../../utils/colors';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';

const CustomerComplaintAnalysis = ({navigation}) => {
  const [formData, setFormData] = useState({
    received: '',
    closed: '',
    within72: '',
    occurrence: '',
    gapArea: '',
    counterMeasure: '',
    responsibility: '',
    planClosureDate: '',
  });
  const [mtdServiceVisit, setMtdServiceVisit] = useState(null);
  useEffect(() => {
    const fetchServiceVisit = async () => {
      try {
        const value = await AsyncStorage.getItem('MTD_SERVICE_VISIT');
        if (value) setMtdServiceVisit(Number(value));
      } catch (error) {
        console.log('Error fetching service visit:', error);
      }
    };
    fetchServiceVisit();
  }, []);

  const handleChange = (key, value) => {
    const numericFields = ['received', 'closed', 'within72'];
    if (numericFields.includes(key) && !/^\d*$/.test(value)) return;
    if (
      key !== 'received' &&
      formData.received !== '' &&
      Number(value) > Number(formData.received)
    ) {
      Alert.alert(
        'Invalid Input',
        'Value cannot be greater than Complaints Received',
      );
      return;
    }

    const updatedForm = {
      ...formData,
      [key]: value,
    };
    if (
      key === 'within72' &&
      formData.received &&
      mtdServiceVisit &&
      Number(formData.received) > 0
    ) {
      const occurrence = (
        (Number(formData.received) / mtdServiceVisit) *
        100
      ).toFixed(2);
      updatedForm.occurrence = occurrence;
    }

    setFormData(updatedForm);
  };

  const handleSubmit = () => {
    Alert.alert('Submitted', JSON.stringify(formData, null, 2));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Topbar
          showBack={true}
          showtitle={true}
          title={'Complaints Analysis'}
          navState={navigation}
        />
        <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 60}}>
          <TextInput
            label="No. of Complaints Received"
            value={formData.received}
            onChangeText={text => handleChange('received', text)}
            mode="outlined"
            keyboardType="numeric"
            outlineColor="#999"
            activeOutlineColor={COLORS.PRIMARY}
            style={{marginBottom: 12, backgroundColor: 'white'}}
          />
          {formData.received !== '' && (
            <TextInput
              label="No. of Complaints Closed"
              value={formData.closed}
              onChangeText={text => handleChange('closed', text)}
              mode="outlined"
              keyboardType="numeric"
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
              style={{marginBottom: 12, backgroundColor: 'white'}}
            />
          )}
          {formData.closed !== '' && (
            <TextInput
              label="No. Closed in 72 Hours"
              value={formData.within72}
              onChangeText={text => handleChange('within72', text)}
              mode="outlined"
              keyboardType="numeric"
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
              style={{marginBottom: 12, backgroundColor: 'white'}}
            />
          )}
          {formData.within72 !== '' && formData.occurrence && (
            <TextInput
              label="Complaint Occurrence %"
              value={formData.occurrence}
              mode="outlined"
              disabled
              style={{marginBottom: 12, backgroundColor: '#f1f1f1'}}
            />
          )}
          {formData.within72 !== '' &&
            Number(formData.received) > Number(formData.closed) && (
              <>
                <TextInput
                  label="Gap Area"
                  value={formData.gapArea}
                  onChangeText={text => handleChange('gapArea', text)}
                  mode="outlined"
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                  style={{marginBottom: 12, backgroundColor: 'white'}}
                />
                <TextInput
                  label="Counter Measure Plan"
                  value={formData.counterMeasure}
                  onChangeText={text => handleChange('counterMeasure', text)}
                  mode="outlined"
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                  style={{marginBottom: 12, backgroundColor: 'white'}}
                />
                <TextInput
                  label="Responsibility"
                  value={formData.responsibility}
                  onChangeText={text => handleChange('responsibility', text)}
                  mode="outlined"
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                  style={{marginBottom: 12, backgroundColor: 'white'}}
                />
                <TextInput
                  label="Plan Closure Date"
                  value={formData.planClosureDate}
                  onChangeText={text => handleChange('planClosureDate', text)}
                  mode="outlined"
                  placeholder="YYYY-MM-DD"
                  style={{marginBottom: 24, backgroundColor: 'white'}}
                />
              </>
            )}
          {formData.within72 !== '' && (
            <View style={styles.ButtonContainer}>
              <CustomButton title={'Submit'} onPress={handleSubmit} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CustomerComplaintAnalysis;
