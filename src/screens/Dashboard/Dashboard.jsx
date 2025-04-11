import React, {useState, useEffect} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import {styles} from './style';
import CustomCard from '../../uiKit/customCard';
import CustomModal from '../../components/DashboardModel/dashboardModel';
import {
  db,
  createTable,
  insertRecord,
  fetchRecords,
  create_KPI_Performance_Table,
  createManPowerAvailability,
  createCompanyTable,
  createDealerTable,
} from '../../database/db';
import CustomAlert from '../../uiKit/customAlert/customAlert';

const {width} = Dimensions.get('window');

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [alertData, setAlertData] = useState({title: '', message: ''});
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const showAlert = (title, message) => {
    setAlertData({title, message});
    setAlertVisible(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://198.38.81.7/jawadvrapi/api/Dealer/ApiforServiceAttribute',
      );

      if (response.data && response.data.Data) {
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
        fetchRecords();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showAlert('Error', 'Failed to fetch data from server.');
    }
  };

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

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setWasOffline(true);
        showAlert('No Internet', 'Please check your network connection.');
      } else {
        if (wasOffline) {
          setIsSnackbarVisible(true);
          setWasOffline(false);
        }
        fetchData();
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
    <View
      style={[
        styles.container,
        {padding: width * 0.05, alignItems: 'center', justifyContent: 'center'},
      ]}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />

      {/* <CustomCard
        centerName="Sales"
        imageSource={require('../../assets/icons/sales.png')}
        onPress={() =>
          showAlert('Coming Soon 🚀', 'Sales feature is under development.')
        }
      /> */}

      <CustomCard
        centerName="Service"
        imageSource={require('../../assets/icons/service.png')}
        onPress={() => handleCardPress('service')}
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

      {/* Snackbar on reconnect */}
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
