import {createDrawerNavigator} from '@react-navigation/drawer';
import LogoutPage from '../screens/auth/Logout/Logout';
import {SCREENS} from '../utils/screens';
import Dashboard from '../screens/Dashboard/Dashboard';
import {COLORS} from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const Drawer = createDrawerNavigator();

//  HomeScreen Drawer Navigation
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        drawerStyle: {backgroundColor: 'white', width: 250},
        drawerLabelStyle: {
          fontSize: 16,
          color: COLORS.PRIMARY,
        },
        headerShown: true,
        headerStyle: {backgroundColor: '#A6192E', height: 100},
        headerTitleStyle: {color: 'white'},
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{paddingLeft: 20, paddingRight: 10}}>
            <Icon name="menu" size={32} color="white" />
            here
          </TouchableOpacity>
        ),
      })}>
      <Drawer.Screen
        name={SCREENS.DRAWER_STACK.DASHBOARD}
        component={Dashboard}
        options={{
          drawerIcon: ({size}) => (
            <Icon name="home" size={size} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.DRAWER_STACK.LOGOUT}
        component={LogoutPage}
        options={{
          drawerIcon: ({size}) => (
            <Icon name="log-out" size={size} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
