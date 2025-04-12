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

export const saveDealerCode = async dealerCode => {
  try {
    await AsyncStorage.setItem('dealerCode', dealerCode);
    console.log('dealerCode Saved Successfully');
  } catch (error) {
    console.error('Error saving dealerCode:', error);
  }
};

// Get Token
export const getDealerCode = async () => {
  try {
    const dealerCode = await AsyncStorage.getItem('dealerCode');
    return dealerCode ? dealerCode : null;
  } catch (error) {
    console.error('Error retrieving dealerCode:', error);
    return null;
  }
};

export const saveEmail = async Email => {
  try {
    await AsyncStorage.setItem('Email', Email);
    console.log('Email Saved Successfully', Email);
  } catch (error) {
    console.error('Error saving Email:', error);
  }
};

// Get Token
export const getEmail = async () => {
  try {
    const Email = await AsyncStorage.getItem('Email');
    console.log('Email >>>>>>>>>', Email);

    return Email ? Email : null;
  } catch (error) {
    console.error('Error retrieving Email:', error);
    return null;
  }
};



export const saveDealerName = async dealerName => {
  try {
    await AsyncStorage.setItem('dealerName', dealerName);
    console.log('dealerCode Saved Successfully');
  } catch (error) {
    console.error('Error saving dealerName:', error);
  }
};

// Get Token
export const getDealerName = async () => {
  try {
    const dealerName = await AsyncStorage.getItem('dealerName');
    return dealerName ? dealerName : null;
  } catch (error) {
    console.error('Error retrieving dealerName:', error);
    return null;
  }
};