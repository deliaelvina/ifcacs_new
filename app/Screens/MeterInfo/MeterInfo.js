import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  // SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform
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
import nbStyles from './StyleMeter';
import {sessions} from '../../_helpers';
import { ListItem, Icon } from 'react-native-elements'
import numFormat from "@Component/numFormat";

const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
import {Navigation} from 'react-native-navigation';
import moment from 'moment';
import WebView from "@Component/WebView";
import Title from '@Component/Title';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Style from './Style';
import { MonthInput } from '../../components/Input';

import YearMonthPicker from './yearMonthPicker';
import { thisExpression, throwStatement } from '@babel/types';
 
let isMount = false;


export default class MeterInfo extends React.Component {
  
  static options(passProps) {
    return {
      topBar: {
        title :{
          text: 'Meter Info',
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
      project_descs: "",

      dataMeter: [],
      dataProject: [],
      currentdate: [],
      docdate: [],
      mbalamt: [],
      duedate: [],
      due_date: [],

      // untuk tanggalan 
      chooseMonths: "",
      defaultMonths: [
        {'value':"1", 'descs':"1"},
        {'value':"2", 'descs':"2"},
        {'value':"3", 'descs':"3"},
        {'value':"4", 'descs':"4"},
        {'value':"5", 'descs':"5"},
        {'value':"6", 'descs':"6"},
        {'value':"7", 'descs':"7"},
        {'value':"8", 'descs':"8"},
        {'value':"9", 'descs':"9"},
        {'value':"10", 'descs':"10"},
        {'value':"11", 'descs':"11"},
        {'value':"12", 'descs':"12"}], 
      defaultYears: moment(new Date()).format("YYYY"), 
      getMonths: '',
      getYears: '',

      selectedIndex: 0,
      customStyleIndex: 0,
      setSelectedLanguage: 0,
      selectedLanguage: 0,
      setVisible: false,
      // userIDs: '',
      // doc_no: '',
      // trxtypes: ''
      userIDs : 'A0101',
      doc_nos : 'WE10281173',
      trxtypes : 'O113'
    };
    // this.setDate = this.setDate.bind(this);

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
    userDatas: await sessions.getSess('@UserProject'),
    mounted: true,
    isLogin: await sessions.getSess('@isLogin'),
  };
  console.log('data sess profil', data);
  // this.setState(data);
  this.setState(data, () => 
    // this.getMeterLoad(),
    // this.getBillingCurrent(this.state.selectedIndex === 1),
    // this.getMidtrans(),
    this.getProject()
  );
//   this.setState({
//     isVisible: !this.state.isVisible
// });
}

getMeterLoad = () => {
  // const isiDatas = datas.email;
  // const emails = this.state.email;

  const data = {
    Emailz: this.state.email,
    Dbprofilez: this.props.dataUserdata[0].db_profile,
    Entitycdz: this.props.dataUserdata[0].entity_cd,
    Projectnoz: this.props.dataUserdata[0].project_no,
    Monthz: this.state.defaultMonths,
    Yearz: this.state.defaultYears
  }

  console.log ('cek isi datas', data)
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getDataFilter' + '/'
    + data.Dbprofilez + '/' + data.Entitycdz + '/' + data.Projectnoz
    + '/' + data.Emailz + '/' + data.Monthz + '/' + data.Yearz,
    // 'http://34.87.121.155:2121/apisysadmin/api/getDataMeter' + '/' + data.Dbprofilez + '/' + data.Entitycdz + '/' + data.Projectnoz + '/' + data.Emailz,
    // 'http://34.87.121.155:2121/apisysadmin/api/getDataFilter/WPR/0001/0001/haniyya.ulfah@ifca.co.id/9/2020',
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      this.setState({dataMeter: resData, spinner:false});
      console.log('getMeterLoad', this.state.dataMeter);
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

getProject = () => {
  const data = {
    Emailz: this.state.email,
  }

  // console.log ('cek isi datas', isiDatas)
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getProject' + '/' + data.Emailz,
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      this.setState({dataProject: resData, spinner:false});
      console.log('getProject', this.state.dataProject);
      this.getMeterLoad()
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

showMode = (currentMode) => {
  this.state.setShow(true);
  this.state.setMode(currentMode);
};

showDatepicker = () => {
  this.showMode('date');
};

onChange = (event, selectedDate) => {
  const currentDate = selectedDate || this.state.startDate;
  this.state.setShow(Platform.OS === 'ios');
  this.state.setDate(currentDate);
};

meterType(type){
  if(type == "E"){
      return " KWH"
  }

  return " M3"
}

onRetrieve = () => {
  this.setState({ spinner: true})

  const data = {
    Emailz: this.state.email,
    Dbprofilez: this.props.dataUserdata[0].db_profile,
    Entitycdz: this.state.dataProject[0].entity_cd,
    Projectnoz: this.state.dataProject[0].project_no,
    Monthz: this.state.chooseMonths,
    Yearz: this.state.getYears
  }

  console.log ('cek isi retrieve', data )

  // const APIs = 'http://34.87.121.155:2121/apisysadmin/api/getDataFilter' + '/' + data.Dbprofilez + '/' + data.Entitycdz + '/' + data.Projectnoz + '/' + data.Emailz + '/' + data.Monthz + '/' + data.Yearz;
  // console.log ('cek isi apis', APIs )
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getDataFilter' + '/' + data.Dbprofilez + '/' + data.Entitycdz + '/' + data.Projectnoz + '/' + data.Emailz + '/' + data.Monthz + '/' + data.Yearz,
    {
      method:'GET',
      headers : this.state.hd,
    },
  )
  .then(response => response.json())
  .then(res => {
    console.log('cek res', res)
    if (!res.Error) {
      let resData = res.Data;
      this.setState({dataMeter: resData, spinner:false});
      // console.log('getMeterLoad', this);
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
                <Text style={nbStyles.title}>Meter Utility</Text>
                {/* <Button size="sm">
                  History Payment
                </Button> */}
            </View>

            {/* <Text style={nbStyles.subWrap}>
                Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text> */}
            </View>
            <View style={nbStyles.subWrap}>
            <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}>
                <Text style={nbStyles.subTitle2}>Project</Text>
                        <Picker
                        style={styles.Dropdown1}
                        mode={"dropdown"}
                        selectedValue={this.state.project_descs}
                        onValueChange={(val) =>
                          this.setState({ project_descs: val })
                        }>
                        {/* <Picker.Item label="Ini Project 1" value="java" /> */}
                        {
                          this.state.dataProject.map((data, key) => (
                            <Picker.Item
                              key={key}
                              label={data.descs}
                              value={data.project_no}
                            />
                          ))
                        }
                        {/* <Picker.Item label="Ini Project 2" value="js" /> */}
                        </Picker>
            </View> 
              <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#4E4E4E',
                    marginTop: 5}}
                    >Month</Text>
                  {/* <TouchableOpacity
                    pointerEvents="auto"
                    onPress={() => this.showDatepicker()}
                  > */}
                    {/* <View pointerEvents="none"> */}
                      {/* <TextInput
                            style={{
                              height: 40,
                              backgroundColor: "#f5f5f5",
                              color: "black",
                              paddingHorizontal: 10,
                              marginBottom: 10,
                              marginLeft: 15,
                              width: null,
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                            placeholder={this.state.defaultMonths}
                            placeholderTextColor="#a9a9a9"
                            // defaultValue={this.state.defaultMonths}
                            value={this.state.getMonths}
                            onChangeText={(val) => this.setState({ getMonths: val })}
                        /> */}
                    {/* </View> */}
                  {/* </TouchableOpacity> */}
                    <Picker
                        style={styles.Dropdown2}
                        mode={"dropdown"}
                        selectedValue={this.state.chooseMonths}
                        onValueChange={(val) =>
                          this.setState({ chooseMonths: val })
                        }>
                          {
                            this.state.defaultMonths.map((data, key) => (
                              <Picker.Item
                              key={key}
                              label={data.descs}
                              value={data.value}
                            />
                            ))
                          }
                    </Picker>
              </View>    
              <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#4E4E4E',
                    marginTop: 5}}
                    >Years</Text>
                                   <TextInput
                            style={{
                              height: 40,
                              backgroundColor: "#f5f5f5",
                              color: "black",
                              paddingHorizontal: 10,
                              marginBottom: 10,
                              marginLeft: 18,
                              width: 248,
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                            placeholder={this.state.defaultYears}
                            placeholderTextColor="#a9a9a9"
                            // defaultValue={this.state.defaultYears}
                            value={this.state.getYears}
                            onChangeText={(val) => this.setState({ getYears: val })}
                        />
              </View>   
              <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                <Text style={nbStyles.title}></Text>
                <Button size="sm" onPress={() => this.onRetrieve()}>
                  Retrieve
                </Button>
            </View>                
            </View>
            
            

           {/* <View style={nbStyles.subWrapTab}>
              <SegmentedControlTab
                  values={["Due", "Not Due"]}
                  selectedIndex={customStyleIndex}
                  onTabPress={this.handleCustomIndexSelect}
                  activeTabStyle={nbStyles.activeTabStyle}
                  activeTabTextStyle={nbStyles.activeTabTextStyle}
                  tabStyle={nbStyles.tabStyle}
                  tabTextStyle={nbStyles.tabTextStyle}
              />
           </View> */}
            
            {
              customStyleIndex === 0 && (
                <View style={styles.listview}>
                  
            {
                this.state.spinner ? 
                    <ActivityIndicator size='large' color="#37BEB7"/>
                :
                this.state.dataMeter.map((data,key)=>
                                <Box key ={key} style={styles.card}>
                                    <View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight:'500',
                                                textAlign:'left'
                                            }}>
                                                {data.lot_no}
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                                textAlign:'right',
                                                color:'#9B9B9B'
                                            }}>
                                                {data.descs}
                                            </Text>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight:'500',
                                                textAlign:'left',
                                                color:'#F99B23'
                                            }}>
                                                {data.name}
                                            </Text>
                                            <View>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight:'500',
                                                    textAlign:'right',
                                                    color:'#9B9B9B'
                                                }}>
                                                    {data.meter_id}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{borderBottomWidth :1,borderBottomColor : '#F3F3F3', marginTop: 5}}/>
                                        <View style={{flexDirection:'row',alignItems:'center',marginTop:5,justifyContent:'space-between'}}>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <Icon name="event" size={13} color="#9B9B9B"/>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight:'500',
                                                    textAlign:'left',
                                                    color:'#9B9B9B'
                                                    }}>
                                                    {moment(data.doc_date).format("DD MMM YYYY")}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <Icon name="attach-money" size={13} color="#F99B23"/>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight:'500',
                                                    textAlign:'left',
                                                    color:'#333'
                                                    }}>
                                                    {numFormat(data.trx_amt)}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Title */}
                                        <View style={{flexDirection:'row', justifyContent:'space-between' ,alignItems: 'center', marginTop: 8}}>
                                            
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                            }}>
                                                Current
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                            }}>
                                                Last
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                            }}>
                                                Total x{parseInt(data.multiplier)}
                                            </Text>
                                        </View>

                                        {/* Value */}
                                        <View style={{flexDirection:'row', justifyContent:'space-between' ,alignItems: 'center'}}>
                                            
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                                textAlign:'left'
                                            }}>
                                                {data.curr_read  + this.meterType(data.meter_type)}
                                            </Text>
                                            <Text>|</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                                textAlign:'left'
                                            }}>
                                                {data.last_read + this.meterType(data.meter_type)} 
                                            </Text>
                                            <Text>|</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight:'500',
                                                textAlign:'left'
                                            }}>
                                                {data.usage + this.meterType(data.meter_type)}
                                            </Text>
                                        </View>
                     </View>
                </Box>

                )}
            </View>

              )}


          </View>
                {/* <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.setState({ isVisible: !this.state.isVisible });
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <MonthInput
                          onPressConfirm={this.handleConfirm}
                          onPressCancel={() => {
                            this.setState({ isVisible: !this.state.isVisible });
                        }}
                        />
                    </View>
                </Modal> */}
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
  },
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 20,
    width: null,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
},

inputTime: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 16,
    width: deviceWidth * 0.4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
},
inputUsage: {
    height: 40,
    color: "black",
    marginBottom: 16,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
},
inputDate: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left"
},
btnMin: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#f1f1f1",
    width: deviceWidth * 0.08
},
btnPlus: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#f1f1f1",
    width: deviceWidth * 0.08
},
textBlack: {
  color: '#3f3b38',
  //fontFamily: 'Montserrat-Regular',
},
Dropdown1: {
  // fontFamily: Fonts.type.sfuiDisplaySemibold,
  borderBottomWidth: 0,
  borderColor: '#DDD',
  backgroundColor: '#f0f0f0',
  paddingHorizontal: 20,
  paddingVertical: 15,
  fontSize: 18,
  width: 250,
  marginBottom: 10,
  marginLeft: 10,
  borderRadius: 5,
  textAlignVertical: 'top',
  color:'#777777',
  // paddingLeft: Fonts.moderateScale(10),
},
Dropdown2: {
  // fontFamily: Fonts.type.sfuiDisplaySemibold,
  borderBottomWidth: 0,
  borderColor: '#DDD',
  backgroundColor: '#f0f0f0',
  paddingHorizontal: 20,
  paddingVertical: 15,
  fontSize: 18,
  width: 250,
  marginBottom: 10,
  marginLeft: 15,
  borderRadius: 5,
  textAlignVertical: 'top',
  color:'#777777',
  // paddingLeft: Fonts.moderateScale(10),
},
container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
},
showPickerBtn: {
  height: 44,
  backgroundColor: "#973BC2",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 16,
  borderRadius: 6,
},
yearMonthText: {
  fontSize: 20,
  marginTop: 12,
},
});
