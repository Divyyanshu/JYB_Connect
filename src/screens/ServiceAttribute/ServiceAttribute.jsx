import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import {styles} from './style';
import {
  getDetailsByMainParameter,
  getDetailsByMaxObtain,
  getGroupedMainParameters,
} from '../../database/db';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/screens';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../../components/CommonComponents/TopBar';

const ServiceAttributes = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  useEffect(() => {
    const unsubscribe2 = navigation.addListener('focus', () => {
      console.log('focus revived');
      const fetchData = async () => {
        try {
          const response = await getGroupedMainParameters();
          if (response) {
            var tempData = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              let dict = {};
              let Saved_status = await check_If_All_Filled(element);
              if (Saved_status == true) {
                dict['status'] = true;
              } else {
                dict['status'] = false;
              }
              dict['name'] = element;
              tempData.push(dict);
            }
            console.log('tempData', tempData);
            setData(tempData);
          } else {
            console.warn('Data is undefined or empty!');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    });
    return unsubscribe2;
  }, [navigation]);

  const check_If_All_Filled = async item => {
    let itemRowData = await getDetailsByMaxObtain(item);
    if (itemRowData.length > 0) {
      return false;
    }
    return true;
  };

  const handleNavigator = mainParam => {
    console.log('mainParam >>>', mainParam);
    navigation.navigate(SCREENS.MAIN_STACK.ATTRIBUTES, {mainParam});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
      <Topbar
        showBack={true}
        showtitle={true}
        title={"Service Attributes"}
        navState={navigation}
      />
      <View style={{padding:16}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.serviceAttributeCard}
              onPress={() => handleNavigator(item.name)}>
              <Text style={styles.cardText}>{item.name}</Text>
              {item.status == true && (
                <Image
                  source={require('../../assets/icons/tick.png')}
                  style={{width: 32, height: 32}}
                />
              )}
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
      </View>

    </View>
  );
};

export default ServiceAttributes;
