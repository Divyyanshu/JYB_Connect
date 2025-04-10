import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import {styles} from './style';
import {MONTHS, YEARS} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import {STACKS} from '../../utils/stacks';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  clearKPIPerformanceData,
  // clearTableManPowerAvailability,
  create_KPI_Performance_Table,
  createManPowerAvailability,
  fetchDataManPowerAvailability,
  insert_KPI_Performance_Record,
  insertDataManPowerAvailability,
} from '../../database/db';
import {API_ENDPOINTS, BASE_URL} from '../../api/endPoints';
import ConfirmationPopup from '../../uiKit/confirmPopup/confirmPopup';
import {COLORS} from '../../utils/colors';

const {width} = Dimensions.get('window');

const SelectDealerCode = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dealerData, setDealerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedDealerCode, setSelectedDealerCode] = useState(null);
  const [previousDealerCode, setPreviousDealerCode] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

  const navigation = useNavigation();

  useEffect(() => {
    create_KPI_Performance_Table();
    createManPowerAvailability();
  }, []);

  const checkInternet = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const showSnackbar = (message, type = 'info') => {
    setSnackbar({visible: true, message, type});
  };

  const handleMonthChange = async month => {
    const isConnected = await checkInternet();
    if (!isConnected) {
      showSnackbar('No Internet Connection');
      return;
    }

    setSelectedMonthIndex(month.value - 1);
    setSelectedMonth(month.value);
    fetchDealerList(month.value, selectedYear);
  };

  const handleYearChange = async (year, index) => {
    const isConnected = await checkInternet();
    if (!isConnected) {
      showSnackbar('No Internet Connection');
      return;
    }

    setSelectedYearIndex(index);
    setSelectedYear(year);
    fetchDealerList(selectedMonth, year);
  };

  useEffect(() => {
    const init = async () => {
      const isConnected = await checkInternet();
      if (!isConnected) {
        showSnackbar('No Internet Connection');
        return;
      }

      const monthValue = new Date().getMonth();
      const yearValue = new Date().getFullYear();

      setSelectedMonthIndex(monthValue);
      setSelectedMonth(monthValue + 1);
      setSelectedYear(yearValue);

      fetchDealerList(monthValue + 1, yearValue);
      fetchManPowerData();
    };

    init();
  }, []);

  const fetchDealerList = async (month, year) => {
    setLoading(true);
    console.log("Month and year",month,year)
    try {
      const response = await axios.post(
        `${BASE_URL}${API_ENDPOINTS.TRAVEL_DEALER_PLANNING}`,
        {
          Month: month,
          Year: year.toString(),
          DealerCode: 'p.vishnu3@classiclegends.com',
        },
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log("response >>>>",response.data)
      if (response.data?.Data) {
        setDealerData(response.data.Data);
      } else {
        setDealerData([]);
        showSnackbar('No dealer data found');
      }
    } catch (error) {
      console.error('Dealer List Error:', error);
      showSnackbar('Failed to fetch dealer list');
      setDealerData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchManPowerData = async () => {
    try {
      const response = await axios.post(
        'http://198.38.81.7/jawadvrapi/api/Dealer/MainPowerAvailability',
        {ServiceVisit: 100},
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.data?.Data?.length > 0) {
        console.log('rs >>>..', response);
        response.data.Data.forEach(item =>
          insertDataManPowerAvailability(item.Type, item.Values),
        );
      }

      fetchDataManPowerAvailability(dbData => {
        setLoading(false);
      });
    } catch (error) {
      console.error('ManPower API Error:', error);
      setLoading(false);
    }
  };

  const fetchKpiData = async (dealerCode, month, year) => {
    const isConnected = await checkInternet();
    if (!isConnected) {
      showSnackbar('No Internet Connection');
      return;
    }

    setLoading(true);
    try {
      clearKPIPerformanceData();
      // clearTableManPowerAvailability();

      const response = await axios.post(
        `${BASE_URL}${API_ENDPOINTS.KPI_PERFORMANCE}`,
        {
          DealerCode: dealerCode,
          Month: month,
          Year: year.toString(),
        },
        {headers: {'Content-Type': 'application/json'}},
      );

      const kpiData = response.data?.Data || [];
      if (kpiData.length > 0) {
        for (const item of kpiData) {
          await insert_KPI_Performance_Record(
            item?.Type || '',
            item?.MonthPlan || 0,
            item?.PerCriteria || 0,
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
          );
        }

        navigation.navigate(STACKS.MAIN_STACK, {
          screen: SCREENS.MAIN_STACK.KEY_ACTIVITIES,
          params: {dealerCode, month, year, kpiData},
        });

        showSnackbar('KPI data synced successfully', 'success');
      } else {
        showSnackbar('No KPI data found');
      }
    } catch (error) {
      console.error('KPI Fetch Error:', error);
      showSnackbar('Unable to fetch KPI data');
    } finally {
      setLoading(false);
    }
  };

  const handleDealerSelect = dealerCode => {
    if (previousDealerCode && previousDealerCode !== dealerCode) {
      setSelectedDealerCode(dealerCode);
      setPopupVisible(true);
    } else {
      // If same dealer selected again or no previous dealer, proceed directly
      setPreviousDealerCode(dealerCode);
      fetchKpiData(dealerCode, selectedMonth, selectedYear);
    }
  };
  const handleProcess = async () => {
    setPopupVisible(false);
    setPreviousDealerCode(selectedDealerCode); // Update new dealer as current
    await fetchKpiData(selectedDealerCode, selectedMonth, selectedYear);
  };

  const formatDate = dateStr => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginBottom: 30,
          backgroundColor: COLORS.LIGHT_PRIMARY,
          borderRadius: 10,
        }}>
        <Text style={styles.label}>Select Month:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MONTHS.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.segmentButton,
                selectedMonthIndex === index && styles.activeSegment,
              ]}
              onPress={() => handleMonthChange(month)}>
              <Text
                style={[
                  styles.segmentText,
                  selectedMonthIndex === index && styles.activeText,
                ]}>
                {month.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Select Year:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {YEARS.map((year, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.segmentButton,
                selectedYearIndex === index && styles.activeSegment,
              ]}
              onPress={() => handleYearChange(year, index)}>
              <Text
                style={[
                  styles.segmentText,
                  selectedYearIndex === index && styles.activeText,
                ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={dealerData}
            keyExtractor={item => item.Id.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS === 'ios' ? 40 : 60,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleDealerSelect(item.DealerCode)}>
                <View>
                  <Text style={styles.title}>{item.DealerCode}</Text>
                  <Text style={styles.status}>{item.Status}</Text>
                </View>
                <View>
                  <Text style={styles.dealerDate}>
                    {formatDate(item.PlanDate)}
                  </Text>
                </View>
                <ConfirmationPopup
                  visible={isPopupVisible}
                  onConfirm={handleProcess}
                  onCancel={() => setPopupVisible(false)}
                  message={`Are you sure you want to proceed with Dealer Code: ${selectedDealerCode}? You have previously filled data for Dealer Code: ${previousDealerCode}. Clicking 'Yes' will clear all previously entered data.`}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#555',
                    padding: 20,
                  }}>
                  No Data Found
                </Text>
                <Image
                  source={require('../../assets/images/no_data.png')}
                  style={{height: 100, width: 100}}
                  resizeMode="center"
                />
              </View>
            )}
          />
        </SafeAreaView>
      )}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({...snackbar, visible: false})}
        duration={3000}
        style={{
          backgroundColor:
            snackbar.type === 'success'
              ? '#4caf50'
              : snackbar.type === 'error'
              ? '#f44336'
              : '#323232',
        }}>
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

export default SelectDealerCode;
