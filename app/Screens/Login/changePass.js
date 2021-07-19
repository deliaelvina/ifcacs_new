import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Container,
} from 'native-base';
import IconVector from 'react-native-vector-icons/FontAwesome';
import nbStyles from './Style';
import Style from '@Theme/Style';
import OfflineNotice from '@Component/OfflineNotice';
import {nav} from '../../_helpers';
import {authService} from '../../_services';
import {PasswordInput} from '../../components/Input';

class ChangePass extends Component {
  // show / change name title top bar is here
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Change Password',
          // fontFamily: 'Montserrat-SemiBold',
        },
        background: {
          color: '#fff',
          translucent: true,
          transparent: true,
        },
        elevation: 0,
        drawBehind: true,
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
      newPassword: '',
      conPassword: '',
    };

    console.log('props', props);
  }

  onChangeValue = (name, value) => {
    this.setState({[name]: value});
  };

  doReset = async () => {
    const {newPassword, conPassword} = this.state;
    const data = {
      email: this.props.email,
      newpass: newPassword,
    };

    newPassword === conPassword
      ? await authService.changePass(data).then(res => {
          this.showAlert('Success', res.Pesan);
          !res.Error && nav.pop(this.props.componentId);
        })
      : this.showAlert('Error', "Your password doesn't match");
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
      <NativeBaseProvider>
        <ImageBackground
          source={require('@Img/bg-login/loginbg2.png')}
          style={{flex: 1, resizeMode: 'cover'}}>
          <OfflineNotice />
          <View
            style={{
              marginLeft: 20,
              marginTop: 100, //this margin only for ios. if andro, please do condition
            }}>
            {/* <Image
              style={{height: 48, width: 150}}
              source={require('@Asset/images/logo-login/alfaland-logo2.png')}
            /> */}
          </View>
          <View style={nbStyles.wrap}>
            <PasswordInput
              name={'newPassword'}
              placeholder={'New Password'}
              onChanges={this.onChangeValue}
              value={this.state.newPassword}
            />
            <PasswordInput
              name={'conPassword'}
              placeholder={'Confirm Password'}
              onChanges={this.onChangeValue}
              value={this.state.conPassword}
            />
            <View style={nbStyles.subWrap1}>
              <Button style={nbStyles.btnGreenAlfa} onPress={this.doReset}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={nbStyles.loginBtnText}>
                    {'SAVE'.toUpperCase()}
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </NativeBaseProvider>
    );
  }
}
export default ChangePass;
