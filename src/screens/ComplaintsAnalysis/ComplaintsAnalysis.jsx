// import React, {useEffect, useState} from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   View,
//   Text,
// } from 'react-native';
// import {TextInput} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Topbar from '../../components/CommonComponents/TopBar';
// import {COLORS} from '../../utils/colors';
// import {styles} from './style';
// import {CustomButton} from '../../uiKit/customButton';
// import {
//   createTableComplaintAnalysis,
//   fetchDataComplaintAnalysis,
//   insertComplaintAnalysis,
// } from '../../database/db';

// const CustomerComplaintAnalysis = ({navigation}) => {
//   const [formData, setFormData] = useState({
//     received: '',
//     closed: '',
//     within72: '',
//     occurrence: '',
//     gapArea: '',
//     counterMeasure: '',
//     responsibility: '',
//     planClosureDate: '',
//   });
//   const [mtdServiceVisit, setMtdServiceVisit] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);
//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     createTableComplaintAnalysis();
//     fetchDataComplaintAnalysis(setFormData, setIsSubmitted);
//     fetchServiceVisit();
//   }, []);

//   const fetchServiceVisit = async () => {
//     try {
//       const value = await AsyncStorage.getItem('MTD_SERVICE_VISIT');
//       if (value) setMtdServiceVisit(Number(value));
//     } catch (error) {
//       console.log('Error fetching service visit:', error);
//     }
//   };

//   const handleChange = (key, value) => {
//     const numericFields = ['received', 'closed', 'within72'];
//     if (numericFields.includes(key) && !/^\d*$/.test(value)) return;
//     if (
//       key !== 'received' &&
//       formData.received !== '' &&
//       Number(value) > Number(formData.received)
//     ) {
//       Alert.alert(
//         'Invalid Input',
//         'Value cannot be greater than Complaints Received',
//       );
//       return;
//     }

//     const updatedForm = {
//       ...formData,
//       [key]: value,
//     };
//     if (
//       key === 'within72' &&
//       formData.received &&
//       mtdServiceVisit &&
//       Number(formData.received) > 0
//     ) {
//       const occurrence = (
//         (Number(formData.received) / mtdServiceVisit) *
//         100
//       ).toFixed(2);
//       updatedForm.occurrence = occurrence;
//     }

//     setFormData(updatedForm);
//   };
//   const onDateChange = (event, selectedDate) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
//       setDate(selectedDate);
//       setFormData({...formData, planClosureDate: formattedDate});
//     }
//   };
//   const handleSubmit = () => {
//     insertComplaintAnalysis(formData);
//     Alert.alert('Success', 'Data submitted and saved');
//     setIsSubmitted(true);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{flex: 1}}>
//         <Topbar
//           showBack={true}
//           showtitle={true}
//           title={'Complaints Analysis'}
//           navState={navigation}
//         />
//         <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 60}}>
//           {!isSubmitted ? (
//             <>
//               <TextInput
//                 label="No. of Complaints Received"
//                 value={formData.received}
//                 onChangeText={text => handleChange('received', text)}
//                 mode="outlined"
//                 keyboardType="numeric"
//                 outlineColor="#999"
//                 activeOutlineColor={COLORS.PRIMARY}
//                 style={{marginBottom: 12, backgroundColor: 'white'}}
//               />
//               {formData.received !== '' && (
//                 <TextInput
//                   label="No. of Complaints Closed"
//                   value={formData.closed}
//                   onChangeText={text => handleChange('closed', text)}
//                   mode="outlined"
//                   keyboardType="numeric"
//                   outlineColor="#999"
//                   activeOutlineColor={COLORS.PRIMARY}
//                   style={{marginBottom: 12, backgroundColor: 'white'}}
//                 />
//               )}
//               {formData.closed !== '' && (
//                 <TextInput
//                   label="No. Closed in 72 Hours"
//                   value={formData.within72}
//                   onChangeText={text => handleChange('within72', text)}
//                   mode="outlined"
//                   keyboardType="numeric"
//                   outlineColor="#999"
//                   activeOutlineColor={COLORS.PRIMARY}
//                   style={{marginBottom: 12, backgroundColor: 'white'}}
//                 />
//               )}
//               {formData.within72 !== '' && formData.occurrence && (
//                 <TextInput
//                   label="Complaint Occurrence %"
//                   value={formData.occurrence}
//                   mode="outlined"
//                   disabled
//                   style={{marginBottom: 12, backgroundColor: '#f1f1f1'}}
//                 />
//               )}
//               {formData.within72 !== '' &&
//                 Number(formData.received) > Number(formData.closed) && (
//                   <>
//                     <TextInput
//                       label="Gap Area"
//                       value={formData.gapArea}
//                       onChangeText={text => handleChange('gapArea', text)}
//                       mode="outlined"
//                       outlineColor="#999"
//                       activeOutlineColor={COLORS.PRIMARY}
//                       style={{marginBottom: 12, backgroundColor: 'white'}}
//                     />
//                     <TextInput
//                       label="Counter Measure Plan"
//                       value={formData.counterMeasure}
//                       onChangeText={text =>
//                         handleChange('counterMeasure', text)
//                       }
//                       mode="outlined"
//                       outlineColor="#999"
//                       activeOutlineColor={COLORS.PRIMARY}
//                       style={{marginBottom: 12, backgroundColor: 'white'}}
//                     />
//                     <TextInput
//                       label="Responsibility"
//                       value={formData.responsibility}
//                       onChangeText={text =>
//                         handleChange('responsibility', text)
//                       }
//                       mode="outlined"
//                       outlineColor="#999"
//                       activeOutlineColor={COLORS.PRIMARY}
//                       style={{marginBottom: 12, backgroundColor: 'white'}}
//                     />
//                     <TouchableWithoutFeedback
//                       onPress={() => setShowPicker(true)}>
//                       <View
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#999',
//                           borderRadius: 4,
//                           padding: 14,
//                           backgroundColor: 'white',
//                           marginBottom: 24,
//                         }}>
//                         <Text
//                           style={{
//                             color: formData.planClosureDate ? 'black' : '#aaa',
//                           }}>
//                           {formData.planClosureDate ||
//                             'Select Plan Closure Date'}
//                         </Text>
//                       </View>
//                     </TouchableWithoutFeedback>
//                     {showPicker && (
//                       <DateTimePicker
//                         value={date}
//                         mode="date"
//                         display="default"
//                         onChange={onDateChange}
//                       />
//                     )}
//                   </>
//                 )}
//               <View style={styles.ButtonContainer}>
//                 <CustomButton title={'Submit'} onPress={handleSubmit} />
//               </View>
//             </>
//           ) : (
//             <View>
//               <Text style={styles.submittedTitle}>
//                 Submitted Complaint Analysis
//               </Text>
//               <View style={styles.table}>
//                 {/* Header Row */}
//                 <View style={styles.tableRowHeader}>
//                   <Text style={styles.tableCellHeader}>Field</Text>
//                   <Text style={styles.tableCellHeader}>Value</Text>
//                 </View>

//                 {/* Data Rows */}
//                 {Object.entries(formData).map(([key, value]) => (
//                   <View key={key} style={styles.tableRow}>
//                     <Text style={styles.tableCell}>
//                       {getFormattedLabel(key)}
//                     </Text>
//                     <Text style={styles.tableCell}>{value || '-'}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           )}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default CustomerComplaintAnalysis;
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../../components/CommonComponents/TopBar';
import {COLORS} from '../../utils/colors';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';
import {
  createTableComplaintAnalysis,
  fetchDataComplaintAnalysis,
  insertComplaintAnalysis,
} from '../../database/db';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    createTableComplaintAnalysis();
    fetchDataComplaintAnalysis(setFormData, setIsSubmitted);
    fetchServiceVisit();
  }, []);

  const fetchServiceVisit = async () => {
    try {
      const value = await AsyncStorage.getItem('MTD_SERVICE_VISIT');
      if (value) setMtdServiceVisit(Number(value));
    } catch (error) {
      console.log('Error fetching service visit:', error);
    }
  };

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

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDate(selectedDate);
      setFormData({...formData, planClosureDate: formattedDate});
    }
  };

  const handleSubmit = () => {
    insertComplaintAnalysis(formData);
    Alert.alert('Success', 'Data submitted and saved');
    setIsSubmitted(true);
  };

  const getFormattedLabel = key => {
    const labels = {
      received: 'Complaints Received',
      closed: 'Complaints Closed',
      within72: 'Closed in 72 Hours',
      occurrence: 'Occurrence %',
      gapArea: 'Gap Area',
      counterMeasure: 'Counter Measure',
      responsibility: 'Responsibility',
      planClosureDate: 'Plan Closure Date',
    };
    return labels[key] || key;
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
          {!isSubmitted ? (
            <>
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
                      onChangeText={text =>
                        handleChange('counterMeasure', text)
                      }
                      mode="outlined"
                      outlineColor="#999"
                      activeOutlineColor={COLORS.PRIMARY}
                      style={{marginBottom: 12, backgroundColor: 'white'}}
                    />
                    <TextInput
                      label="Responsibility"
                      value={formData.responsibility}
                      onChangeText={text =>
                        handleChange('responsibility', text)
                      }
                      mode="outlined"
                      outlineColor="#999"
                      activeOutlineColor={COLORS.PRIMARY}
                      style={{marginBottom: 12, backgroundColor: 'white'}}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => setShowPicker(true)}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#999',
                          borderRadius: 4,
                          padding: 14,
                          backgroundColor: 'white',
                          marginBottom: 24,
                        }}>
                        <Text
                          style={{
                            color: formData.planClosureDate ? 'black' : '#aaa',
                          }}>
                          {formData.planClosureDate ||
                            'Select Plan Closure Date'}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    {showPicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                      />
                    )}
                  </>
                )}
              <View style={styles.ButtonContainer}>
                <CustomButton title={'Submit'} onPress={handleSubmit} />
              </View>
            </>
          ) : (
            <View>
              <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <Text style={styles.tableCellHeader}>Field</Text>
                  <Text style={styles.tableCellHeader}>Value</Text>
                </View>
                {Object.entries(formData).map(([key, value]) => (
                  <View key={key} style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {getFormattedLabel(key)}
                    </Text>
                    <Text style={styles.tableCell}>{value || '-'}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CustomerComplaintAnalysis;
