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
  Modal
} from 'react-native';
import {
  Text,
  NativeBaseProvider,
  List,
  Box,
  Stack,
  Heading
} from 'native-base';
import colors from '../../Theme/Colors';
import nbStyles from './Style';
import {sessions} from '../../_helpers';
import DeviceInfo from 'react-native-device-info';
import {Navigation} from 'react-native-navigation';
import moment from 'moment';
import numFormat from "@Component/numFormat";
import WebView from "@Component/WebView";

let isMount = false;

export default class BillingDetail extends React.Component {

  static options(passProps) {
    return {
      topBar: {
        title :{
          text: 'Billing Details',
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
      isVisible: false,

      username: '',
      email: '',
      token: '',
      userId: '',

      duedate: [],
      docdate: [],
      mbalamt: [],

      // userIDs: '',
      // doc_no: '',
      // trxtypes: ''
      userIDs : 'A0101',
      doc_nos : 'WE10281173',
      trxtypes : 'O113'
    };

    console.log('cek props', props);

  }
// ---------------- FUNCTION FOR GET API ----------------------
async UNSAFE_componentWillMount() {
  // get the storage usage
  isMount = true;
  const data = {
    email: await sessions.getSess('@User'),
    username: await sessions.getSess('@Name'),
    token: await sessions.getSess('@Token'),
    userId: await sessions.getSess('@UserId'),
    mounted: true,
    isLogin: await sessions.getSess('@isLogin'),
  };
  console.log('data sess profil', data);
  this.setState(data, () => 
    this.getBilling(data.email),
    this.getMidtrans()
    );
}

// async componentDidMount() {
//   isMount = true;

//   // const data = {
//   //   email: await sessions.getSess('@User'),
//   //   username: await sessions.getSess('@Name'),
//   //   token: await sessions.getSess('@Token'),
//   //   userId: await sessions.getSess('@UserId'),
//   //   mounted: true,
//   //   isLogin: await sessions.getSess('@isLogin'),
//   // };
  
//   this.setState(() => { 
//     this.getMidtrans();
// });
// }

getBilling = (xyz) => {
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getDataDue/WPR/' + xyz,
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      this.setState({duedate: resData});
      console.log('getDuedates', this.state.duedate);
    } else {
      this.setState({isLoaded: true}, () => {
        alert(res.Pesan);
      });
    }
    console.log('getDuedate2', res);
  })
  .catch(error => {
    console.log(error);
  });
};

getMidtrans () {
    
    const userIDs = 'A0101';
    const doc_nos = 'WE10281173';
    const trxtypes = 'O113';
    // const amtbal = this.props.passed.mbal_amt;
    // const tower = this.props.passed.tower;
    // const namess = this.props.passed.name;

    // console.log('cek data tesss', tesss)
    // console.log('cek data userIDs', userIDs)
    // console.log('cek data doc_no', doc_nos)
    // console.log('cek data trxtypes', trxtypes)
    // console.log('cek data amtbal', amtbal)
    // const emailZ = this.state.email;
    // const nameZ = this.props.passed.name;



    const dataCC = {
        userID : userIDs,
        doc_no : doc_nos,
        trx_type : trxtypes
    }

    console.log('ehehe', dataCC)

    {
        isMount
            ? fetch("http://34.87.121.155:2121/serviceorder-api/api/orders", {
                  method: "POST",
                  // method:'POST',
                  body: JSON.stringify({ dataCC : dataCC }),
                 
                  })
                  .then((response) => response.json())
                  .then((res) => {
                      if (!res.Error) {
                          // const token = res.token;
                          const redirecturl = res.data.snap_url;
                          
                          this.setState({ redirects : redirecturl });
                          // console.log("get red", redirecturl);
                      } else {
                          this.setState(
                              { isLoaded: !this.state.isLoaded },
                              () => {
                                  // alert(res.Pesan)
                              }
                          );
                      }
                      console.log("getMidtrans", res);
                  })
                  .catch((error) => {
                      console.log(error);
                      
                      
                  })
            : null;
    }
}

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

onPayment(){
  // this.setState({ isLoaded: !this.state.isLoaded});
  this.setState({
      isVisible: !this.state.isVisible
  });

  const {
      userIDs,
      doc_nos,
      trxtypes

  } = this.state;

  const formData = {
      userID: userIDs,
      doc_no: doc_nos,
      trx_type: trxtypes,
  }
}

// ---------------- (end) FUNCTION FOR GET API ----------------------

  render() {
    // const redirecturlss = this.state.redirects;
    // console.log('cek urrl', redirecturlss)

    return (
      <NativeBaseProvider>
        <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        <View style={nbStyles.wrap}>
            {/* <Headers> */}
            <Box bg="white"
                shadow={5}
                rounded="lg"
                maxWidth="100%"
                style={{paddingBottom: 10}}>
                    <Heading size="md">
                        {/* {this.props.passed.name} */}
                    </Heading>
                    <Heading size="xs">
                    {/* {this.props.passed.tower} */}
                    </Heading>
            </Box>
            {/* </Headers> */}
            
            {
              this.state.duedate.map((data, key) =>
              <List style={{borderWidth: 0}} key={key}>
                <List.Item > 
                  <View style={{
                      flex: 1,
                      flexDirection: 'row',
                  }}>

                      <View style={{flex:1}}>
                          <Text style={{
                              color: '#3f3b38',
                              fontFamily: "Montserrat-Regular",
                              fontSize: 10
                          }}>{moment(data.doc_date).format('DD MMM YYYY')}</Text>
                       </View>

                       <View style={{flex: 0}}>
                          <Text style={{
                              color: '#3f3b38',
                              fontFamily: "Montserrat-Regular",
                              fontSize: 10,
                              alignContent: 'center',
                              alignSelf: 'center'
                           }}>{moment(data.due_date).format('DD MMM YYYY')}</Text>
                      </View>
                      
                      <View style={{flex:1}}>
                                    <Text style={{
                                        fontFamily: "Montserrat-Regular",
                                        fontSize: 10,
                                        alignContent: 'center',
                                        alignSelf: 'center'
                       }}>Rp. {numFormat(data.mbal_amt)}</Text>
                      </View>

                      <View style={{flex: 0, alignItems:'flex-end', alignContent: 'center', alignSelf: 'center'}}>
                        <TouchableOpacity 
                           style={{ borderRadius: 10, backgroundColor: '#DE2828', width: 60, height: 30 }}
                           onPress={() => {this.onPayment()}}
                            disabled={false}>
                                <Text style={{
                                     fontFamily: "Montserrat-Regular",
                                     fontSize: 10,
                                     color: '#000000',
                                                alignSelf: 'center',
                                                alignContent: 'center',
                                                textAlign: 'right',
                                                marginTop: 8
                                            }}>Not Paid</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                </List.Item>
            </List>
              )
            }
            
          </View>

          <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.setState({ isVisible: !this.state.isVisible });
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <WebView item={this.state} />
                    </View>
                </Modal>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

// export default Billing;
