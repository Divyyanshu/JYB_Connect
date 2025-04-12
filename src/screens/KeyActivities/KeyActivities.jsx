import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import {styles} from './style';
import {CustomButton} from '../../uiKit/customButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import {STACKS} from '../../utils/stacks';
import {COLORS} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../../uiKit/customAlert/customAlert';

const activities = [
  {id: '1', title: 'Service Attributes', completed: true},
  {id: '2', title: 'KPI Performance', completed: true},
  {id: '3', title: 'DVR Score', completed: true},
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

  const toggleSelection = id => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const screenName = screenMapping[id];
      if (screenName) {
        navigation.navigate(STACKS.MAIN_STACK, {screen: screenName});
      }

      setSelected(prev =>
        prev.map(item =>
          item.id === id ? {...item, completed: !item.completed} : item,
        ),
      );
    }, 1200);
  };

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
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
        </SafeAreaView>
      )}
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
