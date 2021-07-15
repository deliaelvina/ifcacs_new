import React, {Component} from 'react';
import {View, ImageBackground, Image, Alert, StatusBar} from 'react-native';
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
  // Icon,
  IconButton,
  HStack,
  Divider,
  Container,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import nbStyles from './Style';
import Style from '@Theme/Style';
import OfflineNotice from '@Component/OfflineNotice';
import {nav} from '../../_helpers';
import {authService} from '../../_services';
import {PasswordInput} from '../../components/Input';

class ChangePass extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: false,
        height: 10,
      },
      statusBar: {
        style: 'dark',
        backgroundColor: '#fff',
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

  UNSAFE_componentWillMount() {
    this.startHeaderHeight = 300;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  // renderHeader() {
  //   return (
  //     <Header style={Style.navigationTransparent}>
  //       <View style={Style.actionBarLeft}>
  //         <Button
  //           transparent
  //           style={Style.actionBarBtn}
  //           onPress={() => {
  //             nav.pop(this.props.componentId);
  //           }}>
  //           <Icon
  //             active
  //             name="arrow-left"
  //             style={Style.textWhite}
  //             type="MaterialCommunityIcons"
  //           />
  //         </Button>
  //       </View>
  //     </Header>
  //   );
  // }

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
        <Box style={{flex: 1}}>
          <OfflineNotice style={{marginTop: 50}} />
        </Box>

        {/* <ImageBackground
          source={require('@Img/bg-login/loginbg2.png')}
          style={{flex: 1, resizeMode: 'cover'}}></ImageBackground> */}
      </NativeBaseProvider>
    );
  }
}
export default ChangePass;
