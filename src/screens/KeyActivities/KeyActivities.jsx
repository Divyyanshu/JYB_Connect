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
} from 'react-native';
import {styles} from './style';
import {ToastAndroid} from 'react-native';
import {CustomButton} from '../../uiKit/customButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import {STACKS} from '../../utils/stacks';
import CustomAlert from '../../uiKit/customAlert/customAlert';
import DeviceInfo from 'react-native-device-info';
import Topbar from '../../components/CommonComponents/TopBar';
import {
  isAllAvailableFilled,
  isAllCompanyNamesFilled,
  isAllComplaintsReceivedFilled,
  isAllDealerNamesFilled,
  isAllMaxObtFilled,
  isAllMomParametersFilled,
  isAllMTDActualFilled,
  isAllRepeatCardNoFilled,
} from '../../database/db';

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
    async () => (await isAllMaxObtFilled()) && markActivityCompleted(0), // Service Attributes.
    async () => (await isAllMTDActualFilled()) && markActivityCompleted(1), // KPI.
    async () => (await isAllMaxObtFilled()) && markActivityCompleted(2), // DVR Score.
    async () => (await isAllAvailableFilled()) && markActivityCompleted(3), // Man Power.
    async () =>
      (await isAllComplaintsReceivedFilled()) && markActivityCompleted(4), // Complaints.
    async () => (await isAllRepeatCardNoFilled()) && markActivityCompleted(5), // Repeat Job.
    async () => (await isAllMomParametersFilled()) && markActivityCompleted(6), // MOM.
    async () => (await isAllCompanyNamesFilled()) && markActivityCompleted(7), // Company Rep.
    async () => (await isAllDealerNamesFilled()) && markActivityCompleted(8), // Dealer Rep.
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

  // const toggleSelection = id => {
  //   setLoading(true);
  //   const screenName = screenMapping[id];
  //   setTimeout(() => {
  //     if (screenName) {
  //       navigation.navigate(STACKS.MAIN_STACK, {screen: screenName});
  //     }
  //     setLoading(false);
  //   }, 100);
  // };

  // :- add condition in this service visit is present in kpi performance table then navigate Complaint and repeat active to fill and continue dvr
  const toggleSelection = async id => {
    setLoading(true);
    if ((id === '5' || id === '6') && !(await isAllMTDActualFilled())) {
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

  const handleSubmit = () => {
    const allCompleted = activitiesData.every(item => item.completed);

    setAlertTitle(allCompleted ? 'Success' : 'Incomplete');
    setAlertMessage(
      allCompleted
        ? 'All activities have been completed successfully.'
        : 'Please complete all activities before submitting.',
    );
    setAlertVisible(true);
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
      {/* Loader Modal */}
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

      {/* Activities List */}
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
                disabled={!activitiesData.every(item => item.completed)}
                variant={
                  activitiesData.every(item => item.completed)
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
