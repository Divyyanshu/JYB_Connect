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
import {MOM_DATA} from '../../utils/constants';

const MinutesOfMeeting = ({navigation}) => {
  const [dataMom, setDataMom] = useState(MOM_DATA);

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
              data={dataMom}
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
