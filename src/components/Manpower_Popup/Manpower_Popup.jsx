import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  View,
  Image,
  PermissionsAndroid,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {Modal, Surface, Portal, IconButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera} from 'react-native-image-picker';
import {COLORS} from '../../utils/colors';

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
      setForm({...form, plan_closure_date: selectedDate.toDateString()});
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
        <View style={styles.closeIconContainer}>
          <IconButton
            icon="close"
            size={24}
            onPress={onClose}
            iconColor="red"
          />
        </View>

        <Surface style={styles.surface}>
          <ScrollView>
            <Text style={styles.title}>Action Plan</Text>
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

                <View style={styles.button}>
                  <Button
                    onPress={() => setShowDatePicker(true)}
                    title={form.plan_closure_date || 'Pick Closure Date'}
                    color={
                      form.plan_closure_date
                        ? COLORS.SUCCESS_GREEN
                        : COLORS.PRIMARY
                    }
                  />
                </View>

                <View style={styles.button}>
                  <Button
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

            <View style={styles.submitBtn}>
              <Button
                onPress={handleSubmitForm}
                title="Submit"
                color={COLORS.PRIMARY}
              />
            </View>
          </ScrollView>
        </Surface>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 0,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  nativeInput: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
  },
  submitBtn: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 10,
  },
});

export default ManPowerModal;
