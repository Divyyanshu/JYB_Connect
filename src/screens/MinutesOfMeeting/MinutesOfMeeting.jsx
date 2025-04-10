import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {styles} from './style';

const MinutesOfMeeting = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      parameters: '',
      clPlRemarks: '',
      countermeasurePlan: '',
      targetDate: '',
      responsibility: '',
    },
    {
      id: 2,
      parameters: '',
      clPlRemarks: '',
      countermeasurePlan: '',
      targetDate: '',
      responsibility: '',
    },
    {
      id: 3,
      parameters: '',
      clPlRemarks: '',
      countermeasurePlan: '',
      targetDate: '',
      responsibility: '',
    },
    {
      id: 4,
      parameters: '',
      clPlRemarks: '',
      countermeasurePlan: '',
      targetDate: '',
      responsibility: '',
    },
    {
      id: 5,
      parameters: '',
      clPlRemarks: '',
      countermeasurePlan: '',
      targetDate: '',
      responsibility: '',
    },
  ]);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const handleInputChange = (value, id, field) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? {...item, [field]: value} : item)),
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#A6192E" />

        {/* Table Header */}
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>SN.</Text>
            <Text style={styles.headerCell}>Parameters</Text>
            <Text style={styles.headerCell}>CL-PL Remarks</Text>
            <Text style={styles.headerCell}>Counter Measure Plan</Text>
            <Text style={styles.headerCell}>Target Date</Text>
            <Text style={styles.headerCell}>Responsibility</Text>
          </View>

          {/* Table Body */}
          <View style={{height: '70%'}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.id}</Text>
                  <Text style={styles.cell}>{item.parameters}</Text>
                  <TextInput
                    style={styles.input}
                    value={item.clPlRemarks}
                    onChangeText={text =>
                      handleInputChange(text, item.id, 'clPlRemarks')
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={item.countermeasurePlan}
                    onChangeText={text =>
                      handleInputChange(text, item.id, 'countermeasurePlan')
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={item.targetDate}
                    onChangeText={text =>
                      handleInputChange(text, item.id, 'targetDate')
                    }
                  />
                  <TextInput
                    style={styles.input}
                    value={item.responsibility}
                    onChangeText={text =>
                      handleInputChange(text, item.id, 'responsibility')
                    }
                  />
                </View>
              )}
              contentContainerStyle={{paddingBottom: 20}}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MinutesOfMeeting;
