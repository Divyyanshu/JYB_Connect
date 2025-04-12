import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {getToken} from '../utils/shared';
import {STACKS} from '../utils/stacks';
import {COLORS} from '../utils/colors';

const {height} = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await getToken();

        setTimeout(() => {
          SplashScreen.hide();
          if (token) {
            navigation.replace(STACKS.MAIN_STACK);
          } else {
            navigation.replace(STACKS.MAIN_STACK);
          }
        }, 4000);
      } catch (err) {
        console.error('Splash token check error:', err);
        SplashScreen.hide();
        navigation.replace(STACKS.MAIN_STACK);
      }
    };

    checkTokenAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />
      <View style={styles.contentContainer}>
        <Text style={styles.appText}>{'JYB Connect'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.OFF_WHITE,
    textAlign: 'center',
    fontFamily: 'Aptos-Black',
    marginTop: height * 0.05,
  },
});

export default Splash;
