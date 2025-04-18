import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './style';
import {
  fetchDataManPowerAvailability,
  updateManPowerAvailabilityData,
} from '../../database/db';
import ManPowerModal from '../../components/Manpower_Popup/Manpower_Popup';
import Topbar from '../../components/CommonComponents/TopBar';
import {COLORS} from '../../utils/colors';

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const ManpowerAvailabilityScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const currentDate = new Date();
  const totalDaysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  );
  const currentDay = currentDate.getDate();

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchDataManPowerAvailability(dbData => {
        console.log('Fetched data from man power DB:', dbData);
        setData(dbData);
      });
    } catch (error) {
      console.error('Error fetching Manpower Data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation, refresh]);

  const handleActionPlanModel = item => {
    const mtdPlan = (
      (parseFloat(item.month_plan) / totalDaysInMonth) *
      currentDay
    ).toFixed(2);
    setSelectedItem({...item, mtd_plan: mtdPlan});
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  const handleSubmit = async dataForm => {
    try {
      await updateManPowerAvailabilityData({
        type: dataForm.parameter,
        available: dataForm.available,
        trained: dataForm.trained,
        available_percentage: dataForm.available_percentage,
        trained_percentage: dataForm.trained_percentage,
        gap_area: dataForm.gap_area,
        counter_measure_plan: dataForm.counter_measure_plan,
        responsibility: dataForm.responsibility,
        plan_closure_date: dataForm.plan_closure_date,
        image_path: dataForm.image_path,
      });

      setRefresh(prev => !prev);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      onClose();
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItem && selectedItem.type === item.type;
    const isAllFilled =
      item.available &&
      item.trained &&
      item.available_percentage &&
      item.trained_percentage;

    return (
      <TouchableOpacity onPress={() => handleActionPlanModel(item)}>
        <View
          style={[
            styles.card,
            isSelected && {backgroundColor: COLORS.SELECTED_COLOR},
          ]}>
          <View style={styles.row}>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Roles</Text>
              <Text style={styles.text}>{item.type}</Text>
            </View>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Min. Required</Text>
              <Text style={styles.text}>{item.value}</Text>
            </View>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Available</Text>
              <Text style={styles.text}>{item.available || ''}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Trained</Text>
              <Text style={styles.text}>{item.trained || ''}</Text>
            </View>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Available %</Text>
              <Text style={styles.text}>{item.available_percentage || ''}</Text>
            </View>
            <View
              style={[
                styles.cell,
                isAllFilled && {backgroundColor: COLORS.SELECTED_COLOR},
              ]}>
              <Text style={styles.header}>Trained %</Text>
              <Text style={styles.text}>{item.trained_percentage || ''}</Text>
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
        title={'Man Power Status'}
        navState={navigation}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.type || index.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS === 'ios' ? 40 : 60,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}

      {visible && selectedItem && (
        <ManPowerModal
          visible={visible}
          onClose={onClose}
          item={selectedItem}
          onSubmit={handleSubmit}
        />
      )}
    </View>
  );
};

export default ManpowerAvailabilityScreen;
