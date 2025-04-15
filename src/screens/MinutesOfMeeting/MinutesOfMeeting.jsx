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
import {
  getMOMFromComplaintAnalysis,
  getMOMFromKPI_Performance,
  getMOMFromManPowerAvailability,
  getMOMFromServiceAttributes,
} from '../../database/db';

const MinutesOfMeeting = ({navigation}) => {
  const [dataMom, setDataMom] = useState([]);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    fetchMOMdata();
  }, []);

  const fetchMOMdata = async () => {
    try {
      let tempData = [];
      let SerialNumber = 1;

      const MomFromServiceAttribute = await getMOMFromServiceAttributes();
      console.log('ServiceAttributes:', MomFromServiceAttribute);
      MomFromServiceAttribute.forEach(item => {
        tempData.push({
          id: SerialNumber++,
          parameters: item.MainParameter + ' ' + item.SubParameters,
          clPlRemarks: item.GapArea,
          countermeasurePlan: item.ActionPlan,
          targetDate: item.PlanDate,
          responsibility: item.Responsibility,
        });
      });

      const MOMFromKPI_Performance = await getMOMFromKPI_Performance();
      console.log('KPI Performance:', MOMFromKPI_Performance);
      MOMFromKPI_Performance.forEach(item => {
        tempData.push({
          id: SerialNumber++,
          parameters: item.parameter,
          clPlRemarks: item.gap_area,
          countermeasurePlan: item.counter_measure_plan,
          targetDate: item.plan_closure_date,
          responsibility: item.responsibility,
        });
      });

      const MOMFromManPowerAvailability =
      await getMOMFromManPowerAvailability();
      console.log('ManPowerAvailability:', MOMFromManPowerAvailability);
      MOMFromManPowerAvailability.forEach(item => {
        tempData.push({
          id: SerialNumber++,
          parameters: item.type,
          clPlRemarks: item.gap_area,
          countermeasurePlan: item.counter_measure_plan,
          targetDate: item.plan_closure_date,
          responsibility: item.responsibility,
        });
      });

      // Code added by Puru
     // for complaintAnalysis

     const MomForComplaintAnalysis = await getMOMFromComplaintAnalysis()

     console.log('MomForComplaintAnalysis:', MomForComplaintAnalysis);

      setDataMom(tempData);
      console.log('Final Merged Data:', tempData);
    } catch (error) {
      console.log('Error while fetching MOM data:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.parameters}</Text>
      <Text style={styles.cell}>{item.clPlRemarks}</Text>
      <Text style={styles.cell}>{item.countermeasurePlan}</Text>
      <Text style={styles.cell}>{item.targetDate}</Text>
      <Text style={styles.cell}>{item.responsibility}</Text>
    </View>
  );

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
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>S.No</Text>
            <Text style={styles.headerCell}>Parameters</Text>
            <Text style={styles.headerCell}>CL-PL Remarks</Text>
            <Text style={styles.headerCell}>Counter Measure Plan</Text>
            <Text style={styles.headerCell}>Target Date</Text>
            <Text style={styles.headerCell}>Responsibility</Text>
          </View>
          <View style={{height: '75%'}}>
            <FlatList
              data={dataMom}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 20}}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MinutesOfMeeting;
