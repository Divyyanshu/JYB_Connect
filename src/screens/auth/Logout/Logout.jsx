import React from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import {styles} from './style';
import {removeToken} from '../../../utils/shared';
import {STACKS} from '../../../utils/stacks';
import {SCREENS} from '../../../utils/screens';
import {CustomButton} from '../../../uiKit/customButton';
import {dropAllTables} from '../../../database/db';

const LogoutPage = ({navigation}) => {
  const logOut = async () => {
    dropAllTables();
    try {
      await removeToken();
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
        text2: 'You have been logged out successfully!',
      });

      setTimeout(() => {
        navigation.reset({
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
  };

  return (
    <View style={styles.container}>
      <CustomButton title={'Log out'} onPress={logOut} />
      <Toast />
    </View>
  );
};

export default LogoutPage;
