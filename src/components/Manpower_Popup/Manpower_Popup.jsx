import React, {useState, useEffect} from 'react';
import {
  Platform,
  Alert,
  ScrollView,
  View,
  Image,
  PermissionsAndroid,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Modal, Surface, Portal, IconButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera} from 'react-native-image-picker';
import {COLORS} from '../../utils/colors';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';

const ManPowerModal = ({visible, onClose, item, onSubmit}) => {
  const [form, setForm] = useState({
    available: '',
    trained: '',
    availablePercentage: '',
    trainedPercentage: '',
    gap_area: '',
    counter_measure_plan: '',
    responsibility: '',
    plan_closure_date: '',
    image_path: '',
  });

  const [showExtraInputs, setShowExtraInputs] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const minReq = parseFloat(item?.value || 0);

  useEffect(() => {
    if (item && !form.available && !form.trained) {
      setForm(prev => ({
        ...prev,
        available: item?.available || '',
        trained: item?.trained || '',
        availablePercentage: item?.availablePercentage || '',
        trainedPercentage: item?.trainedPercentage || '',
        gap_area: item?.gap_area || '',
        counter_measure_plan: item?.counter_measure_plan || '',
        responsibility: item?.responsibility || '',
        plan_closure_date: item?.plan_closure_date || '',
        image_path: item?.image_path || '',
      }));
    }

    const available = parseFloat(form.available || 0);
    const trained = parseFloat(form.trained || 0);

    const availablePercentage =
      minReq > 0 && available ? ((available / minReq) * 100).toFixed(2) : '0';
    const trainedPercentage =
      minReq > 0 && trained ? ((trained / minReq) * 100).toFixed(2) : '0';

    const bothFilled = form.available !== '' && form.trained !== '';

    const showExtra =
      minReq > 0 &&
      bothFilled &&
      (parseFloat(availablePercentage) < 100 ||
        parseFloat(trainedPercentage) < 100);

    setForm(prev => ({
      ...prev,
      availablePercentage,
      trainedPercentage,
    }));

    setShowExtraInputs(showExtra);
  }, [form.available, form.trained, item]);

  const handleInputChange = (key, value) => {
    if (key === 'trained') {
      const available = parseFloat(form.available || 0);
      const trained = parseFloat(value || 0);
      if (trained > available) {
        Alert.alert('Validation', 'Trained value cannot exceed Available.');
        return;
      }
    }

    if (key === 'available') {
      const val = parseFloat(value || 0);
      if (minReq > 0 && val > minReq) {
        Alert.alert('Validation', 'Available cannot exceed Min. Requirement.');
        return;
      }
    }

    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setForm(prev => ({
        ...prev,
        plan_closure_date: formattedDate,
      }));
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleImagePick = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      cameraType: 'back',
      saveToPhotos: true,
    });

    if (result.didCancel) {
      console.log('User cancelled camera');
    } else if (result.errorCode) {
      console.error('Camera Error:', result.errorMessage);
      Alert.alert('Error', 'Camera not accessible.');
    } else if (result.assets && result.assets.length > 0) {
      setForm(prev => ({...prev, image_path: result.assets[0].uri}));
    }
  };

  const handleSubmitForm = () => {
    const finalData = {
      ...form,
      parameter: item?.type,
      min_required: minReq,
      available: form.available,
      trained: form.trained,
      available_percentage: form.availablePercentage,
      trained_percentage: form.trainedPercentage,
    };
    console.log('final data >>>>', finalData);
    onSubmit(finalData);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}>
        <Surface style={styles.surface}>
          <ScrollView>
            <Text style={styles.title}>Action Plan</Text>
            <View
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <Text style={styles.subtitle}>
                Parameter: {item?.type} | Min. Requirement: {minReq}
              </Text>
              <Text style={styles.label}>Available</Text>
              <TextInput
                keyboardType="numeric"
                value={form.available}
                onChangeText={text => handleInputChange('available', text)}
                style={styles.nativeInput}
                placeholder="Enter Available"
              />

              <Text style={styles.label}>Trained</Text>
              <TextInput
                keyboardType="numeric"
                value={form.trained}
                onChangeText={text => handleInputChange('trained', text)}
                style={styles.nativeInput}
                placeholder="Enter Trained"
              />

              <Text style={styles.label}>Available %</Text>
              <TextInput
                value={form.availablePercentage}
                editable={false}
                style={styles.nativeInput}
              />

              <Text style={styles.label}>Trained %</Text>
              <TextInput
                value={form.trainedPercentage}
                editable={false}
                style={styles.nativeInput}
              />

              {showExtraInputs && (
                <>
                  <Text style={styles.label}>Gap Area</Text>
                  <TextInput
                    value={form.gap_area}
                    onChangeText={text => handleInputChange('gap_area', text)}
                    style={styles.nativeInput}
                    placeholder="Enter Gap Area"
                  />

                  <Text style={styles.label}>Counter Measure Plan</Text>
                  <TextInput
                    value={form.counter_measure_plan}
                    onChangeText={text =>
                      handleInputChange('counter_measure_plan', text)
                    }
                    style={styles.nativeInput}
                    placeholder="Enter Counter Measure Plan"
                  />

                  <Text style={styles.label}>Responsibility</Text>
                  <TextInput
                    value={form.responsibility}
                    onChangeText={text =>
                      handleInputChange('responsibility', text)
                    }
                    style={styles.nativeInput}
                    placeholder="Enter Responsibility"
                  />
                  <Text style={styles.label}>Plan Closure Date</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.7}
                    style={[
                      styles.nativeInput,
                      {
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderColor: form.plan_closure_date
                          ? COLORS.DANGER
                          : '#ccc',
                      },
                    ]}>
                    <Text
                      style={{
                        color: form.plan_closure_date ? COLORS.DANGER : '#888',
                      }}>
                      {form.plan_closure_date || 'Pick Closure Date'}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.button}>
                    <CustomButton
                      onPress={handleImagePick}
                      title={form.image_path ? 'Image Selected' : 'Click Photo'}
                      color={
                        form.image_path ? COLORS.SUCCESS_GREEN : COLORS.PRIMARY
                      }
                    />
                  </View>
                </>
              )}

              {form.image_path ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: form.image_path}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
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
                  onPress={() => handleSubmitForm()}>
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
          </ScrollView>
        </Surface>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </Modal>
    </Portal>
  );
};

export default ManPowerModal;
