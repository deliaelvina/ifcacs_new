import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Text,
  DatePicker,
  Button,
  Card,
  NativeBaseProvider,
  VStack,
  HStack,
  Badge,
  Divider,
  Avatar,
} from 'native-base';
import moment from 'moment';
import {ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import nbStyles from './Style';
import Style from '@Theme/Style';
import Star from 'react-native-star-view';
import LiveChat from 'react-native-livechat';
// import CardTicket from '@Component/HelpDesk/CardTicket';
import OfflineNotice from '@Component/OfflineNotice';

import {_storeData, _getData} from '@Component/StoreAsync';
import {whereStatus, chooseProject} from '../../_services';
import {urlApi} from '@Config';
import colors from '../../Theme/Colors';

import {CheckBox} from 'react-native-elements';

export default class StatusHelp extends Component {
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
      isDisabled: false,

      dataTower: [],
      dataStatus: [],
      dataTicket: [],
      dataTicketWhereStatus: [],
      chooseProject: [],

      email: '',
      debtor: '',
      group: '',
      showdata: false,
    };
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    this._isMount = true;
    const data = {
      email: await _getData('@User'),
      group: await _getData('@Group'),
      debtor: await _getData('@UserId'),
      dataTower: await _getData('@UserProject'),
    };

    this.setState(data, () => {
      this.getChooseProject();
      // this.getTicketStatus(data.dataTower);
    });
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  async getTicketStatus(data) {
    const dT = data[0];

    const formData = {
      entity: dT.entity_cd,
      project: dT.project_no,
      email: this.state.email,
    };

    await whereStatus.getTicketStatus(formData).then(res => {
      if (this._isMount) {
        if (res.Error === false) {
          const resData = res.Data;
          this.setState({dataStatus: resData});
        } else {
          this.setState({isDisabled: false});
        }
      }
    });
  }

  async getTicketWhereStatus(data, ticketStatus) {
    const dT = data[0];
    // let endDate = this.state.endDate.getFullYear() + '/' + (this.state.endDate.getMonth() + 1) + '/'+ this.state.endDate.getDate()
    // let startDate = this.state.startDate.getFullYear() + '/' + (this.state.startDate.getMonth() + 1) + '/'+ this.state.startDate.getDate()

    const formData = {
      email: this.state.email,

      status: ticketStatus,
    };

    await whereStatus.getWhereStatus(formData).then(res => {
      if (this._isMount) {
        if (res.Error === false) {
          const resData = res.Data;
          this.setState({dataTicketWhereStatus: resData});
          this.goToScreen(res.Data, 'screen.ViewHistoryStatus');
        } else {
          this.setState({isDisabled: false});
        }
      }
    });
  }

  async getChooseProject() {
    const formData = {
      email: this.state.email,
    };
    // /csallticket-chooseproject/haniyya.ulfah@ifca.co.id
    await chooseProject.getchooseProject(formData).then(res => {
      if (this._isMount) {
        if (res.Error === false) {
          const resData = res.Data;

          // this.getTicketStatus(data.dataTower);
          this.setState({chooseProject: resData});
          this.getTicketStatus(resData);
        } else {
          this.setState({isDisabled: false});
        }
      }
    });
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });

    console.log('Selected index', this.state.selectedIndex);
  };

  handleCheckChange = (index, data) => {
    this.setState(
      {
        checked: index,
        entity: data.entity_cd,
        project: data.project_no,
        db_profile: data.db_profile,
        showdata: true,
      },
      () => {
        console.log('ddata after klik checkbox', data);
        console.log('ddata email after klik checkbox', this.state.email);
        // this.getDebtor(data);
        // this.getApplicationType();
        // this.getTicketNo();
        // this.getSeqNo();
        // this.getComSource();
      },
    );

    console.log('data when checkbox clicked', data);
  };

  handleNavigation = (data, ticketStatus) => {
    console.log('data where tiket statuss', data);
    console.log('tikett status', ticketStatus);
    this.setState({isDisabled: true}, () => {
      this.getTicketWhereStatus(data, ticketStatus);
    });
  };

  componentDidDisappear() {
    this.setState({isDisabled: false});
  }

  goToScreen = (data, screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          dataTicket: data,
          email: this.state.email,
        },
      },
    });
  };

  render() {
    const ds = this.state.dataStatus;
    console.log('ds', ds);

    return (
      <NativeBaseProvider
        style={{
          backgroundColor: colors.bg_putih,
        }}>
        <Text style={[nbStyles.title, {margin: 5}]}>Helpdesk Status</Text>
        <View>
          <View style={nbStyles.subWrap2}>
            <Text style={{color: '#3f3b38', fontSize: 14, left: 5}}>
              Choose Project
            </Text>
            {this.state.chooseProject.map((data, key) => (
              <CheckBox
                key={key}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={data.descs}
                checked={this.state.checked === key}
                onPress={() => this.handleCheckChange(key, data)}
              />
            ))}
          </View>
        </View>

        {this.state.showdata === true ? (
          <VStack space={3} divider={<Divider />} w="100%">
            <TouchableOpacity
              onPress={() => this.handleNavigation(this.state.dataTower, "'R'")}
              disabled={this.state.isDisabled}>
              <HStack justifyContent="space-around">
                <Image
                  source={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  style={styles.img}
                />
                <Text
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Open
                </Text>
                <Badge
                  //   colorScheme="success"
                  style={{
                    width: 'auto',
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#42B649',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.bg_putih,
                      textAlign: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {ds.cntopen}
                  </Text>
                </Badge>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.handleNavigation(this.state.dataTower, "'A','P','M'")
              }
              disabled={this.state.isDisabled}>
              <HStack justifyContent="space-around">
                <Image
                  source={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  style={styles.img}
                />
                <Text
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Process
                </Text>
                <Badge
                  //   colorScheme="success"
                  style={{
                    width: 'auto',
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#42B649',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.bg_putih,
                      textAlign: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {ds.cntprocces}
                  </Text>
                </Badge>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleNavigation(this.state.dataTower, "'V'")}
              disabled={this.state.isDisabled}>
              <HStack justifyContent="space-around">
                <Image
                  source={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  style={styles.img}
                />
                <Text
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Cancel
                </Text>
                <Badge
                  //   colorScheme="success"
                  style={{
                    width: 'auto',
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#42B649',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.bg_putih,
                      textAlign: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {ds.cntcancel}
                  </Text>
                </Badge>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleNavigation(this.state.dataTower, "'C'")}
              disabled={this.state.isDisabled}>
              <HStack justifyContent="space-around">
                <Image
                  source={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  style={styles.img}
                />
                <Text
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Close
                </Text>
                <Badge
                  //   colorScheme="success"
                  style={{
                    width: 'auto',
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#42B649',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.bg_putih,
                      textAlign: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {ds.cntclose}
                  </Text>
                </Badge>
              </HStack>
            </TouchableOpacity>
          </VStack>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Please Choose Project First</Text>
            </View>
          </View>
        )}
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    borderRadius: 10,
    height: 50,
    width: 50,
    marginTop: 10,
  },
});
starStyle = {
  width: 100,
  height: 20,
  marginBottom: 20,
};
