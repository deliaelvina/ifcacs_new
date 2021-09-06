import axios from 'axios';
import {Alert} from 'react-native';
import {configConstants} from '../_constants';

export const whereStatus = {
  getWhereStatus,
  getTicketStatus,
};

const {urlApi, headers} = configConstants;
console.log('urlapi', urlApi);
const api_where = `${urlApi}/csallticket-getwherestatus/WPR`;
const api_ticketstatus = `${urlApi}/csallticket-getstatus/WPR`;
// console.log('apo', api);

async function getWhereStatus(datas) {
  const data = datas;
  console.log('data where statuss', data);
  // console.log('urlapi login', urlApi);
  return await axios
    .post(`${api_where}`, data, {headers})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('err', error);
      alert('error nih');
    });
}

async function getTicketStatus(datas) {
  const data = datas;
  console.log('data tiket statuss', data);
  // console.log('urlapi login', urlApi);
  return await axios
    .post(`${api_ticketstatus}`, data, {headers})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('err', error);
      alert('error nih');
    });
}
