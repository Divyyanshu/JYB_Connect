import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {styles} from './style';
import Topbar from '../../components/CommonComponents/TopBar';
import {
  fetchDataMomManuallyTable,
  getMOMFromComplaintAnalysis,
  getMOMFromKPI_Performance,
  getMOMFromManPowerAvailability,
  getMOMFromServiceAttributes,
} from '../../database/db';
import CustomFormModal from '../../components/Mom_Popup/Mom_Popup';

import { NativeModules } from 'react-native';

const { OrientationManager } = NativeModules;

const MinutesOfMeeting = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataMom, setDataMom] = useState([]);

  useEffect(() => {
    if(Platform.OS == "android"){
      Orientation.lockToLandscape();
      return () => {
        Orientation.lockToPortrait();
      };
    }

  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios' && OrientationManager) {
      OrientationManager.lockToLandscape();
  
      return () => {
        OrientationManager.lockToPortrait();
      };
    }
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
      const MomForComplaintAnalysis = await getMOMFromComplaintAnalysis();
      console.log('MomForComplaintAnalysis:', MomForComplaintAnalysis);
      MomForComplaintAnalysis.forEach(item => {
        tempData.push({
          id: SerialNumber++,
          parameters: `Complaints - ${item.received}`,
          clPlRemarks: item.gapArea,
          countermeasurePlan: item.counterMeasure,
          targetDate: item.planClosureDate,
          responsibility: item.responsibility,
        });
      });
      const getManuallyMomData = await fetchDataMomManuallyTable();
      console.log('getManuallyMomData:', getManuallyMomData);
      getManuallyMomData.forEach(item => {
        tempData.push({
          id: SerialNumber++,
          parameters: item.parameter,
          clPlRemarks: item.remarks,
          countermeasurePlan: item.counterMeasure,
          targetDate: item.targetDate,
          responsibility: item.responsibility,
        });
      });

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
          isLandscape={true}
          title={'Minutes of Meeting'}
          navState={navigation}
          setModalVisible={setModalVisible}
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
      <CustomFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => {
          setModalVisible(false);
          fetchMOMdata();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default MinutesOfMeeting;
