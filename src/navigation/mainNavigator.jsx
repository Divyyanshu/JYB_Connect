import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../screens/auth/Login/Login';
import {SCREENS} from '../utils/screens';
import SelectDealerCode from '../screens/SelectDealerCode/SelectDealerCode';
import KeyActivities from '../screens/KeyActivities/KeyActivities';
import ServiceAttributes from '../screens/ServiceAttribute/ServiceAttribute';
import DVR_Score from '../screens/DVR_Score/DVR_Score';
import KPI_Performance from '../screens/KPI_Performance/KPI_Performance';
import ManPower_Status from '../screens/ManPowerStatus/ManPower_Status';
import ComplaintsAnalysis from '../screens/ComplaintsAnalysis/ComplaintsAnalysis';
import MinutesOfMeeting from '../screens/MinutesOfMeeting/MinutesOfMeeting';
import Attributes from '../screens/ServiceAttribute/Attributes/Attributes';
import {COLORS} from '../utils/colors';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RepeatJob_Analysis from '../screens/RepeatJob_Analysis/RepeatJob_Analysis';
import Accompanied_Dealer from '../screens/Accompanied_Dealer/Accompanied_Dealer';
import Accompanied_Company from '../screens/Accompanied_Company/Accompanied_Company';
import Dashboard from '../screens/Dashboard/Dashboard';
import {useEffect, useState} from 'react';
import {getToken} from '../utils/shared';

const Stack = createStackNavigator();

export const MainNavigator = ({navigation}) => {
  const [userToken, setToken] = useState(null);
  useEffect(() => {
    getAuthState();
  }, []);

  const getAuthState = async () => {
    let token = await getToken();
    console.log('token >>>>>', token);
    setToken(token);
  };
  if (userToken == null) {
    return (
      <Stack.Navigator
        initialRouteName={SCREENS.MAIN_STACK.LOGIN}
        screenOptions={{
          headerShown: true,
          gestureEnabled: false,
          cardStyleInterpolator: ({current, next, inverted, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        <Stack.Screen
          name={SCREENS.MAIN_STACK.LOGIN}
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.DASHBOARD}
          component={Dashboard}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Dashboard',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: null,
          })}
        />

        <Stack.Screen
          name={SCREENS.MAIN_STACK.SELECT_DEALER_CODE}
          component={SelectDealerCode}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Select Dealer Code',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.KEY_ACTIVITIES}
          component={KeyActivities}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Key Activities',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.SERVICE_ATTRIBUTES}
          component={ServiceAttributes}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Service Attributes',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ATTRIBUTES}
          component={Attributes}
          options={({route, navigation}) => ({
            title: route.params?.mainParam || 'Attributes',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    navigation.navigate(SCREENS.MAIN_STACK.DASHBOARD);
                  }
                }}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.DVR_SCORE}
          component={DVR_Score}
          options={({navigation}) => ({
            headerShown: true,
            title: 'DVR Score',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.KPI_PERFORMANCE}
          component={KPI_Performance}
          options={({navigation}) => ({
            headerShown: true,
            title: 'KPI Performance',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.MAN_POWER_STATUS}
          component={ManPower_Status}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Man Power Status',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.COMPLAINTS_ANALYSIS}
          component={ComplaintsAnalysis}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Complaints Analysis',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.REPEAT_JOB}
          component={RepeatJob_Analysis}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Repeat Job Card Analysis',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.MINUTES_OF_MEETING}
          component={MinutesOfMeeting}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Minutes Of Meeting',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 80},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ACCOMPANIED_COMPANY}
          component={Accompanied_Company}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Accompanied By Company',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ACCOMPANIED_DEALER}
          component={Accompanied_Dealer}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Accompanied By Dealer',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName={SCREENS.MAIN_STACK.DASHBOARD}
        screenOptions={{
          headerShown: true,
          gestureEnabled: false,
          cardStyleInterpolator: ({current, next, inverted, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        <Stack.Screen
          name={SCREENS.MAIN_STACK.DASHBOARD}
          component={Dashboard}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Dashboard',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: null,
          })}
        />

        <Stack.Screen
          name={SCREENS.MAIN_STACK.SELECT_DEALER_CODE}
          component={SelectDealerCode}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Select Dealer Code',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.KEY_ACTIVITIES}
          component={KeyActivities}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Key Activities',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.SERVICE_ATTRIBUTES}
          component={ServiceAttributes}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Service Attributes',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ATTRIBUTES}
          component={Attributes}
          options={({route, navigation}) => ({
            title: route.params?.mainParam || 'Attributes',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    navigation.navigate(SCREENS.MAIN_STACK.DASHBOARD);
                  }
                }}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.DVR_SCORE}
          component={DVR_Score}
          options={({navigation}) => ({
            headerShown: true,
            title: 'DVR Score',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.KPI_PERFORMANCE}
          component={KPI_Performance}
          options={({navigation}) => ({
            headerShown: true,
            title: 'KPI Performance',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.MAN_POWER_STATUS}
          component={ManPower_Status}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Man Power Status',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.COMPLAINTS_ANALYSIS}
          component={ComplaintsAnalysis}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Complaints Analysis',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.REPEAT_JOB}
          component={RepeatJob_Analysis}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Repeat Job Card Analysis',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.MINUTES_OF_MEETING}
          component={MinutesOfMeeting}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Minutes Of Meeting',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 80},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ACCOMPANIED_COMPANY}
          component={Accompanied_Company}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Accompanied By Company',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.ACCOMPANIED_DEALER}
          component={Accompanied_Dealer}
          options={({navigation}) => ({
            headerShown: true,
            title: 'Accompanied By Dealer',
            headerStyle: {backgroundColor: COLORS.PRIMARY, height: 100},
            headerTitleStyle: {color: COLORS.WHITE},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrow-back" size={32} color={COLORS.WHITE} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={SCREENS.MAIN_STACK.LOGIN}
          component={LoginPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};
