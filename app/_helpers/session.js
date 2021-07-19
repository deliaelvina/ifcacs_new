import AsyncStorage from '@react-native-async-storage/async-storage';

export const sessions = {
  setSess,
  getSess,
  destroySess,
  _getAllData,
  _removeData,
};

async function setSess(name, data) {
  try {
    const datas = data ? data : '';
    await AsyncStorage.setItem(name, JSON.stringify(datas));
    console.log('Data Stored');
  } catch (error) {
    console.log('ErrorStoreData', error);
  }
}

async function getSess(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    const item = JSON.parse(value);
    return item;
  } catch (error) {
    console.log('ErrorGetData', error);
    return 'undifined';
  }
}

async function destroySess() {
  try {
    const datas = data ? data : '';
    await AsyncStorage.clear();
    console.log('Data Stored');
  } catch (error) {
    console.log('ErrorStoreData', error);
  }
}

async function _getAllData() {
  try {
    const cb = await AsyncStorage.getAllKeys();
    return cb;
  } catch (exception) {
    return false;
  }
}

async function _removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
