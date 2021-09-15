import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NativeBaseProvider,
  Content,
  Text,
  Badge,
  Form,
  Item,
  Label,
  Input,
  Button,
  Header,
  Left,
  Body,
  Thumbnail,
} from 'native-base';
import nbStyles from './Style';
import Style from '@Theme/Style';
import DeviceInfo from 'react-native-device-info';
import {goHome} from '../navigation';
// import firebase from 'react-native-firebase';
// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
import {USER_KEY} from '../config';
import OfflineNotice from '@Component/OfflineNotice';
import {_storeData, _getData} from '@Component/StoreAsync';
import {urlApi} from '@Config';
import {authService, contactService, productService} from '../../_services';
import {nav, sessions} from '../../_helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Theme/Colors';
import fonts from '../../Theme/Fonts';

class Login extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        height: 0,
      },
      bottomTabs: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      //This below for Control
      icEye: 'visibility-off',
      avPassword: true,
      device: '',
      token: '',
      isCorrect: '',
      showSpinner: false,
      isHidden: true,

      //This below for form text
      passwordTextInput: '',
      emailTextInput: '',

      // This below for Alert
      showAlert: false,
      themeAlert: 'info',
      titleAlert: '',
      subtitleAlert: '',
      titleButtonAlert: 'Close',

      // This below for Validator
      emailError: '',
      passwordError: '',

      data: [],
      isLoading: false,
    };
  }

  onChangeText = (key, value) => {
    this.setState({[key]: value});
  };

  async componentDidMount() {
    this.setState({device: Platform.OS});

    // this.checkPermission();
    // this.createNotificationListeners();
  }

  btnLoginClick = async () => {
    this.setState({isLoading: true});
    console.log('isloading button klik', this.state.isLoading);
    const mac = await DeviceInfo.getMacAddress().then(mac => {
      return mac;
    });

    // console.log('mac', mac);
    const formData = {
      email: this.state.emailTextInput,
      password: this.state.passwordTextInput,
      token: '',
      token_firebase: this.state.token,
      device: this.state.device,
      mac: mac,
      app: 'O',
    };
    console.log('form data login', formData);
    var lengthPass = this.state.passwordTextInput.length;
    if (lengthPass < 4) {
      this.setState({isLoading: false});
      alert('Wrong password !!!');
    } else {
      this.setState({isLoading: false});
      this.doLogin(formData);

      // console.log('form data login', formData);
    }
  };

  async doLogin(value) {
    this.setState({showSpinner: !this.state.showSpinner});
    this.setState({isLoading: true});
    await authService.login(value).then(res => {
      console.log('res di lgin', res);
      if (res.Error === false || !res.Error) {
        console.log('errorr false');
        if (res.Data.isResetPass === false || !res.Data.isResetPass == 1) {
          console.log('false');
          this.getTower(res);
        } else {
          nav.push(this.props.componentId, 'screen.ChangePass', {
            email: res.Data.user,
          });
        }
      } else {
        console.log('error true');

        this.setState({isLoading: false});
        alert(res.Pesan);
      }
    });
  }

  getTower = async rest => {
    let result = rest.Data;
    console.log('result', result);
    const data = {
      email: this.state.emailTextInput,
      app: 'O',
    };

    await productService.getTower(data).then(res => {
      console.log('res get tower service', res);
      if (res.Error === false) {
        let resData = res.Data;
        result['UserProject'] = resData;
        this.signIn(result);
        console.log('resDataTower', resData);
      }
    });
    // this.signIn(result); //langsung ke function signin, krn function prodcut
    // goHome(); //sementara langsung ke home.
  };

  signIn = async res => {
    console.log('res sign in', res);
    const {emailTextInput, passwordTextInput} = this.state;
    try {
      sessions.setSess('@UserId', res.UserId);
      sessions.setSess('@Name', res.name);
      sessions.setSess('@Token', res.Token);
      sessions.setSess('@User', res.user);
      sessions.setSess('@Group', res.Group);
      sessions.setSess('@isLogin', true);
      sessions.setSess('@isReset', res.isResetPass);
      sessions.setSess('@AgentCd', res.AgentCd);
      sessions.setSess('@Debtor', res.Debtor_acct);
      sessions.setSess('@rowID', res.rowID);
      sessions.setSess('@RefreshProfile', false);
      sessions.setSess('@UserProject', res.UserProject);

      goHome();
    } catch (err) {
      console.log('error:', err);
    }
  };

  renderHeader() {
    return (
      <Header style={Style.navigationTransparent}>
        <View style={Style.actionBarLeft}>
          <Button
            transparent
            style={Style.actionBarBtn}
            onPress={() => {
              nav.pop(this.props.componentId);
            }}>
            <Icon
              name="arrow-left"
              // backgroundColor="#3b5998"
              // active
              // name="arrow-left"
              style={Style.textWhite}
              // type="MaterialCommunityIcons"
            />
          </Button>
        </View>
      </Header>
    );
  }

  // async checkPermission() {
  //   const enabled = await firebase_msg.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   // console.log('fcmToken', fcmToken);
  //   if (!fcmToken) {
  //     fcmToken = await firebase_msg.messaging().getToken();
  //     if (fcmToken) {
  //       // user has a device token
  //       await AsyncStorage.setItem('token', fcmToken);
  //       console.log('fcmToken', fcmToken);
  //       this.setState({
  //         token: fcmToken,
  //       });
  //     }
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase_msg.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }

  // async createNotificationListeners() {
  //   messaging.notifications().setBadge(0);
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       const {title, body} = notification;
  //       this.showAlert(title, body);
  //     });

  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       const {title, body} = notificationOpen.notification;
  //       this.showAlert(title, body);
  //     });

  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     const {title, body} = notificationOpen.notification;
  //     this.showAlert(title, body);
  //   }

  //   this.messageListener = firebase_msg.messaging().onMessage(message => {
  //     console.log(JSON.stringify(message));
  //   });
  // }

  handleEyeChanger = () => {
    this.setState({isHidden: !this.state.isHidden}, () => {
      this.refs['password'].blur();
    });
  };

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }
  render() {
    return (
      <NativeBaseProvider style={nbStyles.content}>
        <ImageBackground
          // source={require('@Img/bg-login/loginbg2.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: colors.bg_putih,
          }}>
          {/* {this.renderHeader()} */}
          <OfflineNotice />
          <SafeAreaView>
            <View style={Style.LogoLeftTopWarp}>
              {/* <Image
                style={{height: 150, width: 90}}
                source={require('@Asset/images/logo-login/logo-login.png')}
              /> */}
            </View>
            <View style={nbStyles.wrapLogoText}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  alignSelf: 'center',
                  padding: 0,
                  margin: 0,
                }}
                source={require('@Asset/images/Pakubuwono-logo-daun.png')}
              />
              <Text
                style={{
                  fontFamily: fonts.fontbaru,
                  fontSize: 40,
                  textAlign: 'center',
                }}>
                The Pakubuwono Residence
              </Text>
            </View>
            <View style={nbStyles.wrapTitleLogin}>
              <View>
                <Text style={nbStyles.title}>Login</Text>
              </View>
              <View style={nbStyles.textInputWrap}>
                <TextInput
                  style={nbStyles.textInput}
                  placeholder={'Email Address'}
                  placeholderTextColor={colors.rs_grey}
                  onChangeText={val => this.onChangeText('emailTextInput', val)}
                />
              </View>
              <View
                style={[
                  nbStyles.textInputWrap,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <TextInput
                  ref="password"
                  style={nbStyles.textInput}
                  placeholder={'Password'}
                  placeholderTextColor={colors.rs_grey}
                  secureTextEntry={this.state.isHidden}
                  onChangeText={val =>
                    this.onChangeText('passwordTextInput', val)
                  }
                />
                {/* <Icon
                  onPress={() => this.handleEyeChanger()}
                  active
                  name={this.state.isHidden ? 'eye' : 'eye-off'}
                  type="MaterialCommunityIcons"
                  style={nbStyles.EyePasswordBtnIcon}
                /> */}
                <Icon
                  onPress={() => this.handleEyeChanger()}
                  active
                  // name="facebook"
                  // type={MaterialCommunityIcons}
                  name={this.state.isHidden ? 'eye' : 'eye-slash'}
                  size={20}
                  color={colors.rs_grey}
                />
              </View>
              {/* <Button onPress={() => this.btnLoginClick()}>PRIMARY</Button> */}
              <View style={nbStyles.subWrap1}>
                <Button
                  endIcon={
                    <Icon
                      active
                      name="arrow-right"
                      // type="MaterialCommunityIcons"
                      // style={nbStyles.loginBtnIcon}
                      style={{left: 20, fontSize: 20, color: '#fff'}} //icon ada jarak di kiri sebesar 20
                    />
                  }
                  style={nbStyles.btnGreenAlfa}
                  isLoading={this.state.isLoading === true ? true : false}
                  onPress={() => this.btnLoginClick()}>
                  <Text style={nbStyles.loginBtnText}>
                    {'Login'.toUpperCase()}
                  </Text>
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </NativeBaseProvider>
    );
  }
}
export default Login;
