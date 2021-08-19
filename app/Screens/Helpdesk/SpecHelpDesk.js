import React, {Component} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  NativeBaseProvider,
} from 'native-base';
import nbStyles from './Style';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSelector from 'react-native-modal-selector';
// import Style from '@Theme/Style';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {CheckBox} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import OfflineNotice from '@Component/OfflineNotice';
import {SubmitInput, DropdownInput, NormalInput} from '../../components/Input';
import {_storeData, _getData} from '@Component/StoreAsync';
import {urlApi} from '@Config';
import Style from '../../Theme/Style';
import colors from '../../Theme/Colors';

class SpecHelpDesk extends React.Component {
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
      rowId: '',
      email: '',
      business_id: '',
      debtor: '',
      entity: '',
      project: '',
      audit_user: '',
      db_profile: '',

      ticketNo: 0,
      seqNo: 0,
      comSource: 0,

      selectedIndex: 0,
      typeTicket: 'C',
      appType: '',

      dataTower: [],
      dataDebtor: [],
      dataLot: [],
      dataApplicationType: [],

      textUsername: '',
      textDebtor: '',
      textLot: '',
      textContact: '',
      textAppType: '',
      textFloor: '',
      token: '',
      textreportedBy: '',

      checked: false,
      spinner: false,
    };

    this.handleCheckChange = this.handleCheckChange.bind(this);
    // this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    this._isMount = true;

    const datas = {
      // textUsername: await _getData('@Name'),
      audit_user: await _getData('@Name'),
      email: await _getData('@User'),
      debtor: await _getData('@Debtor'),
      business_id: await _getData('@UserId'),
      rowId: await _getData('@rowID'),
      dataTower: await _getData('@UserProject'),
      token: await _getData('@Token'),
    };

    this.loadData(datas);
  }

  loadData = datas => {
    if (this._isMount) {
      this.setState(datas);
    }
  };

  componentWillUnmount() {
    this._isMount = false;
  }

  handleCheckChange = (index, data) => {
    this.setState(
      {
        checked: index,
        // entity: data.entity_cd,
        // project: data.project_no,
        // db_profile: data.db_profile,
      },
      () => {
        // this.getDebtor(data);
        // this.getApplicationType();
        // this.getTicketNo();
        // this.getSeqNo();
        // this.getComSource();
      },
    );

    console.log('daa', data);
  };

  handleIndexChange = index => {
    let type = '';
    if (index == 0) {
      type = 'C';
    } else if (index == 1) {
      type = 'R';
    } else if (index == 2) {
      type = 'A';
    }

    this.setState({
      ...this.state,
      selectedIndex: index,
      typeTicket: type,
      appType: '',
      textAppType: '',
    });

    console.log('Selected index', this.state.selectedIndex);
  };

  handleChangeModal = data => {
    // console.log('dataDeb', data);
    alert('datadb', data);
    this.setState(
      {
        textInputValue: data.label,
        // debtor: data.debtor_acct,
        // textDebtor: data.name,
        spinner: true,
      },
      () => {
        // this.getLot(data.debtor_acct);
      },
    );
  };

  handleNavigation = () => {
    this.setState({isDisabled: true}, () => {
      if (this.state.appType == '') {
        this.goToScreen('screen.CategoryHelp');
      } else {
        this.goToScreen('screen.SubmitHelpDesk');
      }
    });
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          prevProps: this.state,
        },
      },
    });
  };

  componentDidDisappear() {
    this.setState({isDisabled: false});
  }

  render() {
    let index = 0;
    const datadummy = [
      {
        key: index++,
        section: true,
        label: 'Fruits',
        id: index++,
        name: 'Fruits',
      },
      {key: index++, label: 'Red Apples', id: index++, name: 'Fruits'},
      {key: index++, label: 'Cherries', id: index++, name: 'Fruits'},
      {
        key: index++,
        label: 'Cranberries',
        accessibilityLabel: 'Tap here for cranberries',
        id: index++,
        name: 'Fruits',
      },
    ];
    return (
      <NativeBaseProvider>
        <OfflineNotice />
        <ScrollView>
          <View>
            <Spinner visible={this.state.spinner} />
          </View>

          <View style={nbStyles.wrap}>
            <Title text="Ticket" />
            <SubTitle text="Specification Help Desk" />
            <View style={nbStyles.subWrap}>
              <View style={nbStyles.subWrap2}>
                <Text>Choose Project</Text>
                <Text style={{color: '#3f3b38', fontSize: 14}}>
                  Choose Project
                </Text>
                <CheckBox
                  key={0}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title={'nama projek checkbox'}
                  checked={0}
                  // onPress={() => this.handleCheckChange(key, data)}
                />
              </View>
              {/* SELECT TAB OPTION IN HERE */}

              {/* SELECTED TAB COMPLAIN */}

              <View style={nbStyles.subWrap}>
                <DropdownInput
                  label="Debtor"
                  data={datadummy}
                  onChange={this.handleChangeModal}
                  //   onChange={option => {
                  //     this.setState({textInputValue: option.label});
                  //   }}
                  value={this.state.textInputValue}
                />

                <NormalInput
                  label="Username"
                  value={this.state.textUsername} //dari nama debtor
                  onChangeText={text =>
                    this.setState({
                      textUsername: text,
                    })
                  }
                />
                <DropdownInput
                  label="Lot No"
                  data={datadummy}
                  // onChange={option => this.handleLotChange(option.lot_no)}
                  value={this.state.textLot}
                />
                <NormalInput
                  label="Reported By"
                  value={this.state.textreportedBy}
                  onChangeText={text =>
                    this.setState({
                      textreportedBy: text,
                    })
                  }
                />
                <NormalInput
                  label="Contact No"
                  value={this.state.textContact}
                  keyboardType="number-pad"
                  onChangeText={text =>
                    this.setState({
                      textContact: text,
                    })
                  }
                />
              </View>

              {/* END TAB COMPLAIN */}

              {/* SELECTED TAB END */}
            </View>

            <View style={nbStyles.subWrap}>
              <Button
                block
                style={nbStyles.buttonSubmit}
                // onPress={() => this.handleNavigation()}
                disabled={this.state.isDisabled}>
                <Text style={nbStyles.textButtonSubmit}>Next</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
export default SpecHelpDesk;

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 16,
    width: null,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
