import axios from 'axios';
import {configConstants} from '../_constants';

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
    //   userfile: param[0].userfile,
    //   filename: param[0].filename,
  };
  console.log('data saveee', data);

  return await axios
    .post(`${api}`, data, {
      headers,
    })
    .then(res => {
      console.log('res daari acios', res);
      return res.data;
    });
}
