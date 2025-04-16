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
  const [selected, setSelected] = useState(activities);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const deviceHeight = Dimensions.get('window').height;
  console.log('DeviceInfo.hasNotch()', DeviceInfo.hasNotch());
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {}, []);
  const toggleSelection = id => {
    setLoading(true);

    setTimeout(() => {
      const screenName = screenMapping[id];
      if (screenName) {
        navigation.navigate(STACKS.MAIN_STACK, {screen: screenName});
      }
      setLoading(false);
    }, 100);
  };

  useEffect(() => {
    const unsubscribe2 = navigation.addListener('focus', () => {
      console.log('On focus >>>>');
      isAllMaxObtFillServiceAttribute();
      isAllMtd_actualKPI_Performance();
      isAllMaxObtFillDVR_Score();
      isAll_Available_ManPowerStatus();
      isAllComplaintsAnalysis_Received();
      isAllRepeatCardNoFilledTable();
      isAllDealerFilled();
      isAllCompanyFilled();
      isAllMoM_Table();
    });
    return unsubscribe2;
  }, [navigation]);

  const handleSubmit = () => {
    const allCompleted = selected.every(item => item.completed);

    if (allCompleted) {
      setAlertTitle('Success');
      setAlertMessage('All activities have been completed successfully.');
    } else {
      setAlertTitle('Incomplete');
      setAlertMessage('Please complete all activities before submitting.');
    }

    setAlertVisible(true);
  };

  const isAllMaxObtFillServiceAttribute = async () => {
    let isAllMaxObtain = await isAllMaxObtFilled();
    if (isAllMaxObtain == true) {
      activities[0].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllMaxObtFilled', isAllMaxObtain);
  };
  const isAllMaxObtFillDVR_Score = async () => {
    let isAllMaxObtain = await isAllMaxObtFilled();
    if (isAllMaxObtain == true) {
      activities[2].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllMaxObtFilled', isAllMaxObtain);
  };
  const isAllMtd_actualKPI_Performance = async () => {
    let isAllMtd_actual = await isAllMTDActualFilled();
    if (isAllMtd_actual == true) {
      activities[1].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllMTDActualFilled', isAllMtd_actual);
  };
  const isAll_Available_ManPowerStatus = async () => {
    let isAll_Available = await isAllAvailableFilled();
    if (isAll_Available == true) {
      activities[3].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllAvailableFilled', isAll_Available);
  };
  const isAllComplaintsAnalysis_Received = async () => {
    let isAllComplaintsReceived = await isAllComplaintsReceivedFilled();
    if (isAllComplaintsReceived == true) {
      activities[4].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllComplaintsReceivedFilled', isAllComplaintsReceived);
  };
  const isAllRepeatCardNoFilledTable = async () => {
    let isAllRepeatCard = await isAllRepeatCardNoFilled();
    if (isAllRepeatCard == true) {
      activities[5].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllRepeatCardNoFilled', isAllRepeatCard);
  };
  const isAllMoM_Table = async () => {
    let isAllMom = await isAllMomParametersFilled();
    if (isAllMom == true) {
      activities[6].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllMomParametersFilled', isAllMom);
  };
  const isAllCompanyFilled = async () => {
    let isAllCompanyFill = await isAllCompanyNamesFilled();
    if (isAllCompanyFill == true) {
      activities[7].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllCompanyNamesFilled', isAllCompanyFill);
  };
  const isAllDealerFilled = async () => {
    let isAllDealerFill = await isAllDealerNamesFilled();
    if (isAllDealerFill == true) {
      activities[8].completed = true;
      setUpdateUI(!updateUI);
    }
    console.log('isAllDealerNamesFilled', isAllDealerFill);
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
      <Modal
        visible={loading}
        animationType={'none'}
        transparent={true}
        onRequestClose={() => {}}>
        <View
          style={[
            {
              top: DeviceInfo.hasNotch() == true ? 110 : 80,
              height:
                DeviceInfo.hasNotch() == true
                  ? deviceHeight - 110
                  : deviceHeight - 80,
              alignItems: 'center',
            },
          ]}>
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
              top:
                DeviceInfo.hasNotch() == true
                  ? (deviceHeight - 220 - 80) / 2
                  : (deviceHeight - 160 - 80) / 2,
            }}>
            <Image
              source={require('../../assets/icons/loader.gif')}
              resizeMode="contain"
              style={{height: 50, width: 50, alignSelf: 'center'}}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.flatListContainer}>
        <FlatList
          data={selected}
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
                disabled={!selected.every(item => item.completed)}
                variant={
                  selected.every(item => item.completed)
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
