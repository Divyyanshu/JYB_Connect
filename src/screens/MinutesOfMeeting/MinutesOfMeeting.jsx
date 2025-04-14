import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {styles} from './style';
import Topbar from '../../components/CommonComponents/TopBar';

const MinutesOfMeeting = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      parameters: 'Parameter 1',
      clPlRemarks: 'Remark 1',
      countermeasurePlan: 'Plan 1',
      targetDate: '2025-04-20',
      responsibility: 'Person A',
    },
    {
      id: 2,
      parameters: 'Parameter 2',
      clPlRemarks: 'Remark 2',
      countermeasurePlan: 'Plan 2',
      targetDate: '2025-04-21',
      responsibility: 'Person B',
    },
    {
      id: 3,
      parameters: 'Parameter 3',
      clPlRemarks: 'Remark 3',
      countermeasurePlan: 'Plan 3',
      targetDate: '2025-04-22',
      responsibility: 'Person C',
    },
    {
      id: 4,
      parameters: 'Parameter 4',
      clPlRemarks: 'Remark 4',
      countermeasurePlan: 'Plan 4',
      targetDate: '2025-04-23',
      responsibility: 'Person D',
    },
    {
      id: 5,
      parameters: 'Parameter 5',
      clPlRemarks: 'Remark 5',
      countermeasurePlan: 'Plan 5',
      targetDate: '2025-04-24',
      responsibility: 'Person E',
    },
  ]);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
        <Topbar
          showBack={true}
          showtitle={true}
          showAdd={true}
          title={'Minutes of Meeting'}
          navState={navigation}
        />

        {/* Table Header */}
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>S.No</Text>
            <Text style={styles.headerCell}>Parameters</Text>
            <Text style={styles.headerCell}>CL-PL Remarks</Text>
            <Text style={styles.headerCell}>Counter Measure Plan</Text>
            <Text style={styles.headerCell}>Target Date</Text>
            <Text style={styles.headerCell}>Responsibility</Text>
          </View>

          {/* Table Body */}
          <View style={{height: '75%'}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View
                  style={{
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    flex: 1,
                  }}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{item.id}</Text>
                    <Text style={styles.cell}>{item.parameters}</Text>
                    <Text style={styles.cell}>{item.clPlRemarks}</Text>
                    <Text style={styles.cell}>{item.countermeasurePlan}</Text>
                    <Text style={styles.cell}>{item.targetDate}</Text>
                    <Text style={styles.cell}>{item.responsibility}</Text>
                  </View>
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
