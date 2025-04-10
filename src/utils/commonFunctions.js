import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveLocalData = async (key, setFunction) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data && setFunction) {
      setFunction(previousData => ({...previousData, ...JSON.parse(data)}));
    }
  } catch (error) {
    console.error('Error fetching local data:', error);
  }
};

export const saveDataToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved to local DB (${key}):`, data);
  } catch (error) {
    console.error(`Error saving to local DB (${key}):`, error);
    Alert.alert('Error', 'Failed to save data.');
  }
};

export function getFormData(data) {
  let formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) === true) {
      for (var i = 0; i < value.length; i++)
        formData.append(`${key}`, value[i]);
    } else formData.append(`${key}`, value);
  }
  return formData;
}
