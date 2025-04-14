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
  {label: 'Service Head', value: 'Service Head'},
  {label: 'Sales Head', value: 'Sales Head'},
  {label: 'Service Regional Manager', value: 'Service Regional Manager'},
  {label: 'Sales Regional Manager', value: 'Sales Regional Manager'},
];

const AccompaniedByCompany = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);
  const insertCompanyData = () => {
    if (!post || !name || !mobile) return;

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO AccompaniedByCompany (post, name, mobile) VALUES (?, ?, ?);',
        [post, name, mobile],
        () => {
          fetchCompanyData();
          resetCompanyForm();
        },
      );
    });
  };

  const fetchCompanyData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM AccompaniedByCompany;',
        [],
        (tx, results) => {
          const rows = results.rows;
          let temp = [];
          for (let i = 0; i < rows.length; i++) {
            temp.push(rows.item(i));
          }
          setList(temp);
        },
      );
    });
  };

  const resetCompanyForm = () => {
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
        title={'Company Representative'}
        navState={navigation}
      />
      <View style={styles.container}>
        {list.length === 0 ? (
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
              onPress={insertCompanyData}
              style={{marginTop: 10}}
              buttonColor={COLORS.PRIMARY}>
              Submit
            </Button>
          </>
        ) : (
          <>
            <View style={styles.container}>
              <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.card}>
                    {/* Individual Card Header */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>Post</Text>
                      <Text style={styles.cardHeaderText}>Name</Text>
                      <Text style={styles.cardHeaderText}>Mobile</Text>
                    </View>

                    {/* Card Content */}
                    <View style={styles.row}>
                      <Text style={styles.cellText}>{item.post}</Text>
                      <Text style={styles.cellText}>{item.name}</Text>
                      <Text style={styles.cellText}>{item.mobile}</Text>
                    </View>
                  </View>
                )}
              />

              <TouchableOpacity style={styles.fab}>
                <Icon name="plus" color="#fff" size={24} />
              </TouchableOpacity>
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
            onDismiss={resetCompanyForm}
            contentContainerStyle={styles.modal}>
            <Text
              variant="titleLarge"
              style={{
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Company
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
              onPress={insertCompanyData}
              style={{marginTop: 10}}
              buttonColor={COLORS.PRIMARY}>
              Submit
            </Button>

            <Button
              onPress={resetCompanyForm}
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

export default AccompaniedByCompany;
