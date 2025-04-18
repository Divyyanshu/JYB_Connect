import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {styles} from './style';
import {
  getDetailsByMainParameter,
  getDetailsValuesFromServiceAttributes,
} from '../../../database/db';
import ServiceAttributeModel from '../../../components/ServiceAttributeModel/ServiceAttributeModel';
import {CustomButton} from '../../../uiKit/customButton';
import renderIf from '../../../utils/renderIf';
import {COLORS} from '../../../utils/colors';
import Topbar from '../../../components/CommonComponents/TopBar';

var selectedRowIndex = 0;

const Attributes = ({navigation}) => {
  const route = useRoute();
  const {mainParam} = route.params;

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const fetchDetails = () => {
    getDetailsByMainParameter(mainParam, detailsList => {
      const updatedList = detailsList.map(item => ({
        ...item,
        isExpanded: false,
      }));
      setData(updatedList);
    });
  };

  useEffect(() => {
    fetchDetails();
  }, [mainParam]);

  const handleRowPress = async (item, index) => {
    if (!item.MaxObtain || item.MaxMarks < 5) {
      setHighlightedIndex(index);
      setSelectedItem(item);
      selectedRowIndex = index;
      let DefId_Data = await getDetailsValuesFromServiceAttributes(item.DefId);
      console.log('DefIdData', DefId_Data);
      setSelectedItem(DefId_Data);
      setModalVisible(true);
    }
  };

  const handleSubmit = (dataForm, rowIndex) => {
    let tempDict = {};
    let originalData = data[rowIndex];
    tempDict['Checkpoints'] = originalData.Checkpoints;
    tempDict['DefId'] = originalData.DefId;
    tempDict['MaxMarks'] = originalData.MaxMarks;
    tempDict['MaxObt'] = dataForm.marksObt;
    tempDict['SubParameters'] = originalData.SubParameters;
    tempDict['gapArea'] = dataForm.gapArea;
    tempDict['actionPlan'] = dataForm.actionPlan;
    tempDict['responsibility'] = dataForm.responsibility;
    tempDict['planClosureDate'] = dataForm.planClosureDate;
    tempDict['photo'] = dataForm.photo;

    let tempData = [...data];
    tempData[rowIndex] = tempDict;
    setData(tempData);
    setHighlightedIndex(null);
    setModalVisible(false);
    console.log('tempDict', tempDict);
  };

  const toggleEyeSelection = (item, index) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        isExpanded: !updatedData[index].isExpanded,
      };
      return updatedData;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
      <Topbar
        showBack={true}
        showtitle={true}
        title={route.params?.mainParam || 'Attributes'}
        navState={navigation}
      />
      <View style={{flex: 1, padding: 8}}>
        <FlatList
          data={data}
          extraData={[data, highlightedIndex]}
          keyExtractor={item => item.DefId.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'ios' ? 40 : 60,
          }}
          renderItem={({item, index}) => {
            const isHighlighted = highlightedIndex === index;
            const isFilled = item.MaxObt !== '';
            const backgroundColor =
              isFilled || isHighlighted
                ? COLORS.SELECTED_COLOR
                : COLORS.SCREENS_BACKGROUND;

            const wordCount = item.SubParameters?.split(' ').length || 0;
            const shouldShowToggle = wordCount > 8 && item.MaxObt === '';

            return (
              <TouchableOpacity
                onPress={() => handleRowPress(item, index)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  borderColor: 'grey',
                  backgroundColor: backgroundColor,
                }}>
                {/* Sub Parameters */}
                <View style={{flexDirection: 'column'}}>
                  <Text
                    numberOfLines={item.isExpanded == false ? 2 : 99}
                    style={[
                      styles.cell,
                      {fontWeight: '700', color: 'black', fontSize: 14},
                    ]}>
                    {item.SubParameters}
                  </Text>

                  {shouldShowToggle && (
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => toggleEyeSelection(item, index)}>
                      <Image
                        source={
                          item.isExpanded
                            ? require('../../../assets/icons/hide.png')
                            : require('../../../assets/icons/show.png')
                        }
                        style={{height: 18, width: 18}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Checkpoints */}
                <View
                  style={{
                    flexDirection: 'column',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={[
                      styles.cell,
                      {fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: 14},
                    ]}>
                    CheckPoint :
                  </Text>
                  <Text
                    style={[
                      styles.cell,
                      {fontWeight: '400', color: 'black', fontSize: 12},
                    ]}>
                    {item.Checkpoints}
                  </Text>
                </View>

                {/* Max Marks + Obtained */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{flexDirection: 'column', width: '50%'}}>
                    <Text
                      style={[
                        styles.cell,
                        {
                          fontWeight: 'bold',
                          color: COLORS.PRIMARY,
                          fontSize: 14,
                        },
                      ]}>
                      Max Marks :
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        {
                          fontWeight: '400',
                          width: '90%',
                          color: 'black',
                          fontSize: 12,
                        },
                      ]}>
                      {item.MaxMarks}
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={[
                        styles.cell,
                        {fontWeight: 'bold', color: COLORS.PRIMARY},
                      ]}>
                      Marks Obtained :
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        {
                          fontWeight: '400',
                          width: '90%',
                          color: 'black',
                          fontSize: 12,
                        },
                      ]}>
                      {isFilled ? item.MaxObt : ''}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={() => (
            <View style={styles.ButtonContainer}>
              <CustomButton title={'Back'} onPress={handleBack} />
            </View>
          )}
        />
        {renderIf(
          modalVisible === true,
          <ServiceAttributeModel
            visible={modalVisible}
            item={selectedItem}
            rowIndex={selectedRowIndex}
            onClose={() => {
              setModalVisible(false);
              setHighlightedIndex(null);
            }}
            onSubmit={handleSubmit}
          />,
        )}
      </View>
    </View>
  );
};

export default Attributes;
