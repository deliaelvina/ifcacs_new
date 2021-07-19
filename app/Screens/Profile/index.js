import React, {Component} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  RefreshControl,
  Animated,
  Alert,
  Modal,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  H3,
  Button,
  Header,
  Left,
  Body,
  Card,
  Icon,
  Title,
  Right,
  NativeBaseProvider,
} from 'native-base';

import {Navigation} from 'react-native-navigation';

import Style from '../../Theme/Style';
import {urlApi} from '@Config';
import nbStyles from './Style';
import {goToAuth} from '../navigation';
import {sessions} from '../../_helpers';
import DeviceInfo from 'react-native-device-info';

class Profile extends React.Component {
  static options(passProps) {
    const isIos = Platform.OS === 'ios';

    return {
      topBar: {
        visible: false,
        // height : 0,
        drawBehind: true,
        background: {
          color: '#fff',
        },
      },
      statusBar: {
        style: isIos ? 'dark' : 'light',
        backgroundColor: '#008bbf',
      },
    };
  }

  handleOverlay = name => {
    Navigation.showOverlay({
      component: {
        name,
        options: {overlay: {interceptTouchOutside: true}},
      },
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      isDisabled: false,

      username: '',
      email: '',
      token: '',
      userId: '',

      fotoProfil: require('@Asset/images/profile.png'),

      dataProfile: [],
      modalVisible: false,
    };

    Navigation.events().bindComponent(this);
  }

  async UNSAFE_componentWillMount() {
    const data = {
      email: await sessions.getSess('@User'),
      username: await sessions.getSess('@Name'),
      token: await sessions.getSess('@Token'),
      userId: await sessions.getSess('@UserId'),
      mounted: true,
    };
    console.log('data sess profil', data);
    this.setState(data, () => this.getProfile());
  }

  getProfile = () => {
    console.log(this.state.email);
    fetch(
      urlApi +
        'c_profil/getData/IFCAMOBILE/' +
        this.state.email +
        '/' +
        this.state.userId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Token: this.state.token,
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        const resData = res.Data[0];
        console.log('res profil', res);

        // ? Agar Gambar Tidak ter cache
        let url = resData.pict + '?random_number=' + new Date().getTime();
        this.setState({dataProfile: resData}, () => {
          if (resData.pict) {
            this.setState({fotoProfil: {uri: url}});
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // signOut = async () => {
  //   const formData = {
  //     email: this.state.email,
  //     ipAddress: await DeviceInfo.getIPAddress().then(mac => mac),
  //     device: Platform.OS,
  //   };

  //   fetch(urlApi + 'c_auth/Logout/' + this.state.email, {
  //     method: 'POST',
  //     body: JSON.stringify(formData),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Token: this.state.token,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       // alert(res.Pesan);
  //       // const pesan = res.Pesan;
  //       // this.alertFillBlank(true, pesan);
  //       console.log('sign out', res);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   const data = await _getAllData();
  //   data.map(val => {
  //     if (val != '@isIntro') {
  //       _removeData(val);
  //     }
  //   });
  //   Actions.reset('Login');
  // };

  btnLogout = async () => {
    const formData = {
      email: this.state.email,
      ipAddress: await DeviceInfo.getIpAddress().then(ip => ip),

      //   const mac = await DeviceInfo.getMacAddress().then(mac => {
      //   return mac;
      // });
      device: Platform.OS,
    };
    console.log('formdata btn logout', formData);

    // console.log(this.state.token);
    fetch(urlApi + 'c_auth/Logout/' + this.state.email, {
      // method: 'GET', //awalnya get.
      method: 'POST', //pake post krn ngikutin logout di urban mobile
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Token: this.state.token,
      },
    })
      .then(response => response.json())
      .then(res => {
        // console.log('response', response);
        console.log('res logout', res);
        if (res.Error === false) {
          this.logout();
        } else {
          Alert.alert(res.Pesan);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  logout = async () => {
    console.log('func logout');
    try {
      await sessions.destroySess();
      goToAuth();
    } catch (err) {
      console.log('error signing out...: ', err);
    }
  };

  showAlertLogout(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'Cancel'}, {text: 'Logout', onPress: () => this.btnLogout()}],
      {cancelable: false},
    );
  }

  setModalVisible(visible) {
    console.log('logout?');
    this.setState({modalVisible: visible});
  }

  render() {
    const {name} = this.state;
    return (
      <NativeBaseProvider>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <Text>ini profil</Text>
          </View>
          <Button onPress={() => this.setModalVisible(true)}>Logout</Button>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() =>
              this.setModalVisible(!this.state.modalVisible)
            }>
            <View style={nbStyles.modalView}>
              <View style={nbStyles.modalContainer}>
                <View style={nbStyles.modalHeader}>
                  <Text style={nbStyles.textModal}>Logout from IFCA O+</Text>
                  <TouchableOpacity
                    style={{width: 100, height: 100}}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Icon style={nbStyles.iconModal} name="times" />
                  </TouchableOpacity>
                </View>
                <View style={nbStyles.modalBody}>
                  <Text style={nbStyles.subTitleModal}>
                    Are you sure for logout ?
                  </Text>
                  <View style={nbStyles.btnWrapModal}>
                    <TouchableOpacity
                      style={nbStyles.btnNo}
                      onPress={() =>
                        this.setModalVisible(!this.state.modalVisible)
                      }>
                      <Text style={nbStyles.textNo}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={nbStyles.btnYes}
                      onPress={() => this.btnLogout()}>
                      <Text style={nbStyles.textYes}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default Profile;
