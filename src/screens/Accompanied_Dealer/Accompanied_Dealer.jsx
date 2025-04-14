import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
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
import Topbar from '../../components/CommonComponents/TopBar';

const postOptions = [
  {label: 'Dealer Principle', value: 'Dealer Principle'},
  {label: 'General Manager', value: 'General Manager'},
  {label: 'Service Manager', value: 'Service Manager'},
  {label: 'Sales Manager', value: 'Sales Manager'},
];

const AccompaniedByDealer = ({navigation}) => {
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
        'INSERT INTO AccompaniedByDealer (post, name, mobile) VALUES (?, ?, ?);',
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
      tx.executeSql('SELECT * FROM AccompaniedByDealer;', [], (tx, results) => {
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
      <Topbar
        showBack={true}
        showtitle={true}
        title={'Dealer Representative'}
        navState={navigation}
      />
      <View style={styles.container}>
        {dealerList.length === 0 ? (
          <>
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
            <View style={styles.containerTable}>
              <FlatList
                data={dealerList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Post</Text>
                      <Text style={styles.cardHeaderText}>Name</Text>
                      <Text style={styles.cardHeaderText}>Mobile</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cellText}>{item.post}</Text>
                      <Text style={styles.cellText}>{item.name}</Text>
                      <Text style={styles.cellText}>{item.mobile}</Text>
                    </View>
                  </View>
                )}
              />
            </View>

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
            {/* Title */}
            <Text
              variant="titleLarge"
              style={{
                paddingVertical: 14,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              Dealer Representative
            </Text>

            {/* Form Container */}
            <View
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
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

              {/* Buttons */}
              <View
                style={{
                  marginTop: 10,
                  gap: 10,
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <Button
                  mode="contained"
                  onPress={insertDealerData}
                  style={{marginRight: 5}}
                  buttonColor={COLORS.PRIMARY}>
                  Submit
                </Button>

                <Button
                  mode="outlined"
                  onPress={resetDealerForm}
                  style={{marginLeft: 5, borderColor: COLORS.PRIMARY}}
                  textColor={COLORS.PRIMARY}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default AccompaniedByDealer;
