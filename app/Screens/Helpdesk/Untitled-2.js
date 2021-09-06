
  const formData = new FormData();
  formData.append('name', param.savePhoto[0].filename);
  formData.append('userfile', param.savePhoto[0].userfile);

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

  let config = {
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  };

  console.log('urlapi login', urlApi);

  //coba ya 1 set ini
  //   var headers = await defaultHeaders();
  headers['Content-Type'] = 'multipart/form-data';

  const realPath =
    Platform.OS === 'ios'
      ? decodeURIComponent(param.savePhoto[0].userfile)
      : param.savePhoto[0].userfile;

  const multipartParams = [
    {
      name: 'userfile',
      filename: param.savePhoto[0].filename,
      data: RNFetchBlob.wrap(realPath),
      
    },
    {
      name: 'data',
      data: JSON.stringify(data),
    },
  ];

  await RNFetchBlob.fetch('post', `${api}`, headers, multipartParams)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log('err', err);
      console.log('err detail', err.response.data);
    });
  //   return await axios
  //     .post(`${api}`, formData, {config})
  //     .then(res => {
  //       console.log('res urlapi', res);
  //       // console.log('res urlapi', result.response.data);
  //       // return result.response.data;
  //       return res.data;
  //     })
  //     .catch(error => {
  //       console.log('err', error.response.data);
  //       alert('error nih');
  //     });