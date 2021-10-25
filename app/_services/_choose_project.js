import axios from 'axios';
import {Alert} from 'react-native';
import {configConstants} from '../_constants';

export const chooseProject = {
  getchooseProject,
};

const {urlApi, headers} = configConstants;
console.log('urlapi', urlApi);
const api_choosetiket = `${urlApi}/csallticket-chooseproject`;

// console.log('apo', api);

async function getchooseProject(datas) {
  const data = datas;

  const email_params = api_choosetiket + '/' + data.email;

  return await axios
    .get(`${email_params}`, data, {headers})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('err', error);
      alert('error nih');
    });
}
