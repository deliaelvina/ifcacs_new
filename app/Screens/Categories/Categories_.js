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
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {
  Text,
  NativeBaseProvider,
  List,
  Box,
  Stack,
  Heading,
  FlatList,
  Button,
  Container
} from 'native-base';
import colors from '../../Theme/Colors';
import nbStyles from './Style';
import {sessions} from '../../_helpers';
import DeviceInfo from 'react-native-device-info';
import {Navigation} from 'react-native-navigation';
// import { FlatList } from 'react-native-gesture-handler';

export default class ChooseTower extends React.Component {
//  _isMount = false;

  static options(passProps) {
    return {
      topBar: {
        title :{
          text: 'Choose Tower',
          color: colors.bg_abuabu,
        },
        // noBorder: true,
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
      mounted: false,
      isDisabled: false,
      isLoaded: true,

      username: '',
      email: '',
      token: '',
      userId: '',
      userDatas: [],

      towerz: [],
      trx_type: '0113'
    };

  }
// ---------------- FUNCTION FOR GET API ----------------------
async componentDidMount() {
  // get the storage usage

  const data = {
    email: await sessions.getSess('@User'),
    username: await sessions.getSess('@Name'),
    token: await sessions.getSess('@Token'),
    userId: await sessions.getSess('@UserId'),
    userDatas: await sessions.getSess('@UserProject'),
    mounted: true,
    isLogin: await sessions.getSess('@isLogin'),
  };
  console.log('data sess profil', data);
//   console.log('cek userDatass', data.userDatas[0].db_profile);
  this.setState(data, () => this.getBilling());
}

getBilling = () => {
  // console.log(this.state.email);
  const cons = this.state.userDatas[0].db_profile;
  const entitycds = this.state.userDatas[0].entity_cd;
  const projectnos = this.state.userDatas[0].project_no;
  console.log('cek cons', cons);
  console.log('cek entitycds', entitycds);
  console.log('cek projectnos', projectnos);

  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getTowerz/mysql' + '/' + entitycds + '/' + projectnos,
    // 'http://34.87.121.155:2121/apisysadmin/api/getTowerz/mysql/0001/0001',
    // "https://my.api.mockaroo.com/news.json",
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
    // this.setState({isLoaded: false});
    // console.log('getDuedate2', res);
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

// ---------------- (end) FUNCTION FOR GET API ----------------------

  render() {
    const getEmail = {
      isEmail: this.state.email
  }
    return (
      <NativeBaseProvider>
          {/* <Container>
        <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        <View>
          <ImageBackground style={{flex: 1, paddingBottom: 30}}>
                <View style={{flex: 1, paddingLeft: 0, alignItems: "center", width: "100%"}}>
                    {this.state.towerz.length == 0 ? (
                        <ActivityIndicator />
                            ) : (
                    <FlatList
                    data={this.state.towerz}
                    keyExtractor={item => item.RowID}
                    style={{width: "100%", flexDirection: "column"}}
                    renderItem={({ item, separators }) => (
                        <View>
                            <View style={nbStyles.record}>
                                <Image source={{uri: item.picture_path}} style={{width: 100, height: 68, borderRadius: 5}} />
                            </View>
                            <View style={nbStyles.itemInfo}>
                                <Text style={nbStyles.itemTitle}>
                                    {item.project_descs}
                                </Text>
                            </View>
                            <View style={{justifyContent: "center"}}>
                                <Button transparent></Button>
                            </View>
                        </View>
                    )}
                />
                            )}
                </View>
          </ImageBackground>
          </View> */}
        {/* </ScrollView>
        </Container> */}

        {/* ---------------------------- BATAS SUCI --------------------------- */}

        
    </NativeBaseProvider>
    );
  }
}

// export default Billing;
