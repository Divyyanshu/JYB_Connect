import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  TextInput,
  Button,
  Card,
  Text,
  Modal,
  Portal,
  Provider,
  FAB,
} from 'react-native-paper';
import {styles} from './style';
import {COLORS} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../../database/db';

const postOptions = [
  {label: 'Dealer Principle', value: 'Dealer Principle'},
  {label: 'General Manager', value: 'General Manager'},
  {label: 'Service Manager', value: 'Service Manager'},
  {label: 'Sales Manager', value: 'Sales Manager'},
];

const AccompaniedByDealer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dealerList, setDealerList] = useState([]);

  useEffect(() => {
    fetchDealerData();
  }, []);

  const insertDealerData = () => {
    if (!post || !name || !mobile) {
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO AccompaniedBy (post, name, mobile) VALUES (?, ?, ?);',
        [post, name, mobile],
        () => {
          fetchDealerData();
          resetDealerForm();
        },
      );
    });
  };

  const fetchDealerData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM AccompaniedBy;', [], (tx, results) => {
        const rows = results.rows;
        let temp = [];

        for (let i = 0; i < rows.length; i++) {
          temp.push(rows.item(i));
        }
        setDealerList(temp);
      });
    });
  };

  const resetDealerForm = () => {
    setPost('');
    setName('');
    setMobile('');
    setModalVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        {dealerList.length === 0 ? (
          <>
            <Text
              variant="titleLarge"
              style={{
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Dealer
            </Text>
            <Dropdown
              style={styles.dropdown}
              data={postOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Post"
              value={post}
              onChange={item => setPost(item.value)}
            />
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />
            <TextInput
              label="Mobile"
              value={mobile}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
                setMobile(cleaned);
              }}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />

            <Button
              mode="contained"
              onPress={insertDealerData}
              style={{marginTop: 10}}
              buttonColor={COLORS.PRIMARY}>
              Submit
            </Button>
          </>
        ) : (
          <>
            <FlatList
              data={dealerList}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Card style={styles.card}>
                  <Card.Content>
                    <Text variant="titleMedium">Post: {item.post}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Mobile: {item.mobile}</Text>
                  </Card.Content>
                </Card>
              )}
            />
            <FAB
              icon="plus"
              color="white"
              style={styles.fab}
              onPress={() => setModalVisible(true)}
            />
          </>
        )}

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={resetDealerForm}
            contentContainerStyle={styles.modal}>
            <Text
              variant="titleLarge"
              style={{
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Accompanied By
            </Text>

            <Dropdown
              style={styles.dropdown}
              data={postOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Post"
              value={post}
              onChange={item => setPost(item.value)}
            />
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />
            <TextInput
              label="Mobile"
              value={mobile}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
                setMobile(cleaned);
              }}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor={COLORS.PRIMARY}
            />

            <Button
              mode="contained"
              onPress={insertDealerData}
              style={{marginTop: 10}}
              buttonColor={COLORS.PRIMARY}>
              Submit
            </Button>

            <Button
              onPress={resetDealerForm}
              textColor="red"
              style={{marginTop: 5}}
              icon={({size, color}) => (
                <Icon name="close" size={24} color={color} />
              )}>
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default AccompaniedByDealer;
