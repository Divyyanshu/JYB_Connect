import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';
import renderIf from '../../utils/renderIf';
import {updateServiceAttributes} from '../../database/db';
import {COLORS} from '../../utils/colors';

const ServiceAttributeModel = ({
  visible,
  onClose,
  item,
  onSubmit,
  rowIndex,
}) => {
  if (!item) return null;
  const [formData, setFormData] = useState({
    gapArea: item.GapArea !== null ? item.GapArea : '',
    actionPlan: item.ActionPlan !== null ? item.ActionPlan : '',
    responsibility: item.Responsibility !== null ? item.Responsibility : '',
    planClosureDate: item.PlanDate !== null ? item.PlanDate : '',
    photo: item.Image !== null ? item.Image : null,
    marksObt: item.MaxObt !== null ? item.MaxObt : '',
  });

  const [isMaxObtGreater, setIsMaxObtGreater] = useState(false);
  const [marksObtained, setMarksObtained] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    formData.planClosureDate ? new Date(formData.planClosureDate) : new Date(),
  );
  function marksObtainedChange(text) {
    const numericValue = text.replace(/[^0-9]/g, '');
    const obtainedMarks = Number(numericValue);

    if (numericValue.length > 0) {
      if (obtainedMarks <= item.MaxMarks) {
        setMarksObtained(numericValue);
        setFormData(prev => ({...prev, marksObt: numericValue}));
        setIsMaxObtGreater(obtainedMarks < item.MaxMarks);
      }
    } else {
      setMarksObtained('');
      setFormData(prev => ({...prev, marksObt: '', photo: null, gapArea: ''}));
      setIsMaxObtGreater(false);
    }
  }

  useEffect(() => {
    if (item.GapArea !== null && item.GapArea !== '') {
      setIsMaxObtGreater(true);
      setMarksObtained(item.MaxObt);
    } else {
      setMarksObtained(item.MaxObt);
    }
  }, []);
  const handleValidate = () => {
    if (isMaxObtGreater == true) {
      if (formData.gapArea.trim().length == 0) {
        Alert.alert(
          'Required Field',
          'Please provide the gap area for improvement.',
          [{text: 'OK'}],
        );
      } else if (formData.actionPlan.trim().length == 0) {
        Alert.alert('Required Field', 'Please enter a countermeasure plan.', [
          {text: 'OK'},
        ]);
      } else if (formData.responsibility.trim().length == 0) {
        Alert.alert(
          'Required Field',
          'Please assign responsibility for the action plan.',
          [{text: 'OK'}],
        );
      } else if (formData.planClosureDate.trim().length == 0) {
        Alert.alert(
          'Required Field',
          'Please provide the closure date for the plan.',
          [{text: 'OK'}],
        );
      } else if (formData.photo == null) {
        Alert.alert(
          'Required Field',
          'Please add a photo as part of the submission.',
          [{text: 'OK'}],
        );
      } else {
        if (item.MaxMarks > formData.marksObt) {
          updateServiceAttributes(
            item.DefId,
            formData.marksObt,
            formData.gapArea,
            formData.actionPlan,
            formData.responsibility,
            formData.planClosureDate,
            formData.photo,
          );
          console.log('formData', formData);
          onSubmit(formData, rowIndex);
        } else {
          updateServiceAttributes(
            item.DefId,
            formData.marksObt,
            '',
            '',
            '',
            '',
            '',
          );
          onSubmit(formData, rowIndex);
        }
      }
    } else {
      console.log('string >>>>>>');
      updateServiceAttributes(
        item.DefId,
        formData.marksObt,
        '',
        '',
        '',
        '',
        '',
      );

      onSubmit(formData, rowIndex);
    }
  };
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
          const imagePath = result.assets[0].uri;
          setFormData(prev => ({...prev, photo: imagePath}));
        }
      } else {
        Alert.alert('Permission Denied', 'Camera access is required.');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFormData(prev => ({...prev, planClosureDate: formattedDate}));
      setSelectedDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: COLORS.PRIMARY,
              width: '100%',
              alignItems: 'center',
              paddingVertical: 15,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text style={styles.title}>Action Plan</Text>
          </View>
          <View style={{padding: 20}}>
            <Text style={styles.subParametersText}>{item.SubParameters}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Marks Obtain: </Text>
              <TextInput
                style={styles.input}
                placeholder="Marks Obtain"
                onChangeText={text => marksObtainedChange(text)}
                value={marksObtained}
                keyboardType="number-pad"
                maxLength={1}
              />
            </View>
            {renderIf(
              isMaxObtGreater,
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gap Area: </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.gapArea}
                    placeholder="Gap Area"
                    onChangeText={text =>
                      setFormData(prev => ({...prev, gapArea: text}))
                    }
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Counter Measure Plan: </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.actionPlan}
                    placeholder="Counter Measure Plan"
                    onChangeText={text =>
                      setFormData(prev => ({...prev, actionPlan: text}))
                    }
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Responsibility: </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.responsibility}
                    placeholder="Responsibility"
                    onChangeText={text =>
                      setFormData(prev => ({...prev, responsibility: text}))
                    }
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Plan Closure Date: </Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                      style={styles.placeholderStyle}
                      value={formData.planClosureDate}
                      placeholder="Plan Closure Date"
                      placeholderTextColor={'black'}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                )}
              </>,
            )}
            <View style={{alignItems: 'center'}}>
              {formData.photo && (
                <Image source={{uri: formData.photo}} style={styles.image} />
              )}
              <View style={styles.buttonContainer}>
                {renderIf(
                  isMaxObtGreater,
                  <CustomButton title="Click Photo" onPress={openCamera} />,
                )}
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 50,
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
        </View>
      </View>
    </Modal>
  );
};

export default ServiceAttributeModel;
