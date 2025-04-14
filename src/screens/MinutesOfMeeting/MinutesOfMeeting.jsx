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
import {
  getMOMFromKPI_Performance,
  getMOMFromManPowerAvailability,
  getMOMFromServiceAttributes,
} from '../../database/db';
import {configureReanimatedLogger} from 'react-native-reanimated';

const MinutesOfMeeting = ({navigation}) => {
  const [dataMom, setDataMom] = useState(MOM_DATA);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    console.log('j.........');
    fetchMOMdata();
  }, []);
  const fetchMOMdata = async () => {
    let MomFromServiceAttribute = await getMOMFromServiceAttributes();
    let tempData = [];
    var SerialNumber = 1;
    for (let index = 0; index < MomFromServiceAttribute.length; index++) {
      const item = MomFromServiceAttribute[index];
      let tempDict = {};
      tempDict['id'] = SerialNumber;
      tempDict['parameters'] = item.MainParameter + ' ' + item.SubParameters;
      tempDict['clPlRemarks'] = item.GapArea;
      tempDict['countermeasurePlan'] = item.ActionPlan;
      tempDict['targetDate'] = item.PlanDate;
      tempDict['responsibility'] = item.Responsibility;

      tempData.push(tempDict);
      SerialNumber = SerialNumber + 1;
    }
    let MOMFromKPI_Performance = await getMOMFromKPI_Performance();
    for (let index = 0; index < MOMFromKPI_Performance.length; index++) {
      const item = MOMFromKPI_Performance[index];
      let tempDict = {};
      tempDict['id'] = SerialNumber;
      tempDict['parameters'] = item.parameter;
      tempDict['clPlRemarks'] = item.gap_area;
      tempDict['countermeasurePlan'] = item.counter_measure_plan;
      tempDict['targetDate'] = item.plan_closure_date;
      tempDict['responsibility'] = item.responsibility;

      tempData.push(tempDict);
      SerialNumber = SerialNumber + 1;
    }
    let MOMFromManPowerAvailability = await getMOMFromManPowerAvailability();
    for (let index = 0; index < MOMFromManPowerAvailability.length; index++) {
      const item = MOMFromManPowerAvailability[index];
      let tempDict = {};
      tempDict['id'] = SerialNumber;
      tempDict['parameters'] = item.type;
      tempDict['clPlRemarks'] = item.gap_area;
      tempDict['countermeasurePlan'] = item.counter_measure_plan;
      tempDict['targetDate'] = item.plan_closure_date;
      tempDict['responsibility'] = item.responsibility;

      tempData.push(tempDict);
      SerialNumber = SerialNumber + 1;
    }
    console.log('tempData >>>', tempData);
    setDataMom(tempData);
  };

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
