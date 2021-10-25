import React from 'react';
import {
  //   Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
  Platform,
  Image,
} from 'react-native';

import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Text,
  Center,
  HStack,
  VStack,
  Stack,
  //   Image,
  Divider,
  NativeBaseProvider,
} from 'native-base';
import colors from '../../Theme/Colors';
import {color} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import OfflineNotice from '@Component/OfflineNotice';
import nbStyles from './Style';

import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import ButtonMenuGrid from '@Component/ButtonMenuGrid';
import {sessions} from '../../_helpers';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIC from 'react-native-vector-icons/Ionicons';

import ImageView from 'react-native-image-viewing';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getDetailFacility} from '../../_services';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class ChooseTower extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Choose Tower',
          color: colors.bg_abuabu,
        },
        // background: {
        //   color: 'black',
        //   opacity: 0.,
        // },
        // backButton: {
        //   color: 'white',
        // },
      },
      bottomTabs: {
        visible: false, //munculin navigasi bawah
        drawBehind: true,
        animate: true,
      },
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      dateNow: new Date(),


      username: '',
      email: '',
      token: '',
      userId: '',
      userDatas: [],

      towerz: [],
      trx_type: '0113'
    };
  }
  async componentDidMount() {
    const data = {
        email: await sessions.getSess('@User'),
        username: await sessions.getSess('@Name'),
        token: await sessions.getSess('@Token'),
        userId: await sessions.getSess('@UserId'),
        userDatas: await sessions.getSess('@UserProject'),
        mounted: true,
        isLogin: await sessions.getSess('@isLogin')
    };
    console.log('data Async', data);
    this.setState(data, () => {
        this.getTowers()
    });
  }

  getTowers = () => {

    const cons = this.state.userDatas[0].db_profile;
    const entitycds = this.state.userDatas[0].entity_cd;
    const projectnos = this.state.userDatas[0].project_no;

    console.log('cek cons', cons);
    console.log('cek entitycds', entitycds);
    console.log('cek projectnos', projectnos);
  
    fetch(
      'http://34.87.121.155:2121/apisysadmin/api/getTowerz/mysql' + '/' + entitycds + '/' + projectnos,
      {
        method:'GET',
        headers : this.state.hd,
  
      },
    )
    .then(response => response.json())
    .then(res => {
      if (!res.Error) {
        let resData = res.Data;
        this.setState({towerz: resData});
        console.log('getTowers', resData);
      } else {
        this.setState({isLoaded: true}, () => {
          alert(res.Pesan);
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  handleNavigation = (screenName, passedProps) => {
    this.setState({isDisable: true}, () => {
      this.goToScreen(screenName, passedProps);
    });
  };

  goToScreen = (screenName, passedProps) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          passed: passedProps,
        },
      },
    });
  };

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            backgroundColor: colors.bg_peach,
          }}>
          {/* <OfflineNotice /> */}
          <View style={nbStyles.wrap}>
            {/* <Title text="Choose Tower" /> */}

            {/* Start Menu Kotak Kotak */}
            <View style={nbStyles.menuWrap}>
              <View style={nbStyles.btnLayoutTower}>
                  {
                      this.state.towerz.map((data, key) =>
                      <ButtonMenuGrid
                    //   imgUrl={{URI: data.picture_path}}
                      imgUrl={{uri: data.picture_path}}
                      text={data.project_descs}
                      tapTo="screen.BillingDetail"
                      key={key}
                      {...this.props}
                    />
                      )
                  }
                {/* <ButtonMenuGrid
                  imgUrl={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  text="New Ticket"
                  tapTo="screen.SpecHelpDesk"
                  {...this.props}
                />
                <ButtonMenuGrid
                  imgUrl={require('@Asset/images/icon-helpdesk/history.png')}
                  text="History"
                  tapTo="screen.HistoryHelp"
                  {...this.props}
                /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
