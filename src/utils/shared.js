import AsyncStorage from '@react-native-async-storage/async-storage';

// Save Token
export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Token Saved Successfully');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Get Token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ? token : null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Remove Token (Logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Token Removed Successfully');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
