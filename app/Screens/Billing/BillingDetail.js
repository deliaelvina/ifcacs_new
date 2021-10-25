import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal
} from 'react-native';
import {
  Text,
  NativeBaseProvider,
  List,
  Box,
  Stack,
  Heading,
  Button
} from 'native-base';
import colors from '../../Theme/Colors';
import nbStyles from './Style';
import {sessions} from '../../_helpers';

import SegmentedControlTab from 'react-native-segmented-control-tab';
import BillingCardList from "@Component/Billing/BillingCardList";
import numFormat from "@Component/numFormat";

import {Navigation} from 'react-native-navigation';
import moment from 'moment';
import WebView from "@Component/WebView";
import Title from '@Component/Title';
// import { Button } from 'react-native-elements/dist/buttons/Button';
 

let isMount = false;

export default class BillingDetail extends React.Component {

  static options(passProps) {
    return {
      topBar: {
        title :{
          text: 'Billing',
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
      spinner : true,

      username: '',
      email: '',
      token: '',
      userId: '',

      duedate: [],
      currentdate: [],
      docdate: [],
      mbalamt: [],

      selectedIndex: 0,
      customStyleIndex: 0,

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
async componentDidMount() {
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
    this.getBilling(this.state.selectedIndex),
    // this.getBillingCurrent(this.state.selectedIndex === 1),
    this.getMidtrans()
  );
}

getBilling = (datas) => {
  const isiDatas = datas;
  const emails = this.state.email;

  console.log ('cek isi datas', isiDatas)
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getDataDue/WPR/' + emails,
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      this.setState({duedate: resData, spinner:false});
      console.log('getDuedates', this.state.duedate);
    } else {
      this.setState({isLoaded: true}, () => {
        alert(res.Pesan);
      });
    }
    // console.log('getDuedate2', res);
  })
  .catch(error => {
    console.log(error);
  });
};

getBillingCurrent = (datas) => {
  const isiDatas = datas;
  const emails = this.state.email;

  console.log ('cek isi datas', isiDatas)
  fetch(
    // 'http://34.87.121.155:2121/apisysadmin/api/getDataCurrent/WPR/' + emails,
    'http://34.87.121.155:2121/apisysadmin/api/getDataCurrent/WPR/haniyya.ulfah@ifca.co.id',
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      this.setState({currentdate: resData, spinner:false});
      console.log('getCurrentdates', resData);
    } else {
      this.setState({isLoaded: true}, () => {
        alert(res.Pesan);
      });
    }
    // console.log('getDuedate2', res);
  })
  .catch(error => {
    console.log(error);
  });
};

handleCustomIndexSelect = index => {
  this.setState({
      selectedIndex: index
  });

  this.getBillingCurrent(index);

  console.log("Selected index", this.state.selectedIndex);
};

// handleCustomIndexSelect = (index: number) => {
//   this.setState(prevState => ({...prevState, customStyleIndex: index}));
// };

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

    // -------------- FOR CONST ------------------
    const {customStyleIndex} = this.state;

    // -------------- (end) FOR CONST ------------------

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
            <View style={nbStyles.subWrap}>
              <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                <Text style={nbStyles.title}>Billing Info</Text>
                {/* <Text style={nbStyles.subTitle}>
                  Ini main data
                </Text> */}
                <Button size="sm">
                  History Payment
                </Button>
            </View>
           </View>

           <View style={nbStyles.subWrapTab}>
              <SegmentedControlTab
                  values={["Due", "Not Due"]}
                  selectedIndex={customStyleIndex}
                  onTabPress={this.handleCustomIndexSelect}
                  activeTabStyle={nbStyles.activeTabStyle}
                  activeTabTextStyle={nbStyles.activeTabTextStyle}
                  tabStyle={nbStyles.tabStyle}
                  tabTextStyle={nbStyles.tabTextStyle}
              />
           </View>
            
            {
              customStyleIndex === 0 && (
                <View style={styles.listview}>
                  {
                    this.state.spinner ?
                    <ActivityIndicator size='large' color="#37BEB7"/>
                    :
                    this.state.duedate.map((data, key) => 
                    <Box style={styles.card} key={key}>
                    <View>
                      
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight:'500',
                            textAlign:'left',
                            flex: 1,
                            flexWrap: 'wrap'
                        }}>
                            Project : {data.tower}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          fontWeight:'500',
                          textAlign:'right',
                          color:'#9B9B9B'
                        }}>
                           {moment(data.due_date).format("DD MMM YYYY")}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 7}}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                        }}>
                            {data.doc_no}
                        </Text>
                        {
                          data.status_paid && data.status_paid == 'Y' ? 
                          <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'right',
                            color:'#0096FF'
                          }}>
                             Paid
                          </Text>
                           :
                           data.status_paid && data.status_paid == 'N' || data.status_paid == null ?
                           <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'right',
                            color:'#EE4B2B'
                          }}>
                             Not Paid
                          </Text>
                          :
                          null
                        }
                        
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 7}}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left'
                        }}>
                            Doc date : {moment(data.due_date).format("DD MMM YYYY")}
                        </Text>
                        {
                          data.status_paid && data.status_paid == 'Y' ? 
                          <Button size="xs" disabled={true} style={{}}>
                          Payment
                        </Button>
                           :
                           data.status_paid && data.status_paid == 'N' || data.status_paid == null ?
                           <Button size="xs" onPress={() => {this.onPayment()}}>
                           Payment
                         </Button>
                          :
                          null
                        }

                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                        }}>
                            {data.descs}
                        </Text>
                    </View>

                    <View style={{borderBottomWidth :1,borderBottomColor : '#F3F3F3', marginTop: 5}}/>
                      <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>

                        {
                          data.status_paid && data.status_paid == 'Y' ? 
                          <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                            color:'#FF5733'
                      }}>
                           * This Transaction Will Be Removed After Finance Verification
                      </Text>
                           :
                           data.status_paid && data.status_paid == 'N' || data.status_paid == null ?
                           <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                            color:'#FF5733'
                      }}>
                           
                      </Text>
                          :
                          null
                        }
                        </View>
                      </View>

                    </View>
                  </Box>
                    )
                  }

                </View>
              )}

{
              customStyleIndex === 1 && (
                <View style={styles.listview}>
                  {
                    this.state.spinner ?
                    <ActivityIndicator size='large' color="#37BEB7"/>
                    :
                    this.state.currentdate.map((data, key) => 
                    <Box style={styles.card} key={key}>
                    <View>
                      
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight:'500',
                            textAlign:'left',
                            flex: 1,
                            flexWrap: 'wrap'
                        }}>
                            Project : {data.tower}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          fontWeight:'500',
                          textAlign:'right',
                          color:'#9B9B9B'
                        }}>
                           {moment(data.due_date).format("DD MMM YYYY")}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 7}}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                        }}>
                            {data.doc_no}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          fontWeight:'500',
                          textAlign:'right',
                          color:'#9B9B9B'
                        }}>
                           Paid
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 7}}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left'
                        }}>
                            Doc date : {moment(data.due_date).format("DD MMM YYYY")}
                        </Text>
                        <Button size="xs" onPress={() => {this.onPayment()}}>
                          Payment
                        </Button>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{
                            fontSize: 12,
                            fontWeight:'500',
                            textAlign:'left',
                        }}>
                            {data.descs}
                        </Text>
                    </View>

                    <View style={{borderBottomWidth :1,borderBottomColor : '#F3F3F3', marginTop: 5}}/>
                      <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{
                                fontSize: 12,
                                fontWeight:'500',
                                textAlign:'left',
                                color:'#FF5733'
                          }}>
                               * This Transaction Will Be Removed After Finance Verification
                          </Text>
                        </View>
                      </View>

                    </View>
                  </Box>
                    )
                  }

                </View>
              )}


            {/* Start Menu Kotak Kotak */}
            {/* <View style={nbStyles.menuWrap}> */}
              {/* <View style={nbStyles.btnLayout}> */}
                
              {/* </View> */}
            {/* </View> */}
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
const styles = StyleSheet.create({
  card :{
      backgroundColor: 'white',
      shadowOffset : { width:1, height: 1},
      shadowColor:"#fff",
      shadowOpacity:0.5,
      // elevation:5,
      paddingHorizontal:10,
      paddingVertical:10,
      borderRadius:5,
      margin: 10
  },  
  listview: {
      marginTop: '1%'
  },
  listitemm: {
      height: 100
  }
});
