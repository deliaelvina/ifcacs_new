import axios from 'axios';
// import {configConstants} from '../_constants';

export const getDetailFacility = {
  getDetail,
};

// const {urlApi, headers} = configConstants;
// const api = `${urlApi}/facility`;
// console.log('api fasilitas detail', api);

async function getDetail(param) {
  return await axios
    .get(`${param.api}id/` + `${param.rowid}`, {
      //row id detail fasilitas
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Token: this.state.token
      },
    })
    .then(res => {
      return res.data;
    });
}
