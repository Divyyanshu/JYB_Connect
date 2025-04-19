import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
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
import {
  clearAllTables,
  clearCustomerComplaintAnalysisTableData,
  clearKPIPerformanceData,
  clearRepeatCardTable,
  clearTableManPowerAvailability,
  insert_KPI_Performance_Record,
  insertDataManPowerAvailability,
  clearServiceAttributeTable,
  insertRecord,
} from '../../database/db';
import {API_ENDPOINTS, BASE_URL} from '../../api/endPoints';
import ConfirmationPopup from '../../uiKit/confirmPopup/confirmPopup';
import {COLORS} from '../../utils/colors';
import {
  getDealerCode,
  getDealerName,
  getEmail,
  saveDealerCode,
  saveDealerData,
  saveDealerName,
} from '../../utils/shared';
import Topbar from '../../components/CommonComponents/TopBar';

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
  const [previousDealerCode, setPreviousDealerCode] = useState('');
  const [previousDealerName, setPreviousDealerName] = useState('');
  const [selectedDealerName, setSelectedDealerName] = useState(null);

  const [selectedDealerData, setSelectedDealerData] = useState(null);

  const [userEmail, setUserEmail] = useState(null);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

  const navigation = useNavigation();

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
    fetchDealerList(month.value, selectedYear, userEmail);
  };

  const handleYearChange = async (year, index) => {
    const isConnected = await checkInternet();
    if (!isConnected) {
      showSnackbar('No Internet Connection');
      return;
    }

    setSelectedYearIndex(index);
    setSelectedYear(year);
    fetchDealerList(selectedMonth, year, userEmail);
  };

  useEffect(() => {
    const init = async () => {
      const isConnected = await checkInternet();
      if (!isConnected) {
        showSnackbar('No Internet Connection');
        return;
      }
      let email = await getEmail();
      setUserEmail(email);
      const monthValue = new Date().getMonth();
      const yearValue = new Date().getFullYear();

      setSelectedMonthIndex(monthValue);
      setSelectedMonth(monthValue + 1);
      setSelectedYear(yearValue);

      fetchDealerList(monthValue + 1, yearValue, email);
    };

    init();
  }, []);

  useEffect(() => {
    const unsubscribe2 = navigation.addListener('focus', () => {
      console.log('focus revived');
      setDelarCodeStatus();
    });
    return unsubscribe2;
  }, [navigation]);

  const setDelarCodeStatus = async () => {
    let dealerCode = await getDealerCode();
    let dealerName = await getDealerName();
    console.log('get dealer code >>>>> ', dealerCode);
    if (dealerCode) {
      console.log('inside if condtion');
      setPreviousDealerCode(dealerCode);
      setPreviousDealerName(dealerName);
    } else {
      setPreviousDealerCode('');
      setPreviousDealerName('');
    }
  };

  const fetchDealerList = async (month, year, userID) => {
    setLoading(true);
    console.log('Month and year', month, year, userEmail);
    try {
      const response = await axios.post(
        `${BASE_URL}${API_ENDPOINTS.TRAVEL_DEALER_PLANNING}`,
        {
          Month: month,
          Year: year.toString(),
          DealerCode: userID,
        },
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log('response >>>>', response.data);
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
  const fetchManPowerData = async (
    plan,
    month,
    year,
    dealerCode,
    dealerName,
  ) => {
    try {
      await clearTableManPowerAvailability();
      await clearCustomerComplaintAnalysisTableData();
      await clearRepeatCardTable();

      const response = await axios.post(
        'http://198.38.81.7/jawadvrapi/api/Dealer/MainPowerAvailability',
        {ServiceVisit: plan},
        {headers: {'Content-Type': 'application/json'}},
      );

      const manpowerData = response?.data?.Data;

      if (manpowerData?.length > 0) {
        console.log('API Response:', response);
        for (const item of manpowerData) {
          await insertDataManPowerAvailability(
            item.Type,
            item.Values,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          );
        }
        saveDealerCode(dealerCode);
        saveDealerName(dealerName);
        let dict = {};
        dict['TravelPlanID'] = selectedDealerData.Id;
        dict['Region'] = selectedDealerData.Region;
        dict['AreaCode'] = selectedDealerData.Area;
        dict['AreaIncharge'] = selectedDealerData.Ao;
        dict['DealerCode'] = selectedDealerData.DealerCode;
        dict['Month'] = month;
        dict['Year'] = year;
        saveDealerData(dict);

        await fetchDataServiceAttributeData(dealerCode, month, year);
      }
    } catch (error) {
      console.error('ManPower API Error:', error);
      setLoading(false);
    }
  };

  const fetchDataServiceAttributeData = async (dealerCode, month, year) => {
    try {
      clearServiceAttributeTable();
      const response = await axios.get(
        'http://198.38.81.7/jawadvrapi/api/Dealer/ApiforServiceAttribute',
      );

      if (response.data && response.data.Data) {
        console.log('Service Attribute Api response >>>>', response.data.Data);
        response.data.Data.forEach(async item => {
          await insertRecord(
            item.DefId,
            item.MainParameter,
            item.SubParameters,
            item.Checkpoints,
            item.MaxMarks,
            '',
          );
        });

        navigation.navigate(STACKS.MAIN_STACK, {
          screen: SCREENS.MAIN_STACK.KEY_ACTIVITIES,
          params: {dealerCode, month, year},
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showAlert('Error', 'Failed to fetch data from server.');
    }
  };

  const processKpiData = async (
    kpiData,
    month,
    year,
    dealerCode,
    dealerName,
  ) => {
    let Monthplan = '0';
    for (const item of kpiData) {
      console.log('Item >>>>>>>>', item);
      if (item.Type == 'Service Visit') {
        Monthplan = item.MonthPlan;
      }

      let status = await insert_KPI_Performance_Record(
        item?.Type || '',
        item?.MonthPlan || '',
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
    console.log('Month Plan >>>>', Monthplan);
    fetchManPowerData(Monthplan, month, year, dealerCode, dealerName);
  };

  const fetchKpiData = async (dealerCode, month, year, dealerName) => {
    const isConnected = await checkInternet();
    if (!isConnected) {
      showSnackbar('No Internet Connection');
      return;
    }

    setLoading(true);
    try {
      clearKPIPerformanceData();
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
      console.log('kpiData >>>>>>>', kpiData);
      if (kpiData.length > 0) {
        processKpiData(kpiData, month, year, dealerCode, dealerName);
        showSnackbar('No KPI data found');
      }
    } catch (error) {
      console.error('KPI Fetch Error:', error);
      showSnackbar('Unable to fetch KPI data');
    } finally {
      setLoading(false);
    }
  };

  const handleDealerSelect = (dealerCode, dealerName, item) => {
    console.log('previousDealerCode >>>>>', previousDealerCode);
    setSelectedDealerData(item);
    if (previousDealerCode == '') {
      fetchKpiData(dealerCode, selectedMonth, selectedYear, dealerName);
    } else if (previousDealerCode !== dealerCode) {
      setSelectedDealerCode(dealerCode);
      setSelectedDealerName(dealerName);

      setPopupVisible(true);
    } else {
      console.log('Dealer Data >>>>>', item);
      let dict = {};
      dict['TravelPlanID'] = item.Id;
      dict['Region'] = item.Region;
      dict['AreaCode'] = item.Area;
      dict['AreaIncharge'] = item.Ao;
      dict['DealerCode'] = item.DealerCode;
      dict['Month'] = selectedMonth;
      dict['Year'] = selectedYear;
      console.log('dict before saving >>>>', dict);

      saveDealerData(dict);
      navigation.navigate(STACKS.MAIN_STACK, {
        screen: SCREENS.MAIN_STACK.KEY_ACTIVITIES,
        params: {dealerCode, selectedMonth, selectedYear},
      });
    }
  };
  const handleProcess = async () => {
    setPopupVisible(false);
    await clearAllTables();
    await fetchKpiData(
      selectedDealerCode,
      selectedMonth,
      selectedYear,
      selectedDealerName,
    );
  };

  const formatDate = dateStr => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <View style={styles.container}>
      <Topbar
        showBack={true}
        showtitle={true}
        title={'Select Dealer Code'}
        navState={navigation}
      />
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 5,
          marginBottom: 10,
          backgroundColor: COLORS.LIGHT_PRIMARY,
          borderRadius: 10,
          paddingBottom: 20,
        }}>
        <Text style={styles.label}>Select Month:</Text>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MONTHS.map((month, index) => {
            const isCurrentYear =
              YEARS[selectedYearIndex] === new Date().getFullYear();
            const isFutureMonth =
              isCurrentYear && index > new Date().getMonth();

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.segmentButton,
                  selectedMonthIndex === index && styles.activeSegment,
                  isFutureMonth && {backgroundColor: '#e0e0e0'}, // Grayed out
                ]}
                onPress={() => {
                  if (!isFutureMonth) {
                    handleMonthChange(month);
                  }
                }}
                disabled={isFutureMonth}>
                <Text
                  style={[
                    styles.segmentText,
                    selectedMonthIndex === index && styles.activeText,
                    isFutureMonth && {color: '#9e9e9e'}, // Gray text
                  ]}>
                  {month.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={[styles.label, {marginTop: 10}]}>Select Year:</Text>
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
                onPress={() =>
                  handleDealerSelect(item.DealerCode, item.DealerName, item)
                }>
                <View>
                  <Text style={styles.title}>{item.DealerName}</Text>
                  <Text style={styles.status}>{item.DealerCode}</Text>
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
                  message={`Are you sure you want to proceed with Dealer Code: ${selectedDealerCode} (${selectedDealerName})? You have previously filled data for Dealer Code: ${previousDealerCode} (${previousDealerName}). Clicking 'Yes' will clear all previously entered data.`}
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
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#555',
                    padding: 20,
                  }}>
                  No Data Found
                </Text>
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
