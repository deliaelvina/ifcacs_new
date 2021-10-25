// Note : ini semua masih hardcode
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  TextArea,
  Button,
  Stack,
  NativeBaseProvider,
} from 'native-base';
import nbStyles from './Style';
import Style from '@Theme/Style';
import {Navigation} from 'react-native-navigation';
import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import ButtonMenuGrid from '@Component/ButtonMenuGrid';
import ImagePicker from 'react-native-image-crop-picker';
// import Icon from 'react-native-vector-icons/FontAwesome'
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import OfflineNotice from '@Component/OfflineNotice';
import {urlApi} from '@Config';
import colors from '../../Theme/Colors';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {ticketSubmit, uploadPhoto} from '../../_services';

class SubmitHelpDesk extends Component {
  _isMount = false;

  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
      },
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      prevProps: props,
      txtDesc: '',
      txtLocation: '',

      image: [],

      isLoading: false,
      loadingText: 'Loading ...',
    };

    console.log('props', props);

    Navigation.events().bindComponent(this);
  }
  componentDidMount() {
    this._isMount = true;
    const prevProps = this.props.prevProps;

    let titles = '';
    if (prevProps.typeTicket == 'C') {
      titles = 'Complain';
    } else if (prevProps.typeTicket == 'R') {
      titles = 'Request';
    } else {
      titles = 'Application';
    }
    const group_cd = this.props.prevProps.group_cd;
    console.log('group_cd', group_cd);
    const reportdate = moment(new Date()).format('DD MMMM YYYY h:mm');
    // const reportdate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    // const reportdate = '24 August 2021 15:30';
    console.log('reportdate', reportdate);
    this.setState({title: titles, group_cd: group_cd, reportdate: reportdate});
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  handlePhotoPick = () => {
    console.log('datImage', this.state.image);
    Alert.alert(
      'Select a Photo',
      'Choose the place where you want to get a photo',
      [
        {text: 'Gallery', onPress: () => this.fromGallery()},
        {text: 'Camera', onPress: () => this.fromCamera()},
        {
          text: 'Cancel',
          onPress: () => console.log('User Cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  fromCamera() {
    ImagePicker.openCamera({
      cropping: false,
      width: 500,
      height: 500,
    })
      .then(image => {
        console.log('received image', image);

        this.setState(prevState => ({
          image: [
            ...prevState.image,
            {
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime,
            },
          ],
        }));
      })
      .catch(e => console.log('tag', e));
  }

  fromGallery(cropping, mediaType = 'photo') {
    ImagePicker.openPicker({
      multiple: true,
      width: 500,
      height: 500,
    })
      .then(image => {
        console.log('received image', image);

        for (var i = 0; i < image.length; i++) {
          this.setState(prevState => ({
            image: [
              ...prevState.image,
              {
                uri: image[i].path,
                width: image[i].width,
                height: image[i].height,
                mime: image[i].mime,
              },
            ],
          }));
        }
      })
      .catch(e => console.log('tag', e));
  }

  removePhoto = async key => {
    let imageArray = [...this.state.image];
    imageArray.splice(key, 1);
    this.setState({image: imageArray});
  };

  async onSubmit() {
    this.setState({isLoading: true, loadingText: 'Saving data ...'});

    const prevProps = this.props.prevProps;
    console.log('prevprops submit', prevProps);

    let savePhoto = [];
    // const x = this.props.prevProps;
    this.state.image.map((images, index) => {
      let fileName =
        prevProps.textUsername +
        '_' +
        moment(new Date()).format('MMDDYYYY') +
        '_ticket_' +
        (index + 1) +
        '.jpg';
      // let fileImg = RNFetchBlob.wrap(images.uri.replace('file://', ''));
      let fileImg = images.uri.replace('file://', '');

      const formData_pict = {
        // data: data,
        seq_no_pict: index,
        filename: fileName,
        userfile: fileImg,
      };

      console.log('dataSaveAll', formData_pict);
      savePhoto.push(formData_pict);
    });

    console.log('ssavefoto', savePhoto);

    //form data biasa
    const formData = {
      entity: prevProps.entity, //-entity_cd
      project: prevProps.project, //-project_no
      rowID: prevProps.rowId,
      email: prevProps.email, //-email
      debtor: prevProps.debtor, //-debtoracct
      lot_no: prevProps.textLot, //-lotno
      // ticket_no: prevProps.ticketNo,
      categoryy:
        prevProps.appType == '' ? this.props.category_cd : prevProps.appType, //-category
      floorr: prevProps.textFloor, //-level_no / floor
      request_by: prevProps.textUsername, //-username
      contact_no: prevProps.textContact, //-contact_no
      reported_by: prevProps.textreportedBy, //reported_by
      // audit_user: prevProps.audit_user, //-
      audit_user: prevProps.group_cd, //-
      workRequested: this.state.txtDesc,
      reportdate: this.state.reportdate,
      // savePhoto: savePhoto,
      // userfile: savePhoto[0].userfile,
      // filename: savePhoto[0].filename,
    };

    console.log('fromData', formData);

    if (this._isMount) {
      this.setState({isLoading: false});
      await ticketSubmit.submitTicket(formData).then(res => {
        console.log('res di lgin', res);
        console.log('res di eeror', res.Error);
        if (res.status === 'OK' || res.Error === false || !res.Error) {
          console.log('errorr false');
          console.log('res pesan', res.Pesan);
          console.log('report no', res.Report_no);
          // alert(res.Pesan);
          // if (index + 1 === this.state.image.length) {
          //   if (this._isMount) {
          //     this.setState({isLoading: false}, () =>
          //       this.showAlert('Data saved successfuly'),
          //     );
          //   }
          // }
          this.uploadPhoto(res.Report_no);
        } else {
          console.log('error true');
          this.setState({isLoading: false});
          alert(res.Pesan);
        }
      });
    }
  }

  async uploadPhoto(dataReportno) {
    console.log('data report no from submit', dataReportno);
    this.setState({isLoading: true, loadingText: 'Uploading image ...'});

    const x = this.props.prevProps;

    const data = {
      // cons: 'IFCAPB',
      entity: x.entity,
      project: x.project,
      request_by: x.textUsername,
      seqNo: x.seqNo,
      report_no: dataReportno,
    };
    let dataSaveAll = [];
    this.state.image.map(async (images, index) => {
      let fileName =
        x.textUsername +
        '_' +
        moment(new Date()).format('MMDDYYYY') +
        '_ticket_' +
        (index + 1) +
        '.jpg';
      // let fileImg = RNFetchBlob.wrap(images.uri.replace('file://', ''));
      let fileImg = images.uri.replace('file://', '');

      const formData_pict = {
        name: 'userfile',
        data: data,
        seq_no_pict: index,
        filename: fileName,
        userfile: fileImg,
      };

      console.log('dataSaveAll', formData_pict);

      // dataSaveAll.push(formData_pict);
      await ticketSubmit.uploadFoto(formData_pict).then(res => {
        //hit api ke submit ticket dengan formdata = report no
        console.log('res di lgin', res);
        console.log('res di eeror', res.Error);
        if (res.status === 'OK' || res.Error === false || !res.Error) {
          console.log('errorr false');
          console.log('res pesan', res.Pesan);
          alert(res.Pesan);
          // if (index + 1 === this.state.image.length) {
          //   if (this._isMount) {
          //     this.setState({isLoading: false}, () =>
          //       this.showAlert('Data saved successfuly'),
          //     );
          //   }
          // }
          // this.uploadPhoto();
        } else {
          console.log('error true');
          this.setState({isLoading: false});
          alert(res.Pesan);
        }
      });

      // RNFetchBlob.fetch(
      //   'POST',
      //   urlApi + '/csentry-saveTicket',
      //   {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   [
      //     {name: 'photo', filename: fileName, data: fileImg},
      //     {name: 'data', data: JSON.stringify(formData_pict)},
      //   ],
      // ).then(resp => {
      //   console.log('resp', resp);
      //   if (index + 1 === this.state.image.length) {
      //     if (this._isMount) {
      //       this.setState({isLoading: false}, () =>
      //         this.showAlert('Data saved successfuly'),
      //       );
      //     }
      //   }
      // });
    });
    // Object.assign({}, dataSaveAll); // {0:"a", 1:"b", 2:"c"}
    // const formdata = Object.assign({}, dataSaveAll);

    // const obj = Object.fromEntries(dataSaveAll.map(data => [data]));

    // console.log(formData_pict);/
    // console.log('tes', tes);

    // await ticketSubmit.uploadFoto(formdata).then(res => {
    //   //hit api ke submit ticket dengan formdata = report no
    //   console.log('res di lgin', res);
    //   console.log('res di eeror', res.Error);
    //   if (res.status === 'OK' || res.Error === false || !res.Error) {
    //     console.log('errorr false');
    //     console.log('res pesan', res.Pesan);
    //     alert(res.Pesan);
    //     // if (index + 1 === this.state.image.length) {
    //     //   if (this._isMount) {
    //     //     this.setState({isLoading: false}, () =>
    //     //       this.showAlert('Data saved successfuly'),
    //     //     );
    //     //   }
    //     // }
    //     // this.uploadPhoto();
    //   } else {
    //     console.log('error true');
    //     this.setState({isLoading: false});
    //     alert(res.Pesan);
    //   }
    // });
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });

    console.log('Selected index', this.state.selectedIndex);
  };
  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
    });
  };

  handleNext = nextScreen => {
    this.refs[nextScreen].wrappedInstance.focus();
  };

  showAlert(data) {
    Alert.alert(
      'Notification',
      data,
      [
        {
          text: 'OK',
          onPress: () => Navigation.popToRoot(this.props.componentId),
        },
      ],
      {cancelable: false},
    );
  }
  render() {
    return (
      <NativeBaseProvider>
        <OfflineNotice />

        <View
          style={nbStyles.wrap}
          pointerEvents={this.state.isLoading ? 'none' : 'auto'}>
          {/* <Title text={this.state.title} /> */}
          {/* <TextInput
            style={Style.input}
            placeholder={this.state.title + ' Location'}
            placeholderTextColor="#a9a9a9"
            returnKeyType="next"
            autoCorrect={false}
            ref={'txtLocation'}
            value={this.state.textContact}
            onChangeText={text => this.setState({txtLocation: text})}
            onSubmitEditing={() => this.handleNext('txtDescs')}
          /> */}
          <SubTitle text="Work Request" />
          <Stack space={5} w="100%">
            <TextArea
              h={40}
              ref="txtDescs"
              placeholderTextColor="#a9a9a9"
              blurOnSubmit
              placeholder="Description"
              style={nbStyles.textArea}
              bordered
              borderColor={colors.bg_coklat}
              onChangeText={text => this.setState({txtDesc: text})}
            />
          </Stack>

          <View style={nbStyles.pickerWrap}>
            <Text>Attachment</Text>
            {this.state.image.length === 0 ? (
              <TouchableOpacity
                style={[nbStyles.sel, {marginBottom: 20}]}
                onPress={() => this.handlePhotoPick()}>
                <View>
                  <Text>Select a Photo</Text>
                  {/* <Icon name="times" size={25} /> */}
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                {this.state.image.map((data, key) => (
                  <TouchableOpacity
                    key={key}
                    style={nbStyles.avatarContainer}
                    onPress={() => console.log('Photo Tapped')}>
                    <View>
                      <Image
                        style={nbStyles.avatar}
                        source={this.state.image[key]}
                      />
                      <IconFA
                        color="#5A110D"
                        name="remove"
                        style={nbStyles.iconRemove}
                        onPress={() => this.removePhoto(key)}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
                {/* <TouchableOpacity
                  style={[nbStyles.sel, {marginBottom: 20}]}
                  onPress={() => this.handlePhotoPick()}>
                  <View>
                    <Text>Select a Photo</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            )}
          </View>

          <View style={nbStyles.subWrap}>
            <Button
              block
              style={Style.buttonSubmit}
              onPress={() => this.onSubmit()}>
              {this.state.isLoading === false ? (
                <Text>SUBMIT</Text>
              ) : (
                <View style={nbStyles.btnLoadingWrap}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text>{this.state.loadingText}</Text>
                </View>
              )}
            </Button>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
export default SubmitHelpDesk;

const styles = StyleSheet.create({
  listvieww: {
    marginTop: 20,
  },
  listitemm: {
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
