import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {styles} from './style';
import KPI_Action_Pop_up from '../../components/KPI_Action_Pop_up/KPI_Action_Pop_up';
import {
  fetch_KPI_Performance_Data,
  updateKPIPerformanceData,
} from '../../database/db';
import Topbar from '../../components/CommonComponents/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const KPIPerformance = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const totalDaysInMonth = getDaysInMonth(currentYear, currentMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const localData = await fetch_KPI_Performance_Data();
        setData(localData || []);
        await storeServiceVisitMTDPlan(localData);
        console.log('localData >>>>>?', localData);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation, refresh]);

  const storeServiceVisitMTDPlan = async kpiData => {
    try {
      const serviceVisitItem = kpiData.find(
        item => item.parameter === 'Service Visit',
      );
      if (serviceVisitItem && serviceVisitItem.month_plan) {
        const mtdPlan = (
          (parseFloat(serviceVisitItem.month_plan) / totalDaysInMonth) *
          currentDay
        ).toFixed(2);
        await AsyncStorage.setItem('MTD_SERVICE_VISIT', mtd_actual);
        console.log(' mtd_actual stored in AsyncStorage:', mtd_actual);
      }
    } catch (error) {
      console.error('Error storing mtd_actual:', error);
    }
  };

  const handleActionPlanModel = (item, index) => {
    if (item.month_plan == '') {
      Alert.alert(
        `Month plan is pending for ${item.parameter}.`,
        `Kindly fill month plan form web portal.`,
      );
    } else {
      setSelectedItem(item);
      setSelectedRowIndex(index);
      setVisible(true);
    }
  };

  const onClose = () => {
    setVisible(false);
    setSelectedItem(null);
    setSelectedRowIndex(null);
  };

  const handleSubmit = async dataForm => {
    try {
      updateKPIPerformanceData(
        dataForm.parameter,
        dataForm.mtd_plan,
        dataForm.mtd_actual,
        dataForm.percentage_achieve,
        dataForm.gap_area,
        dataForm.counter_measure_plan,
        dataForm.responsibility,
        dataForm.plan_closure_date,
        dataForm.image_path,
      );
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      onClose();
    }
  };

  const renderItem = ({item, index}) => {
    const mtdPlan = (
      (parseFloat(item.month_plan) / totalDaysInMonth) *
      currentDay
    ).toFixed(2);
    const updatedItem = {...item, mtd_plan: mtdPlan};

    return (
      <TouchableOpacity
        onPress={() => handleActionPlanModel(updatedItem, index)}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.header}>Parameters</Text>
              <Text style={styles.text}>{item.parameter}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.header}>Month Plan</Text>
              <Text style={styles.text}>
                {item.month_plan == '' ? '' : parseFloat(item.month_plan)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.header}>% Criteria</Text>
              <Text style={styles.text}>
                {parseFloat(item.percentage_criteria)}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.header}>MTD Plan</Text>
              <Text style={styles.text}>
                {item.mtd_plan == ' ' ? '' : parseFloat(item.mtd_plan)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.header}>MTD Actual</Text>
              <Text style={styles.text}>
                {item.mtd_actual == ' ' ? '' : parseFloat(item.mtd_actual)}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.header}>% Achieve</Text>
              <Text style={styles.text}>
                {item.percentage_achieve == ' '
                  ? ''
                  : parseFloat(item.percentage_achieve)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Topbar
        showBack={true}
        showtitle={true}
        title={'KPI Performance'}
        navState={navigation}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loadingText}>Data Loading...</Text>
        </View>
      ) : (
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS === 'ios' ? 40 : 60,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {visible && selectedItem && (
        <KPI_Action_Pop_up
          visible={visible}
          onClose={onClose}
          item={selectedItem}
          onSubmit={handleSubmit}
        />
      )}
    </View>
  );
};

export default KPIPerformance;
