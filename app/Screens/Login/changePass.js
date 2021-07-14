import React, {Component} from 'react';
import {View, ImageBackground, Image, Alert} from 'react-native';
import {Container, Content, Text, Button, Icon, Header} from 'native-base';
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
        title: {
          text: 'Change Password',
          fontFamily: 'Montserrat-SemiBold',
        },
        background: {
          color: 'transparent',
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
              active
              name="arrow-left"
              style={Style.textWhite}
              type="MaterialCommunityIcons"
            />
          </Button>
        </View>
      </Header>
    );
  }

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
      <Container style={nbStyles.content}>
        <View>
          <Text>change password</Text>
        </View>
      </Container>
    );
  }
}
export default ChangePass;
