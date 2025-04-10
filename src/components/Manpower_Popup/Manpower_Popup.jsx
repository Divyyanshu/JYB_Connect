// import React, {useState, useEffect} from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   View,
//   Image,
//   PermissionsAndroid,
// } from 'react-native';
// import {
//   Modal,
//   Text,
//   TextInput,
//   Button,
//   Surface,
//   Portal,
//   IconButton,
// } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {launchCamera} from 'react-native-image-picker';
// import {COLORS} from '../../utils/colors';

// const ManPowerModal = ({visible, onClose, item, onSubmit}) => {
//   const [form, setForm] = useState({
//     available: '',
//     trained: '',
//     availablePercentage: '',
//     trainedPercentage: '',
//     gap_area: '',
//     counter_measure_plan: '',
//     responsibility: '',
//     plan_closure_date: '',
//     image_path: '',
//   });

//   const [showExtraInputs, setShowExtraInputs] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const minReq = parseFloat(item?.value || 0);

//   useEffect(() => {
//     const available = parseFloat(form.available || 0);
//     const trained = parseFloat(form.trained || 0);

//     const availablePercentage =
//       minReq > 0 && available ? ((available / minReq) * 100).toFixed(2) : '0';
//     const trainedPercentage =
//       minReq > 0 && trained ? ((trained / minReq) * 100).toFixed(2) : '0';

//     const bothFilled = form.available !== '' && form.trained !== '';

//     const showExtra =
//       minReq > 0 &&
//       bothFilled &&
//       (parseFloat(availablePercentage) < 100 ||
//         parseFloat(trainedPercentage) < 100);

//     setForm(prev => ({
//       ...prev,
//       availablePercentage,
//       trainedPercentage,
//     }));

//     setShowExtraInputs(showExtra);
//   }, [form.available, form.trained, item]);

//   const handleInputChange = (key, value) => {
//     if (key === 'trained') {
//       const available = parseFloat(form.available || 0);
//       const trained = parseFloat(value || 0);
//       if (trained > available) {
//         Alert.alert('Validation', 'Trained value cannot exceed Available.');
//         return;
//       }
//     }

//     if (key === 'available') {
//       const val = parseFloat(value || 0);
//       if (minReq > 0 && val > minReq) {
//         Alert.alert('Validation', 'Available cannot exceed Min. Requirement.');
//         return;
//       }
//     }

//     setForm(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setForm({...form, plan_closure_date: selectedDate.toDateString()});
//     }
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const handleImagePick = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Camera access is required.');
//       return;
//     }

//     const result = await launchCamera({
//       mediaType: 'photo',
//       quality: 0.5,
//       cameraType: 'back',
//       saveToPhotos: true,
//     });

//     if (result.didCancel) {
//       console.log('User cancelled camera');
//     } else if (result.errorCode) {
//       console.error('Camera Error:', result.errorMessage);
//       Alert.alert('Error', 'Camera not accessible.');
//     } else if (result.assets && result.assets.length > 0) {
//       setForm(prev => ({...prev, image_path: result.assets[0].uri}));
//     }
//   };

//   const handleSubmitForm = () => {
//     const finalData = {
//       ...form,
//       parameter: item?.type,
//       min_required: minReq,
//       available: form.available,
//       trained: form.trained,
//       available_percentage: form.availablePercentage,
//       trained_percentage: form.trainedPercentage,
//     };
//     console.log('final data >>>>', finalData);
//     onSubmit(finalData);
//   };

//   return (
//     <Portal>
//       <Modal
//         visible={visible}
//         onDismiss={onClose}
//         contentContainerStyle={styles.modalContainer}>
//         <View style={styles.closeIconContainer}>
//           <IconButton
//             icon="close"
//             size={24}
//             onPress={onClose}
//             iconColor="red"
//           />
//         </View>

//         <Surface style={styles.surface}>
//           <ScrollView>
//             <Text variant="titleLarge" style={styles.title}>
//               Action Plan
//             </Text>
//             <Text variant="bodyMedium" style={styles.subtitle}>
//               Parameter: {item?.type} | Min. Requirement: {minReq}
//             </Text>

//             <TextInput
//               label="Available"
//               keyboardType="numeric"
//               value={form.available}
//               onChangeText={text => handleInputChange('available', text)}
//               mode="outlined"
//               style={styles.input}
//               outlineColor="#999"
//               activeOutlineColor={COLORS.PRIMARY}
//             />
//             <TextInput
//               label="Trained"
//               keyboardType="numeric"
//               value={form.trained}
//               onChangeText={text => handleInputChange('trained', text)}
//               mode="outlined"
//               style={styles.input}
//               outlineColor="#999"
//               activeOutlineColor={COLORS.PRIMARY}
//             />

//             <TextInput
//               label="Available %"
//               value={form.availablePercentage}
//               mode="outlined"
//               style={styles.input}
//               outlineColor="#999"
//               editable={false}
//             />

//             <TextInput
//               label="Trained %"
//               value={form.trainedPercentage}
//               mode="outlined"
//               style={styles.input}
//               outlineColor="#999"
//               editable={false}
//             />

//             {showExtraInputs && (
//               <>
//                 <TextInput
//                   label="Gap Area"
//                   value={form.gap_area}
//                   onChangeText={text => handleInputChange('gap_area', text)}
//                   mode="outlined"
//                   style={styles.input}
//                   outlineColor="#999"
//                   activeOutlineColor={COLORS.PRIMARY}
//                 />
//                 <TextInput
//                   label="Counter Measure Plan"
//                   value={form.counter_measure_plan}
//                   onChangeText={text =>
//                     handleInputChange('counter_measure_plan', text)
//                   }
//                   mode="outlined"
//                   style={styles.input}
//                   outlineColor="#999"
//                   activeOutlineColor={COLORS.PRIMARY}
//                 />
//                 <TextInput
//                   label="Responsibility"
//                   value={form.responsibility}
//                   onChangeText={text =>
//                     handleInputChange('responsibility', text)
//                   }
//                   mode="outlined"
//                   style={styles.input}
//                   outlineColor="#999"
//                   activeOutlineColor={COLORS.PRIMARY}
//                 />
//                 <Button
//                   mode="contained"
//                   onPress={() => setShowDatePicker(true)}
//                   style={styles.button}
//                   buttonColor={
//                     form.plan_closure_date
//                       ? COLORS.SUCCESS_GREEN
//                       : COLORS.PRIMARY
//                   }>
//                   {form.plan_closure_date || 'Pick Closure Date'}
//                 </Button>

//                 <Button
//                   mode="contained"
//                   onPress={handleImagePick}
//                   style={styles.button}
//                   buttonColor={
//                     form.image_path ? COLORS.SUCCESS_GREEN : COLORS.PRIMARY
//                   }>
//                   {form.image_path ? 'Image Selected' : 'Click Photo'}
//                 </Button>
//               </>
//             )}
//             {form.image_path ? (
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Image
//                   source={{uri: form.image_path}}
//                   style={{
//                     width: '50%',
//                     height: 150,
//                     borderRadius: 10,
//                   }}
//                   resizeMode="cover"
//                 />
//               </View>
//             ) : null}

//             <Button
//               onPress={handleSubmitForm}
//               mode="contained"
//               style={[styles.button, {marginTop: 20, alignSelf: 'center'}]}
//               buttonColor={COLORS.PRIMARY}>
//               Submit
//             </Button>
//           </ScrollView>
//         </Surface>

//         {showDatePicker && (
//           <DateTimePicker
//             value={new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={handleDateChange}
//           />
//         )}
//       </Modal>
//     </Portal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     margin: 20,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     padding: 0,
//   },
//   closeIconContainer: {
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     zIndex: 10,
//   },
//   surface: {
//     padding: 16,
//     borderRadius: 12,
//     elevation: 4,
//     backgroundColor: '#fff',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 12,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     textAlign: 'center',
//     marginBottom: 8,
//     color: '#666',
//   },
//   input: {
//     marginVertical: 6,
//     backgroundColor: 'white',
//   },
//   percent: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 4,
//   },
//   button: {
//     marginTop: 10,
//     alignSelf: 'center',
//   },
// });

// export default ManPowerModal;
import React, {useState, useEffect} from 'react';
import {
  Platform,
  Alert,
  ScrollView,
  View,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {
  Modal,
  Text,
  TextInput,
  Button,
  Surface,
  Portal,
  IconButton,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera} from 'react-native-image-picker';
import {COLORS} from '../../utils/colors';
import {styles} from './style';

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

  const [availableInput, setAvailableInput] = useState('');
  const [trainedInput, setTrainedInput] = useState('');
  const [showExtraInputs, setShowExtraInputs] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const minReq = parseFloat(item?.value || 0);

  useEffect(() => {
    if (visible) {
      setForm({
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
      setAvailableInput('');
      setTrainedInput('');
      setShowExtraInputs(false);
    }
  }, [visible]);

  const handleInputChange = (key, value) => {
    if (key === 'trained') {
      const available = parseFloat(availableInput || 0);
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

    const available = parseFloat(
      key === 'available' ? value : availableInput || 0,
    );
    const trained = parseFloat(key === 'trained' ? value : trainedInput || 0);

    const availablePercentage =
      minReq > 0 && available ? ((available / minReq) * 100).toFixed(2) : '0';
    const trainedPercentage =
      minReq > 0 && trained ? ((trained / minReq) * 100).toFixed(2) : '0';

    const bothFilled = availableInput !== '' && trainedInput !== '';
    const showExtra =
      minReq > 0 &&
      bothFilled &&
      (parseFloat(availablePercentage) < 100 ||
        parseFloat(trainedPercentage) < 100);

    setForm(prev => ({
      ...prev,
      [key]: value,
      availablePercentage,
      trainedPercentage,
    }));

    setShowExtraInputs(showExtra);
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
            <Text variant="titleLarge" style={styles.title}>
              Action Plan
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Parameter: {item?.type} | Min. Requirement: {minReq}
            </Text>

            <TextInput
              label="Available"
              keyboardType="numeric"
              value={availableInput}
              onChangeText={text => setAvailableInput(text)}
              onBlur={() => handleInputChange('available', availableInput)}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />
            <TextInput
              label="Trained"
              keyboardType="numeric"
              value={trainedInput}
              onChangeText={text => setTrainedInput(text)}
              onBlur={() => handleInputChange('trained', trainedInput)}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />

            <TextInput
              label="Available %"
              value={form.availablePercentage}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              editable={false}
            />

            <TextInput
              label="Trained %"
              value={form.trainedPercentage}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              editable={false}
            />

            {showExtraInputs && (
              <>
                <TextInput
                  label="Gap Area"
                  value={form.gap_area}
                  onChangeText={text => handleInputChange('gap_area', text)}
                  mode="outlined"
                  style={styles.input}
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                />
                <TextInput
                  label="Counter Measure Plan"
                  value={form.counter_measure_plan}
                  onChangeText={text =>
                    handleInputChange('counter_measure_plan', text)
                  }
                  mode="outlined"
                  style={styles.input}
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                />
                <TextInput
                  label="Responsibility"
                  value={form.responsibility}
                  onChangeText={text =>
                    handleInputChange('responsibility', text)
                  }
                  mode="outlined"
                  style={styles.input}
                  outlineColor="#999"
                  activeOutlineColor={COLORS.PRIMARY}
                />
                <Button
                  mode="contained"
                  onPress={() => setShowDatePicker(true)}
                  style={styles.button}
                  buttonColor={
                    form.plan_closure_date
                      ? COLORS.SUCCESS_GREEN
                      : COLORS.PRIMARY
                  }>
                  {form.plan_closure_date || 'Pick Closure Date'}
                </Button>

                <Button
                  mode="contained"
                  onPress={handleImagePick}
                  style={styles.button}
                  buttonColor={
                    form.image_path ? COLORS.SUCCESS_GREEN : COLORS.PRIMARY
                  }>
                  {form.image_path ? 'Image Selected' : 'Click Photo'}
                </Button>
              </>
            )}
            {form.image_path ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: form.image_path}}
                  style={{
                    width: '50%',
                    height: 150,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
            ) : null}

            <Button
              onPress={handleSubmitForm}
              mode="contained"
              style={[styles.button, {marginTop: 20, alignSelf: 'center'}]}
              buttonColor={COLORS.PRIMARY}>
              Submit
            </Button>
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

export default ManPowerModal;
