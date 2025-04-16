import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../../components/CommonComponents/TopBar';
import {styles} from './style';
import {COLORS} from '../../utils/colors';
import {db} from '../../database/db';

const RepeatJobCardScreen = ({navigation}) => {
  const [repeatCard, setRepeatCard] = useState('');
  const [repeatPercent, setRepeatPercent] = useState('');
  const [mtdServiceVisit, setMtdServiceVisit] = useState(0);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    getMTDFromAsyncStorage();
    fetchData();
  }, []);

  useEffect(() => {
    if (repeatCard && mtdServiceVisit) {
      const percent = (
        (parseInt(repeatCard) / parseFloat(mtdServiceVisit)) *
        100
      ).toFixed(2);
      setRepeatPercent(percent.toString());
    }
  }, [repeatCard, mtdServiceVisit]);

  const getMTDFromAsyncStorage = async () => {
    try {
      const storedMTD = await AsyncStorage.getItem('MTD_SERVICE_VISIT');
      if (storedMTD) {
        setMtdServiceVisit(parseFloat(storedMTD));
        console.log('MTD_SERVICE_VISIT from AsyncStorage:', storedMTD);
      } else {
        console.warn('MTD_SERVICE_VISIT not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error reading MTD_SERVICE_VISIT:', error);
    }
  };

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM RepeatCard`, [], (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        setData(rows);
        setShowTable(rows.length > 0);
      });
    });
  };

  const handleSubmit = () => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM RepeatCard`, [], () => {
        tx.executeSql(
          `INSERT INTO RepeatCard (card_no, card_percent) VALUES (?, ?);`,
          [repeatCard, repeatPercent],
          () => {
            setRepeatCard('');
            setRepeatPercent('');
            fetchData();
          },
          error => {
            console.log('Insert error:', error);
          },
        );
      });
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Topbar
        showBack={true}
        showtitle={true}
        title={'Repeat Job Analysis'}
        navState={navigation}
      />
      <View style={styles.container}>
        {showTable && (
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: COLORS.DISABLE,
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.LIGHT_PRIMARY,
              }}>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  borderRightWidth: 1,
                  borderColor: '#fdd',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: COLORS.PRIMARY,
                  }}>
                  Repeat Job Card Nos.
                </Text>
              </View>
              <View style={{flex: 1, padding: 10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: COLORS.PRIMARY,
                  }}>
                  Repeat Job Card %
                </Text>
              </View>
            </View>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                      borderRightWidth: 0.5,
                      borderColor: COLORS.DISABLE,
                    }}>
                    <Text style={{textAlign: 'center'}}>{item.card_no}</Text>
                  </View>
                  <View style={{flex: 1, padding: 10}}>
                    <Text style={{textAlign: 'center'}}>
                      {item.card_percent}%
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        <TextInput
          label="Nos. of Repeat Job Card"
          value={repeatCard}
          onChangeText={text => setRepeatCard(text.replace(/[^0-9]/g, ''))}
          mode="outlined"
          keyboardType="numeric"
          style={{marginBottom: 10, backgroundColor: 'white'}}
          outlineColor="#999"
          activeOutlineColor={COLORS.PRIMARY}
        />
        <TextInput
          label="Repeat Job Card %"
          value={repeatPercent}
          mode="outlined"
          disabled
          style={{marginBottom: 20, backgroundColor: '#f1f1f1'}}
        />

        {repeatPercent !== '' && (
          <View style={{alignSelf: 'center'}}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              buttonColor="#b3002d"
              textColor="white"
              disabled={!repeatCard || !repeatPercent}>
              Submit
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default RepeatJobCardScreen;
