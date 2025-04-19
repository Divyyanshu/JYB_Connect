import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  Platform,
  Modal,
  Dimensions,
  ToastAndroid,
  Alert,
} from 'react-native';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import {STACKS} from '../../utils/stacks';
import CustomAlert from '../../uiKit/customAlert/customAlert';
import DeviceInfo from 'react-native-device-info';
import Topbar from '../../components/CommonComponents/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  isAllAvailableFilled,
  isAllCompanyNamesFilled,
  isAllComplaintsReceivedFilled,
  isAllDealerNamesFilled,
  isAllMaxObtFilled,
  isAllMomParametersFilled,
  isAllRepeatCardNoFilled,
  isAllMTDActualFilled,
  fetchRecords,
  fetch_KPI_Performance_Data,
  fetch_KPI_Performance,
  fetch_ManPower,
  fetchDataComplaintAnalysis,
  fetch_ComplaintAnalysis,
  fetch_MOM,
  fetch_RepeatJc,
  fetch_Dealer,
  fetch_Company,
  getMOMFromServiceAttributes,
  getMOMFromKPI_Performance,
  getMOMFromManPowerAvailability,
  getMOMFromComplaintAnalysis,
  clearAllTables,
} from '../../database/db';
import {fetchDealerData} from '../../utils/shared';
import {API_ENDPOINTS, BASE_URL} from '../../api/endPoints';
import axios from 'axios';

const activities = [
  {id: '1', title: 'Service Attributes', completed: false},
  {id: '2', title: 'KPI Performance', completed: false},
  {id: '3', title: 'DVR Score', completed: false},
  {id: '4', title: 'Man Power Status', completed: false},
  {id: '5', title: 'Complaints Analysis', completed: false},
  {id: '6', title: 'Repeat Job Card Analysis', completed: false},
  {id: '7', title: 'Minutes of Meeting', completed: false},
  {id: '8', title: 'Company Representative', completed: false},
  {id: '9', title: 'Dealer Representative', completed: false},
];

const screenMapping = {
  1: SCREENS.MAIN_STACK.SERVICE_ATTRIBUTES,
  2: SCREENS.MAIN_STACK.KPI_PERFORMANCE,
  3: SCREENS.MAIN_STACK.DVR_SCORE,
  4: SCREENS.MAIN_STACK.MAN_POWER_STATUS,
  5: SCREENS.MAIN_STACK.COMPLAINTS_ANALYSIS,
  6: SCREENS.MAIN_STACK.REPEAT_JOB,
  7: SCREENS.MAIN_STACK.MINUTES_OF_MEETING,
  8: SCREENS.MAIN_STACK.ACCOMPANIED_COMPANY,
  9: SCREENS.MAIN_STACK.ACCOMPANIED_DEALER,
};

const KeyActivities = () => {
  const [activitiesData, setActivitiesData] = useState(activities);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const deviceHeight = Dimensions.get('window').height;

  const markActivityCompleted = index => {
    setActivitiesData(prev =>
      prev.map((item, idx) =>
        idx === index ? {...item, completed: true} : item,
      ),
    );
  };

  const screenChecks = [
    async () => (await isAllMaxObtFilled()) && markActivityCompleted(0), // Service Attributes
    async () => (await isAllMTDActualFilled()) && markActivityCompleted(1), // KPI
    async () => (await isAllMaxObtFilled()) && markActivityCompleted(2), // DVR Score
    async () => (await isAllAvailableFilled()) && markActivityCompleted(3), // Man Power
    async () =>
      (await isAllComplaintsReceivedFilled()) && markActivityCompleted(4), // Complaints
    async () => (await isAllRepeatCardNoFilled()) && markActivityCompleted(5), // Repeat Job
    async () => (await isAllMomParametersFilled()) && markActivityCompleted(6), // MOM
    async () => (await isAllCompanyNamesFilled()) && markActivityCompleted(7), // Company Rep
    async () => (await isAllDealerNamesFilled()) && markActivityCompleted(8), // Dealer Rep
  ];

  const checkAllConditions = async () => {
    for (let check of screenChecks) {
      await check();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkAllConditions();
    });
    return unsubscribe;
  }, [navigation]);

  const isServiceVisitFilled = async () => {
    try {
      const value = await AsyncStorage.getItem('MTD_SERVICE_VISIT');
      console.log('MTD_SERVICE_VISIT from AsyncStorage:', value);
      return value !== null && value.trim() !== '';
    } catch (error) {
      console.error('Error reading MTD_SERVICE_VISIT:', error);
      return false;
    }
  };

  const toggleSelection = async id => {
    setLoading(true);

    if ((id === '5' || id === '6') && !(await isServiceVisitFilled())) {
      ToastAndroid.show(
        'Please fill Service Visit in KPI Performance before proceeding.',
        ToastAndroid.SHORT,
      );
      setLoading(false);
      return;
    }

    const screenName = screenMapping[id];
    setTimeout(() => {
      if (screenName) {
        navigation.navigate(STACKS.MAIN_STACK, {screen: screenName});
      }
      setLoading(false);
    }, 100);
  };

  const handleSubmit = async () => {
    let FinalJsonDict = {};

    let DealerData = await fetchDealerData();
    FinalJsonDict['TravelPlanID'] = DealerData.TravelPlanID;
    FinalJsonDict['Region'] = DealerData.Region;
    FinalJsonDict['AreaCode'] = DealerData.AreaCode;
    FinalJsonDict['AreaIncharge'] = DealerData.AreaIncharge;
    FinalJsonDict['DealerCode'] = DealerData.DealerCode;

    let serviceData = await getServiceAttributeData();
    FinalJsonDict['ServiceAttribute'] = serviceData;

    let kpiData = await getKPIPerformanceData();
    FinalJsonDict['KeyPerformance'] = kpiData;

    let ManPowerData = await getManPowerData();
    FinalJsonDict['ManpowerAvailability'] = ManPowerData;

    let ComplaintAnalysisData = await ComplaintAnalysis();
    FinalJsonDict['CustomerComplaint'] = ComplaintAnalysisData;

    let MoMData = await MinutesOfMeeting();
    FinalJsonDict['MinutesOfMeeting'] = MoMData;

    let RepeatJcData = await RepeatJc();
    FinalJsonDict['RepeatJc'] = RepeatJcData;

    let dvrDict = {};
    let DealerDataDict = await CalculateDealerData();
    let companyDict = await CalculateCompany();
    dvrDict['Company'] = companyDict;
    dvrDict['Dealer'] = DealerDataDict;
    FinalJsonDict['DvrAccompaniedBy'] = dvrDict;
    //  console.log('FinalJsonDict >>>>>>', FinalJsonDict);
    // console.log('📦 Final Payload:', JSON.stringify(FinalJsonDict, null, 2));
    postFinalData(FinalJsonDict);
  };

  // Post Final

  const uploadData = imageUrl => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      const timestamp = Date.now(); // current time in milliseconds
      const imageName = `${timestamp}_photo.jpg`;

      formData.append('Image', {
        uri: imageUrl,
        type: 'image/jpeg',
        name: imageName,
      });

      try {
        const response = await axios.post(
          'http://198.38.81.7/jawadvrapi/api/Dealer/saveimage',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('✅ Upload Success:', response.data.Data);
        resolve(response.data.Data); // resolve with response
      } catch (error) {
        console.error(
          '❌ Upload Failed:',
          error?.response?.data || error.message,
        );
        reject(error); // reject with error
      }
    });
  };

  const postFinalData = async dict => {
    try {
      const response = await axios.post(
        `http://198.38.81.7/jawadvrapi/api/Dealer/InsertDvr`,
        dict,
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log('final api response >>>>>', response);
      if (response.status == 200) {
        Alert.alert(
          'Upload Complete',
          'DVR Report uploaded successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                clearAllTables();
                navigation.navigate(SCREENS.MAIN_STACK.DASHBOARD);
                // You can perform any action here
              },
            },
          ],
          {cancelable: false}, // disables tapping outside to dismiss
        );
      } else {
      }
    } catch (error) {
      console.error('KPI Fetch Error:', error);
      showSnackbar('Unable to fetch KPI data');
    } finally {
      setLoading(false);
    }
  };

  const getServiceAttributeData = async () => {
    const data = await fetchRecords();
    let serviceAttributeArray = [];
    await Promise.all(
      data.map(async item => {
        let tempDict = {};
        tempDict['ParamterID'] = item.DefId;
        tempDict['Marksobj'] = item.MaxObt;
        tempDict['ActionPlanModel'] = item.GapArea == '' ? 'No' : 'Yes';

        let ActionPlanDict = {};
        ActionPlanDict['ParamterID'] = item.DefId;
        ActionPlanDict['GapArea'] = item.GapArea;
        ActionPlanDict['CounterMeasure'] = item.ActionPlan;
        ActionPlanDict['PlanClosoreDate'] = item.PlanDate;
        ActionPlanDict['ResponsiblePersone'] = item.Responsibility;

        if (item.Image !== '') {
          try {
            const uploadedUrl = await uploadData(item.Image);
            ActionPlanDict['Photos'] = uploadedUrl;
          } catch (err) {
            console.error('Image upload failed for item:', item, err);
            ActionPlanDict['Photos'] = '';
          }
        } else {
          ActionPlanDict['Photos'] = '';
        }

        tempDict['ActionPlan'] = ActionPlanDict;
        serviceAttributeArray.push(tempDict);
      }),
    );

    // ✅ Continue here only after all uploads and data preparation is done
    return serviceAttributeArray;
  };

  const getKPIPerformanceData = async () => {
    const data = await fetch_KPI_Performance_Data();
    const DealerData = await fetchDealerData();

    const KpiArray = await Promise.all(
      data.map(async item => {
        let tempDict = {
          Paramter: item.parameter,
          MonthPlan: item.month_plan,
          MTDPlan: item.mtd_plan,
          Year: DealerData.Year.toString(),
          Month: DealerData.Month.toString(),
          MTDActual: item.mtd_actual,
          MTDAchualPercentage: item.percentage_achieve,
          PercentageCriteria: item.percentage_criteria,
          ActionPlanModel: item.GapArea === ' ' ? 'No' : 'Yes',
        };

        let ActionPlanDict = {
          ParamterID: item.parameter,
          GapArea: item.gap_area,
          CounterMeasure: item.counter_measure_plan,
          PlanClosoreDate: item.plan_closure_date,
          ResponsiblePersone: item.responsibility,
        };

        if (item.image_path && item.image_path.trim() !== '') {
          try {
            const uploadedUrl = await uploadData(item.image_path);
            ActionPlanDict.Photos = uploadedUrl;
          } catch (err) {
            console.error('Image upload failed for item:', item, err);
            ActionPlanDict.Photos = '';
          }
        } else {
          ActionPlanDict.Photos = '';
        }

        tempDict.ActionPlan = ActionPlanDict;
        return tempDict; // return each dict for Promise.all
      }),
    );

    return KpiArray; // all items are now processed and returned
  };

  const getManPowerData = async () => {
    const data = await fetch_ManPower();
    let ManPowerArray = [];
    await Promise.all(
      data.map(async item => {
        let tempDict = {};
        tempDict['Type'] = item.type;
        tempDict['MinRequirement'] = item.value;
        tempDict['Available'] = item.available;
        tempDict['Trained'] = item.trained;
        tempDict['Remark'] = item.trained_percentage;
        tempDict['Percentage'] = item.available_percentage;
        tempDict['ActionPlanModel'] = item.gap_area == ' ' ? 'No' : 'Yes';

        let ActionPlanDict = {};
        ActionPlanDict['ParamterID'] = item.type;
        ActionPlanDict['GapArea'] = item.gap_area;
        ActionPlanDict['CounterMeasure'] = item.counter_measure_plan;
        ActionPlanDict['PlanClosoreDate'] = item.plan_closure_date;
        ActionPlanDict['ResponsiblePersone'] = item.responsibility;

        if (item.image_path && item.image_path.trim() !== '') {
          try {
            const uploadedUrl = await uploadData(item.image_path);
            ActionPlanDict.Photos = uploadedUrl;
          } catch (err) {
            console.error('Image upload failed for item:', item, err);
            ActionPlanDict.Photos = '';
          }
        } else {
          ActionPlanDict.Photos = '';
        }

        tempDict['ActionPlan'] = ActionPlanDict;
        ManPowerArray.push(tempDict);
      }),
    );
    return ManPowerArray;
  };

  const ComplaintAnalysis = async () => {
    const data = await fetch_ComplaintAnalysis();
    let ComplaintAnalysisArray = [];
    data.map(item => {
      let tempDict = {};
      tempDict['Received'] = item.received;
      tempDict['Closed'] = item.closed;
      tempDict['ComplaintWithin72Hour'] = item.within72;
      tempDict['ComplaintOccurrence'] = item.occurrence;
      tempDict['ActionPlanModel'] = item.gapArea == ' ' ? 'No' : 'Yes';
      let ActionPlanDict = {};
      ActionPlanDict['ParamterID'] = '';
      ActionPlanDict['GapArea'] = item.gapArea;
      ActionPlanDict['CounterMeasure'] = item.counterMeasure;
      ActionPlanDict['PlanClosoreDate'] = item.planClosureDate;
      ActionPlanDict['ResponsiblePersone'] = item.responsibility;
      ActionPlanDict['Photos'] = '';
      tempDict['ActionPlan'] = ActionPlanDict;
      ComplaintAnalysisArray.push(tempDict);
    });
    return ComplaintAnalysisArray;
  };

  const MinutesOfMeeting = async () => {
    const data = await fetch_MOM();
    let MinutesOfMeetingArray = [];
    data.map(item => {
      let tempDict = {};
      tempDict['Parameters'] = item.parameter;
      tempDict['CLRRemarks'] = item.remarks;
      tempDict['DealerRemarks'] = '';
      tempDict['CountermeasurePlan'] = item.counterMeasure;
      tempDict['TargetDate'] = item.targetDate;
      tempDict['Responsibility'] = item.responsibility;
      MinutesOfMeetingArray.push(tempDict);
    });

    // from other tables too

    const MomFromServiceAttribute = await getMOMFromServiceAttributes();
    console.log('ServiceAttributes:', MomFromServiceAttribute);
    MomFromServiceAttribute.forEach(item => {
      MinutesOfMeetingArray.push({
        Parameters: item.MainParameter + ' ' + item.SubParameters,
        CLRRemarks: item.GapArea,
        DealerRemarks: '',
        CountermeasurePlan: item.ActionPlan,
        TargetDate: item.PlanDate,
        Responsibility: item.Responsibility,
      });
    });

    const MOMFromKPI_Performance = await getMOMFromKPI_Performance();
    console.log('KPI Performance:', MOMFromKPI_Performance);
    MOMFromKPI_Performance.forEach(item => {
      MinutesOfMeetingArray.push({
        Parameters: item.parameter,
        CLRRemarks: item.gap_area,
        DealerRemarks: '',
        CountermeasurePlan: item.counter_measure_plan,
        TargetDate: item.plan_closure_date,
        Responsibility: item.responsibility,
      });
    });

    const MOMFromManPowerAvailability = await getMOMFromManPowerAvailability();
    console.log('ManPowerAvailability:', MOMFromManPowerAvailability);
    MOMFromManPowerAvailability.forEach(item => {
      MinutesOfMeetingArray.push({
        Parameters: item.type,
        CLRRemarks: item.gap_area,
        DealerRemarks: '',
        CountermeasurePlan: item.counter_measure_plan,
        TargetDate: item.plan_closure_date,
        Responsibility: item.responsibility,
      });
    });
    const MomForComplaintAnalysis = await getMOMFromComplaintAnalysis();
    MomForComplaintAnalysis.forEach(item => {
      MinutesOfMeetingArray.push({
        Parameters: `Complaints - ${item.received}`,
        CLRRemarks: item.gapArea,
        DealerRemarks: '',
        CountermeasurePlan: item.counterMeasure,
        TargetDate: item.planClosureDate,
        Responsibility: item.responsibility,
      });
    });

    return MinutesOfMeetingArray;
  };

  const RepeatJc = async () => {
    const data = await fetch_RepeatJc();
    let tempDict = {};
    data.map(item => {
      tempDict['RepeatJcNos'] = item.card_no.toString();
      tempDict['RepeatJCPercentage'] = item.card_percent;
    });
    return tempDict;
  };

  const CalculateDealerData = async () => {
    const data = await fetch_Dealer();
    let DealerArray = [];
    data.map(item => {
      let tempDict = {};
      tempDict['Post'] = item.post;
      tempDict['Name'] = item.name;
      tempDict['Mobile'] = item.mobile;
      DealerArray.push(tempDict);
    });
    return DealerArray;
  };

  const CalculateCompany = async () => {
    const data = await fetch_Company();
    let companyArray = [];
    data.map(item => {
      let tempDict = {};
      tempDict['Post'] = item.post;
      tempDict['Name'] = item.name;
      tempDict['Mobile'] = item.mobile;
      companyArray.push(tempDict);
    });
    return companyArray;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
      <Topbar
        showBack={true}
        showtitle={true}
        title={'Key Activities'}
        navState={navigation}
      />
      <Modal visible={loading} transparent animationType="none">
        <View
          style={{
            top: DeviceInfo.hasNotch() ? 110 : 80,
            height: DeviceInfo.hasNotch()
              ? deviceHeight - 110
              : deviceHeight - 80,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: '#fff',
              borderRadius: 12,
              justifyContent: 'center',
              position: 'absolute',
              borderWidth: 2,
              borderColor: '#D4D4D4',
              top: DeviceInfo.hasNotch()
                ? (deviceHeight - 220 - 80) / 2
                : (deviceHeight - 160 - 80) / 2,
            }}>
            <Image
              source={require('../../assets/icons/loader.gif')}
              style={{height: 50, width: 50, alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>

      <View style={styles.flatListContainer}>
        <FlatList
          data={activitiesData}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'ios' ? 40 : 60,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.activityContainer}
              onPress={() => toggleSelection(item.id)}>
              <View style={styles.activityRow}>
                <Text style={styles.activityText}>{item.title}</Text>
                {item.completed && (
                  <Image
                    source={require('../../assets/icons/check_tick.png')}
                    style={styles.tickIcon}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.submitButton}>
              <CustomButton
                title="SUBMIT"
                onPress={handleSubmit}
                disabled={
                  !activitiesData
                    .filter(item => item.id !== 8) // skip ID 8
                    .every(item => item.completed)
                }
                variant={
                  activitiesData
                    .filter(item => item.id !== 8)
                    .every(item => item.completed)
                    ? 'primary'
                    : 'secondary'
                }
              />
            </View>
          }
        />
      </View>
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
      />
    </View>
  );
};

export default KeyActivities;
