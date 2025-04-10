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
import {saveToken} from '../../../utils/shared';
import {COLORS} from '../../../utils/colors';
import {STACKS} from '../../../utils/stacks';
import {styles} from './style';
import {CustomButton} from '../../../uiKit/customButton';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('p.vishnu3@classiclegends.com');
  const [password, setPassword] = useState('123@');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Both fields are required!');
      return;
    }

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

      const token = response.data.access_token;
      await saveToken(token);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login Successful!',
      });

      setTimeout(() => {
        navigation.replace(STACKS.DRAWER_STACK);
      }, 1500);
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
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View
          style={{
            // marginTop: 40,
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
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
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
