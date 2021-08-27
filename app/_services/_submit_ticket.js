import axios from 'axios';
import {configConstants} from '../_constants';
import RNFetchBlob from 'rn-fetch-blob';

export const ticketSubmit = {
  submitTicket,
};

const {urlApi, headers} = configConstants;
const api = `${urlApi}/csentry-saveTicket`;

async function submitTicket(param) {
  console.log('params submit tiket', param);
  //   console.log('paramdata', param.data);
  //   console.log('paramdatass', param[0].data);
  //   console.log('dataparam', data.param);
  //   const data = {
  //     rowID: param[0].data.rowID,
  //     email: param[0].data.email,
  //     project: param[0].data.project,
  //     entity: param[0].data.entity,
  //     reportdate: param[0].data.reportdate,
  //     audit_user: param[0].data.audit_user,
  //     debtor: param[0].data.debtor,
  //     lot_no: param[0].data.lot_no,
  //     categoryy: param[0].data.categoryy,
  //     floor: param[0].data.floorr,
  //     workRequested: param[0].data.workRequested,
  //     reported_by: param[0].data.reported_by,
  //     contact_no: param[0].data.contact_no,
  //     userfile: param[0].userfile,
  //     filename: param[0].filename,
  //   };

  //   formData.append('file', param.savePhoto[0].userfile);
  //   formData.append('file_name', param.savePhoto[0].filename);

  const formData = new FormData();
  formData.append('name', param.filename);
  formData.append('userfile', param.userfile);

  console.log('form apend', formData);

  const data = {
    // rowID: param.rowID,
    email: param.email,
    project: param.project,
    entity: param.entity,
    reportdate: param.reportdate,
    audit_user: param.audit_user,
    debtor: param.debtor,
    lot_no: param.lot_no,
    categoryy: param.categoryy,
    floor: param.floorr,
    workRequested: param.workRequested,
    reported_by: param.reported_by,
    contact_no: param.contact_no,

    // userfile: formData._parts,
  };
  console.log('data saveee', data);

  // let config = {
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data,octet-stream',
  //   },
  // };

  console.log('urlapi login', urlApi);

  //coba ya 1 set ini
  //   var headers = await defaultHeaders();
  // headers['Content-Type'] = 'multipart/form-data';

  // const realPath =
  //   Platform.OS === 'ios' ? decodeURIComponent(param.userfile) : param.userfile;

  // const multipartParams = [
  //   {
  //     name: 'userfile',
  //     filename: param.filename,
  //     type: 'image/jpeg',
  //     data: RNFetchBlob.wrap(realPath),
  //   },
  //   {
  //     name: 'data',
  //     data: JSON.stringify(data),
  //   },
  // ];

  // await RNFetchBlob.fetch(
  //   'POST',
  //   `${api}`,
  //   {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   [
  //     {
  //       name: 'userfile',
  //       filename: param.filename,
  //       type: 'image/jpeg',
  //       data: RNFetchBlob.wrap(realPath),
  //     },
  //     {
  //       name: 'data',
  //       data: JSON.stringify(data),
  //     },
  //   ],
  // )
  //   .then(resp => {
  //     console.log('rrespon data', resp);
  //   })
  //   .catch(err => {
  //     Alert.alert('An error occurred!', err.message, [{text: 'Okay'}]);
  //   });

  return await axios
    .post(`${api}`, formData, {config})
    .then(res => {
      console.log('res urlapi', res);
      // console.log('res urlapi', result.response.data);
      // return result.response.data;
      return res.data;
    })
    .catch(error => {
      console.log('err', error.response.data);
      alert('error nih');
    });
}
