import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import renderIf from '../../utils/renderIf';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from '../../utils/colors';
import {dropAllTables} from '../../database/db';
import {clearAllAsyncStorage, removeToken} from '../../utils/shared';
import {STACKS} from '../../utils/stacks';
import {SCREENS} from '../../utils/screens';
import ConfirmationPopup from '../../uiKit/confirmPopup/confirmPopup';
const deviceWidth = Dimensions.get('window').width;

const Topbar = props => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function LogoutButtonClicked() {
    console.log('Logout Button Clicked');
    setShowLogoutConfirm(true);
  }

  function Minutes_of_meeting_popUp() {
    props.setModalVisible(true);
  }

  async function clearUserData() {
    dropAllTables();
    try {
      await removeToken();
      await clearAllAsyncStorage();
      setTimeout(() => {
        props.navState.reset({
          index: 0,
          routes: [
            {
              name: STACKS.MAIN_STACK,
              state: {
                routes: [{name: SCREENS.MAIN_STACK.LOGIN}],
              },
            },
          ],
        });
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Something went wrong. Please try again!',
      });
      console.error('Logout Error:', error);
    }
  }

  return (
    <View
      style={[
        styles.topBarStyle,
        {
          backgroundColor: COLORS.PRIMARY,
          height:
            DeviceInfo.hasNotch() == true
              ? props.isLandscape == true
                ? 70
                : 110
              : 80,
        },
      ]}>
      {renderIf(
        props.showBack == true,
        <View
          style={{
            position: 'absolute',
            left: 10,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 4,
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              props.navState.pop();
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
              }}
              resizeMode="contain"
              source={require('../../assets/icons/back.png')}
            />
          </TouchableOpacity>
        </View>,
      )}
      {renderIf(
        props.showtitle == true,
        <TouchableOpacity
          onPress={() => {
            props.navState.pop();
          }}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 10,
            width: '70%',
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'Helvetica',
              width: '95%',
              textAlign: 'center',
            }}>
            {props.title}
          </Text>
        </TouchableOpacity>,
      )}
      {renderIf(
        props.showDashboardTitle == true,
        <TouchableOpacity
          onPress={() => {
            props.navState.pop();
          }}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'center',
            bottom: 10,
            width: '100%',
            paddingLeft: 10,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'Helvetica',
              width: '95%',
              textAlign: 'left',
            }}>
            {props.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Helvetica',
              width: '100%',
              textAlign: 'left',
            }}>
            {props.username}
          </Text>
        </TouchableOpacity>,
      )}
      {renderIf(
        props.showLogout == true,
        <View
          style={{
            position: 'absolute',
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            height: 44,
          }}>
          <TouchableOpacity
            onPress={() => {
              LogoutButtonClicked();
            }}>
            <Image
              source={require('../../assets/icons/logout.png')}
              style={{margin: 10, width: 34, height: 34}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ConfirmationPopup
            visible={showLogoutConfirm}
            onConfirm={() => {
              setShowLogoutConfirm(false);
              clearUserData();
            }}
            onCancel={() => setShowLogoutConfirm(false)}
            message="Are you sure you want to logout?"
          />
        </View>,
      )}
      {renderIf(
        props.showAdd == true,
        <View
          style={{
            position: 'absolute',
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            height: 44,
          }}>
          <TouchableOpacity
            onPress={() => {
              Minutes_of_meeting_popUp();
            }}>
            <Image
              source={require('../../assets/icons/add.png')}
              style={{margin: 10, width: 34, height: 34}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBarStyle: {
    height: DeviceInfo.hasNotch() == true ? 110 : 100,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },

  topBarTextStyle: {
    fontSize: 30,
    color: '#272727',
    width: deviceWidth - 126,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 63,
  },
});

export default Topbar;
