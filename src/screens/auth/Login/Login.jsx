import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {TextInput as PaperInput} from 'react-native-paper';
import {getEmail, saveEmail, saveToken} from '../../../utils/shared';
import {COLORS} from '../../../utils/colors';
import {STACKS} from '../../../utils/stacks';
import {styles} from './style';
import {CustomButton} from '../../../uiKit/customButton';
import {SCREENS} from '../../../utils/screens';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const validationStatus = validateForm();
    if (validationStatus == true) {
      setLoading(true);

      try {
        const response = await axios.post(
          'http://198.38.81.7/jawadvrapi/token',
          new URLSearchParams({
            UserName: email,
            password: password,
            grant_type: 'password',
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        console.log('Login api response >>>>>', response);
        if (response.status == 200) {
          const token = response.data.access_token;
          await saveToken(token);
          await saveEmail(email);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Login Successful!',
          });

          setTimeout(() => {
            navigation.navigate(SCREENS.MAIN_STACK.DASHBOARD);
          }, 1500);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Server Error. Please try again!',
          });
        }
      } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials or server error!',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      alert('Please enter Email address.');
      return false;
    }
    if (!password.trim()) {
      alert('Please enter Password.');
      return false;
    }

    // if (!emailRegex.test(email)) {
    //   alert('Please enter a valid email address.');
    //   return false;
    // }

    return true;
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View
          style={{
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/images/Login_icon.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Text style={styles.Subtitle}>Sign In</Text>
        <View style={styles.inputBoxContainer}>
          <PaperInput
            label="User Name"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="default"
            style={{width: '100%', backgroundColor: '#fff'}}
            theme={{colors: {primary: COLORS.PRIMARY}}}
          />
          <PaperInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            mode="outlined"
            style={{width: '100%', backgroundColor: '#fff'}}
            right={
              <PaperInput.Icon
                icon={secureText ? 'eye-off' : 'eye'}
                onPress={() => setSecureText(!secureText)}
              />
            }
            theme={{colors: {primary: COLORS.PRIMARY}}}
          />
        </View>

        <CustomButton
          title={loading ? <ActivityIndicator color="white" /> : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
      </ScrollView>
      <Toast />
    </>
  );
};

export default LoginPage;
