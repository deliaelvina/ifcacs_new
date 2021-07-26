import axios from 'axios';
import {Alert} from 'react-native';
import {configConstants} from '../_constants';

export const authService = {
  login,
  changePass,
};

const {urlApi, headers} = configConstants;
const api = `${urlApi}/c_auth`;
console.log('apo', api);

async function login(datas) {
  const data = datas;
  console.log('data', data);
  return await axios
    .post(`${api}/Login`, data, {headers})
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log('err', err);
      alert('error nih');
    });
}

async function changePass(datas) {
  const data = JSON.stringify(datas);
  return await axios.post(`${api}/ChangePass`, data, {headers}).then(res => {
    return res.data;
  });
}
