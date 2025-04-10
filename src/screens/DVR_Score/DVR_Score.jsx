import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StatusBar} from 'react-native';
import {styles} from './style';
import {getDvrScoreData} from '../../database/db';

const DVRScoreScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDvrScoreData();
      if (response && response.length > 0) {
        const formattedData = response.map((item, index) => ({
          id: index.toString(),
          area: item.MainParameter,
          maxMarks: item.TotalMaxMarks,
          obtainedMarks: item.TotalMaxObt ?? '',
          percentage:
            item.TotalMaxMarks > 0
              ? ((item.TotalMaxObt / item.TotalMaxMarks) * 100).toFixed(2) + '%'
              : '0%',
        }));
        setData(formattedData);
      } else {
        console.warn('No data available!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotals = () => {
    const totalMaxMarks = data.reduce(
      (sum, item) => sum + (parseFloat(item.maxMarks) || 0),
      0,
    );
    const totalObtainedMarks = data.reduce(
      (sum, item) => sum + (parseFloat(item.obtainedMarks) || 0),
      0,
    );
    const totalPercentage =
      totalMaxMarks > 0
        ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2) + '%'
        : '0%';

    return {totalMaxMarks, totalObtainedMarks, totalPercentage};
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A6192E" />
      <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          {['Area', 'Max Marks', 'Marks Obtained', '% Achieved'].map(
            (header, index) => (
              <Text key={index} style={styles.headerCell}>
                {header}
              </Text>
            ),
          )}
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.cellHeader}>{item.area}</Text>
              <Text style={styles.cell}>{item.maxMarks}</Text>
              <Text style={styles.cell}>{item.obtainedMarks}</Text>
              <Text style={styles.cell}>{item.percentage}</Text>
            </View>
          )}
          ListFooterComponent={() => {
            const totals = calculateTotals();
            return (
              <View style={[styles.row, styles.totalRow]}>
                <Text style={[styles.cellTotalHeader, styles.totalText]}>
                  Total
                </Text>
                <Text style={[styles.cellTotalHeader, styles.totalText]}>
                  {totals.totalMaxMarks}
                </Text>
                <Text style={[styles.cellTotalHeader, styles.totalText]}>
                  {totals.totalObtainedMarks}
                </Text>
                <Text style={[styles.cellTotalHeader, styles.totalText]}>
                  {totals.totalPercentage}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DVRScoreScreen;
