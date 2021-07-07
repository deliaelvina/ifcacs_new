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
  Icon,
  Header,
  Left,
  Body,
  Thumbnail,
} from 'native-base';

import nbStyles from './Style';
import Style from '@Theme/Style';
import DeviceInfo from 'react-native-device-info';
import {goHome} from '../navigation';

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
    };
  }

  render() {
    return (
      <NativeBaseProvider>
        <View>
          <Text>ini login</Text>
        </View>
      </NativeBaseProvider>
    );
  }
}
export default Login;
