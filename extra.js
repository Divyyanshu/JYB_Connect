import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DealerVisitForm = () => {
  const [form, setForm] = useState({
    region: '',
    dealerCode: '',
    dealerName: '',
    dealerType: '',
    location: '',
    state: '',
    asmName: '',
    dateOfVisit: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
    <View style={styles.container}>
        <Text>FIll dealer details</Text>
        <View>
             <Text style={styles.label}>Region</Text>
      <TextInput style={styles.input} value={form.region} onChangeText={(text) => handleInputChange('region', text)} />
      
      <Text style={styles.label}>Dealer/Branch Code</Text>
      <TextInput style={styles.input} value={form.dealerCode} onChangeText={(text) => handleInputChange('dealerCode', text)} />
      
        </View>
     
      <Text style={styles.label}>Dealer Name</Text>
      <TextInput style={styles.input} value={form.dealerName} onChangeText={(text) => handleInputChange('dealerName', text)} />
      
      <Text style={styles.label}>Dealer Type</Text>
      <TextInput style={styles.input} value={form.dealerType} onChangeText={(text) => handleInputChange('dealerType', text)} />
      
      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={form.location} onChangeText={(text) => handleInputChange('location', text)} />
      
      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} value={form.state} onChangeText={(text) => handleInputChange('state', text)} />
      
      <Text style={styles.label}>ASM Name</Text>
      <TextInput style={styles.input} value={form.asmName} onChangeText={(text) => handleInputChange('asmName', text)} />
      
      <Text style={styles.label}>Date of Visit</Text>
      <Button title={form.dateOfVisit.toDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={form.dateOfVisit}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) handleInputChange('dateOfVisit', selectedDate);
          }}
        />
      )}
      
      <Button title="Submit" onPress={() => console.log()} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafe: { padding: 20 , flex : 1 , backgroundColor  : "white" },
  container: { padding: 20 , flex : 1 , backgroundColor  : "white" , margin: 50 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
});

export default DealerVisitForm;

{/* <TextInput
                style={styles.input}
                value={item.actionPlan}
                onChangeText={(text) => handleChange(index, "actionPlan", text)}
              /> */}