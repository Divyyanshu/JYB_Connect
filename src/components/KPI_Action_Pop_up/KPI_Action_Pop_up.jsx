import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';
import {COLORS} from '../../utils/colors';
import {launchCamera} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {updateKPIPerformanceData} from '../../database/db';
import renderIf from '../../utils/renderIf';

const calculatePercentageAchieve = (mtd_plan, mtd_actual) => {
  if (!mtd_plan || !mtd_actual) return 0;
  return Math.round((mtd_actual / mtd_plan) * 100);
};

const KPIActionPopup = ({visible, onClose, item, onSubmit}) => {
  if (!item) return null;
  const [formData, setFormData] = useState({
    mtd_actual: '',
    gapArea: '',
    actionPlan: '',
    responsibility: '',
    planClosureDate: '',
    photo: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMTDActualFilled, setIsMTDActualFilled] = useState(false);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      handleInputChange('planClosureDate', date.toISOString().split('T')[0]);
    }
    setShowDatePicker(false);
  };
  useEffect(() => {
    if (item) {
      if (item.gap_area != '' && item.gapArea != undefined) {
        setIsMTDActualFilled(true);
      }
      setFormData({
        mtd_actual: item.mtd_actual,
        gapArea: item.gap_area,
        actionPlan: item.counter_measure_plan,
        responsibility: item.responsibility,
        planClosureDate: item.plan_closure_date,
        photo: item.image_path || null,
      });
    }
  }, [item]);

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMTDActualChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    handleInputChange('mtd_actual', numericValue);
    setIsMTDActualFilled(numericValue.length > 0);
  };

  const percentageAchieve = calculatePercentageAchieve(
    item.mtd_plan,
    formData.mtd_actual,
  );

  const isCriteriaMeet =
    parseFloat(percentageAchieve) >= parseFloat(item.percentage_criteria);

  async function handleValidate() {
    if (!isCriteriaMeet) {
      if (!formData.gapArea.trim())
        return Alert.alert('Error', 'Enter Gap Area');
      if (!formData.actionPlan.trim())
        return Alert.alert('Error', 'Enter Action Plan');
      if (!formData.responsibility.trim())
        return Alert.alert('Error', 'Enter Responsibility');
      if (!formData.planClosureDate.trim())
        return Alert.alert('Error', 'Enter Plan Closure Date');
      if (!formData.photo) return Alert.alert('Error', 'Capture a Photo');
    }
    try {
      await updateKPIPerformanceData({
        parameter: item.parameter,
        mtd_plan: item.mtd_plan,
        mtd_actual: formData.mtd_actual,
        percentage_achieve: calculatePercentageAchieve(
          item.mtd_plan,
          formData.mtd_actual,
        ),
        gap_area: formData.gapArea,
        counter_measure_plan: formData.actionPlan,
        responsibility: formData.responsibility,
        plan_closure_date: formData.planClosureDate,
        image_path: formData.photo,
      });
      onSubmit(formData);
    } catch (error) {
      Alert.alert('Error', 'Failed to update KPI performance');
    }
  }
  const handleSubmit = () => {
    handleValidate();
  };

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({
          saveToPhotos: true,
          mediaType: 'photo',
        });

        if (result.assets?.length > 0) {
          setFormData(prev => ({...prev, photo: result.assets[0].uri}));
        }
      } else {
        Alert.alert('Permission Denied', 'Camera access is required.');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Action Plan</Text>
          <View
            style={{
              padding: 20,
              backgroundColor: 'white',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <View style={{alignItems: 'flex-start'}}>
              {isMTDActualFilled && (
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: 'grey',
                    }}>
                    {item.parameter}
                  </Text>
                  <Text style={{marginBottom: 5, color: 'grey'}}>
                    Target Achieved {percentageAchieve}% of{' '}
                    {item.percentage_criteria}%
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>MTD Actual : </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter MTD Actual"
                onChangeText={handleMTDActualChange}
                value={formData.mtd_actual}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            {isMTDActualFilled && !isCriteriaMeet && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gap Area : </Text>
                  <TextInput
                    style={styles.input}
                    value={
                      formData.gapArea != undefined && formData.gapArea != ''
                    }
                    placeholder="Enter Gap Area"
                    onChangeText={text => handleInputChange('gapArea', text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Counter Measure Plan : </Text>
                  <TextInput
                    style={styles.input}
                    value={
                      formData.actionPlan != undefined &&
                      formData.actionPlan != ''
                    }
                    placeholder="Enter Counter Measure"
                    onChangeText={text => handleInputChange('actionPlan', text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Responsibility : </Text>
                  <TextInput
                    style={styles.input}
                    value={
                      formData.responsibility != undefined &&
                      formData.responsibility != ''
                    }
                    placeholder="Enter Responsibility"
                    onChangeText={text =>
                      handleInputChange('responsibility', text)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Plan Closure Date : </Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}>
                    <Text
                      style={{
                        color: formData.planClosureDate ? '#000' : '#999',
                        fontSize: 14,
                      }}>
                      {formData.planClosureDate
                        ? `${formData.planClosureDate}`
                        : 'Enter Date'}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                  )}
                </View>
                {formData.photo && isMTDActualFilled && !isCriteriaMeet && (
                  <Image source={{uri: formData.photo}} style={styles.image} />
                )}
                <View style={styles.buttonContainer}>
                  <CustomButton title="Click Photo" onPress={openCamera} />
                </View>
              </>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 12,
              }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.PRIMARY,
                }}
                onPress={() => handleSubmit()}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  backgroundColor: COLORS.WHITE,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.PRIMARY,
                }}
                onPress={onClose}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    color: COLORS.PRIMARY,
                  }}>
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default KPIActionPopup;
