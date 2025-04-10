import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {TextInput, Button, DataTable, Text} from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'repeatCard.db'});

const RepeatJobCardScreen = () => {
  const [repeatCard, setRepeatCard] = useState('');
  const [repeatPercent, setRepeatPercent] = useState('');
  const [mtdServiceVisit, setMtdServiceVisit] = useState(5);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS RepeatCard (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          card_no INTEGER,
          card_percent TEXT
        );`,
      );
    });

    fetchMTDServiceVisit();
  }, []);

  useEffect(() => {
    if (repeatCard && mtdServiceVisit) {
      const percent = (
        (parseInt(repeatCard) / parseInt(mtdServiceVisit)) *
        100
      ).toFixed(2);
      setRepeatPercent(percent.toString());
    }
  }, [repeatCard, mtdServiceVisit]);

  const fetchMTDServiceVisit = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM KPI_PERFORMANCE WHERE parameter = ?`,
        ['Service Visit'],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            const serviceVisit = resultSet.rows.item(0);
            setMtdServiceVisit(serviceVisit.mtd_actual);
          }
        },
        error => console.error('Fetch MTD error:', error),
      );
    });
  };

  const handleSubmit = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO RepeatCard (card_no, card_percent) VALUES (?, ?);`,
        [repeatCard, repeatPercent],
        () => {
          setRepeatCard('');
          setRepeatPercent('');
          fetchData();
          setShowTable(true);
        },
        error => {
          console.log('Insert error:', error);
        },
      );
    });
  };

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM RepeatCard`, [], (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        setData(rows);
      });
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Repeat Job Card Entry
      </Text>

      <TextInput
        label="Nos. of Repeat Job Card"
        value={repeatCard}
        onChangeText={text => setRepeatCard(text.replace(/[^0-9]/g, ''))}
        mode="outlined"
        keyboardType="numeric"
        style={{marginBottom: 10}}
      />

      <TextInput
        label="Repeat Job Card %"
        value={repeatPercent}
        mode="outlined"
        disabled
        style={{marginBottom: 20, backgroundColor: '#f1f1f1'}}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        buttonColor="#b3002d"
        textColor="white"
        disabled={!repeatCard || !repeatPercent}>
        Submit
      </Button>

      {showTable && (
        <DataTable style={{marginTop: 30}}>
          <DataTable.Header>
            <DataTable.Title>Repeat Job Card Nos.</DataTable.Title>
            <DataTable.Title>Repeat Job Card %</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <DataTable.Row>
                <DataTable.Cell>{item.card_no}</DataTable.Cell>
                <DataTable.Cell>{item.card_percent}%</DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      )}
    </View>
  );
};

export default RepeatJobCardScreen;
