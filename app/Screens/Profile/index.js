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
  NativeModules,
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
import colors from '../../Theme/Colors';
import nbStyle from './Style';
import MenuProfil from './menuProfil';

//for clear cache
// import AppCacheClear from 'react-native-clear-app-cache';
var clearCacheModuleObj = NativeModules.ClearCacheModule;
console.log('clear cache', clearCacheModuleObj);

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
        backgroundColor: '#000000',
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
      dataMenu: [
        {id: '1', menu: 'info personal'},
        {id: '2', menu: 'help'},
        {id: '3', menu: 'about us'},
        {id: '4', menu: 'sign out'},
      ],

      // for cache
      unit: '',
      cacheSize: '0',
    };

    Navigation.events().bindComponent(this);
  }

  async UNSAFE_componentWillMount() {
    // get the storage usage

    const data = {
      email: await sessions.getSess('@User'),
      username: await sessions.getSess('@Name'),
      token: await sessions.getSess('@Token'),
      userId: await sessions.getSess('@UserId'),
      mounted: true,
      isLogin: await sessions.getSess('@isLogin'),
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
    console.log('urlapi', urlApi);
    fetch(urlApi + '/LoginMobileControler/Logout/' + this.state.email, {
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
    try {
      await sessions.destroySess();
      const data = await sessions._getAllData();
      data.map(val => {
        if (val != '@isIntro') {
          sessions._removeData(val);
        }
      });
      goToAuth();
    } catch (err) {
      console.log('error signing out...: ', err);
    }
    // console.log('func logout');
    // try {
    //   await sessions.destroySess();
    //   goToAuth();
    // } catch (err) {
    //   console.log('error signing out...: ', err);
    // }
  };

  handleNavigation = screenName => {
    this.setState({isDisable: true}, () => {
      this.goToScreen(screenName);
    });
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
    });
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

  setClearCache() {
    // AppCacheClear.getAppCacheSize((size, unit) => {
    //   console.log(size, unit);
    //   alert('size', size);
    //   alert('unit', unit);
    // });
  }

  render() {
    let {fotoProfil} = this.state;
    const {name} = this.state;
    return (
      <NativeBaseProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.bg_peach}}>
          {/* <Button onPress={() => this.setModalVisible(true)}>Logout</Button> */}

          {this.state.isLogin == true ? (
            <View>
              <View style={{top: '5%'}}>
                <Text
                  style={{
                    color: colors.bg_abuabu,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Profil
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: colors.bg_putih,
                  borderTopLeftRadius: 60,
                  borderTopRightRadius: 60,
                  top: '10%',
                  height: '100%',
                }}>
                {/* ----- image foto profil ------ */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Image
                    source={fotoProfil}
                    style={{
                      borderRadius: 40,
                      width: 80,
                      height: 80,
                    }}
                  />
                </View>
                {/* ----- end image foto profil ------ */}

                {/* ------ content profil -------  */}
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Text style={{fontSize: 18, color: colors.bg_abuabu}}>
                    {this.state.username}
                  </Text>
                  <Text style={{fontSize: 14, color: colors.bg_hijaugelap}}>
                    {this.state.email}
                  </Text>
                </View>

                {/* ----- menu profil ---- */}

                {this.state.isLogin == true ? (
                  <View>
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Clear Cache'}
                      bg={colors.bg_putih}
                      onPress={() => this.setClearCache()}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Settings'}
                      bg={colors.bg_putih}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Privacy & Police'}
                      bg={colors.bg_putih}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'About Us'}
                      bg={colors.bg_putih}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Contact Us'}
                      bg={colors.bg_putih}
                    />
                  </View>
                ) : (
                  <View>
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Privacy & Police'}
                      bg={colors.bg_putih}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'About Us'}
                      bg={colors.bg_putih}
                    />
                    <MenuProfil
                      // key={index}
                      // img={{ uri: item.url_image }}
                      img={require('@Asset/icons/profile.png')}
                      menu={'Contact Us'}
                      bg={colors.bg_putih}
                    />{' '}
                  </View>
                )}

                {/* ----- end menu profil ---- */}

                {/* ------ end content profil -------  */}

                {/* ------ button logout ------ */}
                {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.bg_putih, borderColor: colors.bg_coklat, borderWidth: 1, padding: 10, borderRadius: 10, width: 100 }}
                                    // onPress={() => this.btnLogout()}
                                    // onPress={() => this.handleNavigation(
                                    //     "screen.Login"

                                    // )}
                                    // onPress={() => nav.push(this.props.componentId, "screen.Login")}
                                    onPress={() => this.btnLogout()}
                                >
                                    <Text style={{ color: colors.bg_coklat, textAlign: 'center' }}>
                                        Sign out
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
                <Button
                  onPress={() => this.setModalVisible(true)}
                  style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    backgroundColor: colors.bg_coklat,
                    borderRadius: 10,
                  }}>
                  <Text style={{fontSize: 14, color: colors.bg_putih}}>
                    Log out
                  </Text>
                </Button>

                {/* ------ end button logout ------ */}
              </View>
            </View>
          ) : (
            <View>
              <View style={{top: '5%'}}>
                <Text
                  style={{
                    color: colors.bg_abuabu,
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  Profil
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: colors.bg_putih,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  top: '10%',
                  height: '100%',
                }}>
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    // style={nbStyle.btnYes}
                    style={{
                      backgroundColor: colors.bg_hijautua,
                      padding: 10,
                      borderRadius: 10,
                    }}
                    // onPress={() => this.btnLogout()}
                    onPress={() => this.handleNavigation('screen.Login')}
                    // onPress={() => nav.push(this.props.componentId, "screen.Login")}
                    // onPress={() =>
                    //   nav.push(this.props.componentId, 'screen.Login')
                    // }
                  >
                    <Text style={{color: colors.bg_putih}}>Login</Text>
                  </TouchableOpacity>
                </View>

                {/* ----- menu profil ---- */}
                <View>
                  <MenuProfil
                    // key={index}
                    // img={{ uri: item.url_image }}
                    img={require('@Asset/icons/profile.png')}
                    menu={'Privacy & Police'}
                    bg={colors.bg_putih}
                  />
                  <MenuProfil
                    // key={index}
                    // img={{ uri: item.url_image }}
                    img={require('@Asset/icons/profile.png')}
                    menu={'About Us'}
                    bg={colors.bg_putih}
                  />
                  <MenuProfil
                    // key={index}
                    // img={{ uri: item.url_image }}
                    img={require('@Asset/icons/profile.png')}
                    menu={'Contact Us'}
                    bg={colors.bg_putih}
                  />
                </View>
                {/* ----- end menu profil ---- */}
              </View>
            </View>
          )}

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
