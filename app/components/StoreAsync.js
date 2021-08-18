import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (name, data) => {
  try {
    const datas = data ? data : '';
    await AsyncStorage.setItem(name, JSON.stringify(datas));
    console.log('Data Stored');
  } catch (error) {
    console.log('ErrorStoreData', error);
  }
};

export const _getData = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    const item = JSON.parse(value);
    return item;
  } catch (error) {
    console.log('ErrorGetData', error);
  }
};

export const _clearCache = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('error cleaar', e);
  }

  console.log('Done.');
  // try {
  //   const datas = data ? data : '';

  //   console.log('data clear cache', datas);
  // } catch (error) {
  //   console.log('error clear cache', error);
  // }
};
