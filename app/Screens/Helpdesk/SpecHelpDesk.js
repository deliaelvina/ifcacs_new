import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
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
import {
  SubmitInput,
  DropdownInput,
  NormalInput,
  DropdownDebtor,
  DropdownLot,
} from '../../components/Input';
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
      textNameDebtor: '',
      textLot: '',
      textContact: '',
      textAppType: '',
      // textFloor: '',s
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
      textUsername: await _getData('@Name'),
      audit_user: await _getData('@Name'),
      email: await _getData('@User'),
      debtor: await _getData('@Debtor'),
      business_id: await _getData('@UserId'),
      rowId: await _getData('@rowID'),
      dataTower: await _getData('@UserProject'),
      token: await _getData('@Token'),
      group_cd: await _getData('@Group'),
    };

    this.loadData(datas);
    console.log('datas await', datas);
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
        entity: data.entity_cd,
        project: data.project_no,
        db_profile: data.db_profile,
      },
      () => {
        this.getDebtor(data);
        // this.getApplicationType();
        // this.getTicketNo();
        // this.getSeqNo();
        // this.getComSource();
      },
    );

    console.log('data when checkbox clicked', data);
  };

  getDebtor = data => {
    const dT = data;

    const formData = {
      entity_cd: dT.entity_cd,
      project_no: dT.project_no,
      email: this.state.email,
    };
    console.log(
      'urlapi',
      urlApi +
        '/csentry-getDebtor' +
        '?' +
        'entity_cd=' +
        dT.entity_cd +
        '&' +
        'project_no=' +
        dT.project_no +
        '&' +
        'email=' +
        this.state.email,
    );
    console.log('formdata debtor', formData);

    const params =
      '?' +
      'entity_cd=' +
      dT.entity_cd +
      '&' +
      'project_no=' +
      dT.project_no +
      '&' +
      'email=' +
      this.state.email;

    console.log('parrams', params);

    fetch(urlApi + '/csentry-getDebtor' + params, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(res => {
        console.log('res debtor', res);
        if (res.Error === false) {
          let resData = res.Data;
          if (this._isMount) {
            this.setState({dataDebtor: resData, spinner: false});
          }
        }
        console.log('Debtor', res);
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log(error);
      });
  };

  getLot = () => {
    const {entity, project, textDebtor, business_id, email} = this.state;

    const formData = {
      entity: entity,
      project: project,
      debtor: textDebtor,
      business_id: business_id, //debtor_acct
      email: email,
    };
    console.log('formdata getlot', formData);

    const params =
      '?' +
      'debtor_acct=' +
      business_id +
      '&' +
      'entity=' +
      entity +
      '&' +
      'project=' +
      project;

    console.log('parrams', params);
    // csentry-getLotno?debtor_acct=A0101&entity_cd=0001&project_no=0001

    fetch(urlApi + '/csentry-getLotno' + params, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(res => {
        if (res.Error === false) {
          console.log('ResData', JSON.stringify(res.Data));
          let resData = res.Data;

          if (this._isMount) {
            this.setState({dataLot: resData, spinner: false});
          }
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log(error);
      });
  };

  getFloor = lot => {
    const dT = this.state.textLot;
    console.log('lot getfloor', lot);
    const lotno = lot;

    const formData = {
      lotno: dT,
    };

    const params = '?lotno=' + lotno;
    console.log('param getfloor', params);

    fetch(urlApi + '/csentry-getFloor' + params, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(res => {
        if (res.Error === false) {
          // const resData = JSON.stringify(res.Data);
          const resData = res.Data;
          if (this._isMount) {
            this.setState({textFloor: resData});
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    // alert('change modal');
    console.log('dataDeb', data);
    this.setState(
      {
        debtor: data.debtor_acct,
        textDebtor: data.debtor_acct + ' - ' + data.name,
        textNameDebtor: data.name,
        spinner: true,
      },
      () => {
        this.getLot(data.debtor_acct);
      },
    );
  };

  handleLotChange = lot => {
    console.log('lot', lot);
    this.setState({textLot: lot});
    this.getFloor(lot);
  };

  handleNavigation = () => {
    console.log('textfloor spec help', this.state.textFloor);
    this.setState({isDisabled: true}, () => {
      if (!this.state.textContact.trim()) {
        this.setState({requiredText: true});
        alert('Please Enter Name');
        return;
      }
      this.goToScreen('screen.CategoryHelp');
    });
    // this.setState({isDisabled: true}, () => {
    //   this.goToScreen('screen.CategoryHelp');
    //   // if (this.state.appType == '') {
    //   //   this.goToScreen('screen.CategoryHelp');
    //   // } else {
    //   //   this.goToScreen('screen.SubmitHelpDesk');
    //   // }
    // });
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
    this.state.dataDebtor.map((data, key) => (data = data));
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
                <Text style={{color: '#3f3b38', fontSize: 14}}>
                  Choose Project
                </Text>

                {this.state.dataTower.map((data, key) => (
                  <CheckBox
                    key={key}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={data.project_descs}
                    checked={this.state.checked === key}
                    onPress={() => this.handleCheckChange(key, data)}
                  />
                ))}
              </View>
              {/* SELECT TAB OPTION IN HERE */}

              {/* SELECTED TAB COMPLAIN */}

              <View style={nbStyles.subWrap}>
                <DropdownDebtor
                  label="Debtor"
                  data={this.state.dataDebtor}
                  onChange={this.handleChangeModal}
                  value={this.state.textDebtor}
                />

                <NormalInput
                  label="Username"
                  editable={false} //wajib true kalo mau di klik-klik / di isi manual
                  value={this.state.textNameDebtor} //dari nama debtor
                  onChangeText={text =>
                    this.setState({
                      textNameDebtor: text,
                    })
                  }
                />
                <DropdownLot
                  label="Lot No"
                  data={this.state.dataLot}
                  onChange={option => this.handleLotChange(option.lot_no)}
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
                      requiredText: false,
                    })
                  }
                  required={this.state.requiredText}
                />
              </View>

              {/* END TAB COMPLAIN */}

              {/* SELECTED TAB END */}
            </View>

            <View style={nbStyles.subWrap}>
              <TouchableOpacity
                onPress={() => this.handleNavigation()}
                // disabled={this.state.isDisabled}
              >
                <View
                  style={[
                    nbStyles.buttonSubmit,
                    {
                      width: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                      height: 40,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text style={nbStyles.textButtonSubmit}>Next</Text>
                </View>
              </TouchableOpacity>
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
