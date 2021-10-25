import axios from 'axios';
import {configConstants} from '../_constants';

export const ticketSubmit = {
  uploadPhotoTicket,
};

const {urlApi, headers} = configConstants;
const api = `${urlApi}/csentry-saveTicket`;

async function uploadPhotoTicket(param) {
  var headers_multipart = await defaultHeaders();
  headers_multipart['Content-Type'] = 'multipart/form-data';

  console.log('headers', headers_multipart);
  console.log('param upload foto', param);

  //   const realPath =
  //     Platform.OS === "ios"
  //       ? decodeURIComponent(record.file.url.replace("file://", ""))
  //       : record.file.url;

  //   const baseRecordUploadUrl = `${Config.API_URL}/upload-file`;

  //   const multipartParams = [
  //     {
  //       name: "files.file",
  //       filename: record.file.name,
  //       data: RNFetchBlob.wrap(realPath),
  //     },
  //     {
  //       name: "data",
  //       data: JSON.stringify({
  //         date: date,
  //         description: description,
  //       }),
  //     },
  //   ];

  //   await RNFetchBlob.fetch(
  //     !recordId ? "post" : "put",
  //     !recordId ? baseRecordUploadUrl : `${baseRecordUploadUrl}/${recordId}`,
  //     headers as { [key: string]: string },
  //     multipartParams
  //   )
  //     .then((resp) => {
  //       console.log(resp);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
}
