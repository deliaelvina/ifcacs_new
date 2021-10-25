import axios from 'axios';
import {Alert} from 'react-native';
import {configConstants} from '../_constants';

export const ticketDetail = {
  ticketMulti,
  ticketIaS,
};

const {urlApi, headers} = configConstants;
console.log('urlapi', urlApi);
const api_ticketmulti = `${urlApi}/csallticket-getticketmulti/WPR`;
const api_ticketias = `${urlApi}/csallticket-getticketias/WPR/`;

// console.log('apo', api);

async function ticketMulti(datas) {
  const data = datas;
  console.log('data ticket multi', data);
  // console.log('urlapi login', urlApi);
  return await axios
    .post(`${api_ticketmulti}`, data, {headers})
    .then(res => {
      console.log('res tiket multi', res);
      return res.data;
    })
    .catch(error => {
      console.log('err', error);
      alert('error nih');
    });
}

async function ticketIaS(datas) {
  const data = datas;
  console.log('data ticket ias', data);
  // console.log('urlapi login', urlApi);
  return await axios
    .post(`${api_ticketias}/` + data.report_no, data, {headers})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('err', error);
      alert('error nih');
    });
}
