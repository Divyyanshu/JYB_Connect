import React, {useState, useEffect} from 'react';
import {View, Dimensions, StatusBar, BackHandler, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import {styles} from './style';
import CustomCard from '../../uiKit/customCard';
import CustomModal from '../../components/DashboardModel/dashboardModel';
import {
  createTable,
  create_KPI_Performance_Table,
  createManPowerAvailability,
  createCompanyTable,
  createDealerTable,
  createRepeatCardTable,
  createTableComplaintAnalysis,
  createTableMomManuallyTable,
} from '../../database/db';
import CustomAlert from '../../uiKit/customAlert/customAlert';
import {useFocusEffect} from '@react-navigation/native';
import Topbar from '../../components/CommonComponents/TopBar';
import {getEmail} from '../../utils/shared';
import ConfirmationPopup from '../../uiKit/confirmPopup/confirmPopup';

const {width} = Dimensions.get('window');

const Dashboard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [alertData, setAlertData] = useState({title: '', message: ''});
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [username, setUsername] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deviceHeight = Dimensions.get('window').height;

  console.log('deviceHeight>>>>>>', deviceHeight);

  const showAlert = (title, message) => {
    setAlertData({title, message});
    setAlertVisible(true);
  };
  const showExitConfirmation = () => {
    setIsModalVisible(true);
  };

  const handleExitConfirm = () => {
    BackHandler.exitApp();
    setIsModalVisible(false);
  };

  const handleExitCancel = () => {
    setIsModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        showExitConfirmation();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getEmail();
      setUsername(email);
    };

    fetchEmail();
  }, []);
  useEffect(() => {
    createTable();
    console.log('createTable');
    create_KPI_Performance_Table();
    console.log('create_KPI_Performance_Table');
    createManPowerAvailability();
    console.log('createManPowerAvailability');
    createCompanyTable();
    console.log('createCompanyTable');
    createDealerTable();
    console.log('createDealerTable');
    createRepeatCardTable();
    console.log('createRepeatCardTable');
    createTableComplaintAnalysis();
    console.log('createTableComplaintAnalysis');
    createTableMomManuallyTable();
    console.log('createTableMomManuallyTable');

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setWasOffline(true);
        showAlert('No Internet', 'Please check your network connection.');
      } else {
        if (wasOffline) {
          setIsSnackbarVisible(true);
          setWasOffline(false);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCardPress = type => {
    console.log('card pressed');
    setModalType(type);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
      <Topbar
        showBack={false}
        showDashboardTitle={true}
        showLogout={true}
        username={username}
        title={'Dashboard'}
        navState={navigation}
      />
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          // height:
          //   deviceHeight - (DeviceInfo.hasNotch() == true ? 110 * 2 : 80 * 2),
          justifyContent: 'center',
        }}>
        <CustomCard
          centerName="Service"
          imageSource={require('../../assets/icons/service.png')}
          onPress={() => handleCardPress('service')}
        />
        <ConfirmationPopup
          visible={isModalVisible}
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
          message="Are you sure you want to exit the app?"
          title="Confirm!"
        />
        <CustomAlert
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          title={alertData.title}
          message={alertData.message}
        />

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          modalType={modalType}
        />
      </View>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={3000}
        style={{backgroundColor: '#4CAF50'}}>
        Internet reconnected!
      </Snackbar>
    </View>
  );
};

export default Dashboard;
