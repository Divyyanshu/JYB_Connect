// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import {styles} from './style';
// import KPI_Action_Pop_up from '../../components/KPI_Action_Pop_up/KPI_Action_Pop_up';
// import {
//   fetchDataManPowerAvailability,
//   updateKPIPerformanceData,
// } from '../../database/db';
// import ManPowerModal from '../../components/Manpower_Popup/Manpower_Popup';

// const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

// const ManpowerAvailabilityScreen = ({navigation}) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visible, setVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [refresh, setRefresh] = useState(false);

//   const currentDate = new Date();
//   const totalDaysInMonth = getDaysInMonth(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//   );
//   const currentDay = currentDate.getDate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         fetchDataManPowerAvailability(dbData => {
//           setData(dbData);
//           console.log('data for man power table >>>', data);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error('Error fetching Manpower Data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//     const unsubscribe = navigation.addListener('focus', fetchData);
//     return unsubscribe;
//   }, [navigation, refresh]);

//   const handleActionPlanModel = item => {
//     setSelectedItem(item);
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//     setSelectedItem(null);
//   };

//   const handleSubmit = async dataForm => {
//     try {
//       updateKPIPerformanceData(
//         dataForm.parameter,
//         dataForm.mtd_plan,
//         dataForm.mtd_actual,
//         dataForm.percentage_achieve,
//         dataForm.gap_area,
//         dataForm.counter_measure_plan,
//         dataForm.responsibility,
//         dataForm.plan_closure_date,
//         dataForm.image_path,
//       );
//       setRefresh(!refresh);
//       onClose();
//     } catch (error) {
//       console.error('Error updating data:', error);
//     } finally {
//       onClose();
//     }
//   };

//   const renderItem = ({item}) => {
//     const mtdPlan = (
//       (parseFloat(item.month_plan) / totalDaysInMonth) *
//       currentDay
//     ).toFixed(2);
//     return (
//       <TouchableOpacity
//         onPress={() => handleActionPlanModel({...item, mtd_plan: mtdPlan})}>
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Roles</Text>
//               <Text style={styles.text}>{item.type}</Text>
//             </View>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Min. Required</Text>
//               <Text style={styles.text}>{item.value}</Text>
//             </View>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Available</Text>
//               <Text style={styles.text}>{item.available || 'NA'}</Text>
//             </View>
//           </View>
//           <View style={styles.row}>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Trained</Text>
//               <Text style={styles.text}>{item.trained || 'NA'}</Text>
//             </View>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Available %</Text>
//               <Text style={styles.text}>
//                 {item.available_percentage || 'NA'}
//               </Text>
//             </View>
//             <View style={styles.cell}>
//               <Text style={styles.header}>Trained %</Text>
//               <Text style={styles.text}>{item.trained_percentage || 'NA'}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <Text>Loading...</Text>
//         </View>
//       ) : (
//         <SafeAreaView style={{flex: 1}}>
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item, index) =>
//               item.id?.toString() || index.toString()
//             }
//             contentContainerStyle={{
//               flexGrow: 1,
//               paddingBottom: Platform.OS === 'ios' ? 40 : 60,
//             }}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           />
//         </SafeAreaView>
//       )}
//       {visible && selectedItem && (
//         <ManPowerModal
//           visible={visible}
//           onClose={onClose}
//           item={selectedItem}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </View>
//   );
// };

// export default ManpowerAvailabilityScreen;
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import {styles} from './style';
// import {
//   fetchDataManPowerAvailability,
//   updateKPIPerformanceData,
//   updateManPowerAvailabilityData,
// } from '../../database/db';
// import ManPowerModal from '../../components/Manpower_Popup/Manpower_Popup';

// const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

// const ManpowerAvailabilityScreen = ({navigation}) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visible, setVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [refresh, setRefresh] = useState(false);

//   const currentDate = new Date();
//   const totalDaysInMonth = getDaysInMonth(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//   );
//   const currentDay = currentDate.getDate();

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       fetchDataManPowerAvailability(dbData => {
//         console.log('Fetched data from DB:', dbData);
//         setData(dbData);
//       });
//     } catch (error) {
//       console.error('Error fetching Manpower Data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const unsubscribe = navigation.addListener('focus', fetchData);
//     return unsubscribe;
//   }, [navigation, refresh]);

//   useEffect(() => {
//     if (data.length > 0) {
//       console.log('Updated data state:', data);
//     }
//   }, [data]);

//   const handleActionPlanModel = item => {
//     const mtdPlan = (
//       (parseFloat(item.month_plan) / totalDaysInMonth) *
//       currentDay
//     ).toFixed(2);
//     setSelectedItem({...item, mtd_plan: mtdPlan});
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//     setSelectedItem(null);
//   };

//   const handleSubmit = async dataForm => {
//     try {
//       await updateManPowerAvailabilityData({
//         parameter: dataForm.parameter,
//         available: dataForm.available,
//         trained: dataForm.trained,
//         available_percentage: dataForm.available_percentage,
//         trained_percentage: dataForm.trained_percentage,
//         gap_area: dataForm.gap_area,
//         counter_measure_plan: dataForm.counter_measure_plan,
//         responsibility: dataForm.responsibility,
//         plan_closure_date: dataForm.plan_closure_date,
//         image_path: dataForm.image_path,
//       });

//       // Refresh screen
//       setRefresh(prev => !prev);
//     } catch (error) {
//       console.error('Error updating data:', error);
//     } finally {
//       onClose(); // modal close
//     }
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity onPress={() => handleActionPlanModel(item)}>
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Roles</Text>
//             <Text style={styles.text}>{item.type}</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Min. Required</Text>
//             <Text style={styles.text}>{item.value}</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Available</Text>
//             <Text style={styles.text}>{item.available || 'NA'}</Text>
//           </View>
//         </View>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Trained</Text>
//             <Text style={styles.text}>{item.trained || 'NA'}</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Available %</Text>
//             <Text style={styles.text}>{item.available_percentage || 'NA'}</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.header}>Trained %</Text>
//             <Text style={styles.text}>{item.trained_percentage || 'NA'}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <Text>Loading...</Text>
//         </View>
//       ) : (
//         <SafeAreaView style={{flex: 1}}>
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item, index) =>
//               item.id?.toString() || index.toString()
//             }
//             contentContainerStyle={{
//               flexGrow: 1,
//               paddingBottom: Platform.OS === 'ios' ? 40 : 60,
//             }}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           />
//         </SafeAreaView>
//       )}
//       {visible && selectedItem && (
//         <ManPowerModal
//           visible={visible}
//           onClose={onClose}
//           item={selectedItem}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </View>
//   );
// };

// export default ManpowerAvailabilityScreen;
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
        console.log('Fetched data from DB:', dbData);
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
        parameter: dataForm.parameter,
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

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleActionPlanModel(item)}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.header}>Roles</Text>
            <Text style={styles.text}>{item.type}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header}>Min. Required</Text>
            <Text style={styles.text}>{item.value}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header}>Available</Text>
            <Text style={styles.text}>{item.available || 'NA'}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.header}>Trained</Text>
            <Text style={styles.text}>{item.trained || 'NA'}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header}>Available %</Text>
            <Text style={styles.text}>{item.available_percentage || 'NA'}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header}>Trained %</Text>
            <Text style={styles.text}>{item.trained_percentage || 'NA'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.parameter || index.toString()}
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
