import axios from 'axios';
import {configConstants} from '../_constants';

export const productService = {
  getTower,
};

const {urlApi, headers} = configConstants;

// const api = `${urlApi}/c_product_info`;

// async function getTower(param) {
//   return await axios
//     .get(`${api}/getData_oplus/IFCAMOBILE/${param.email}/${param.app}`, {
//       headers,
//     })
//     .then(res => {
//       console.log('res get tower', res);
//       return res.data;
//     });
// }

async function getTower(param) {
  console.log('urlapi', urlApi);
  console.log('params', param);
  return await axios
    .get(`${urlApi}/getData/mysql/${param.email}/${param.app}`, {
      headers,
    })
    .then(res => {
      console.log('res get tower', res);
      return res.data;
    })
    .catch(error => {
      console.log('error get tower api', error.response.data);
      alert('error get');
    });
}
