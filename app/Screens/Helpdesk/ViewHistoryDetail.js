import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  NativeBaseProvider,
  Input,
  Box,
  VStack,
  HStack,
  Center,
  Heading,
  TextArea,
  ScrollView,
} from 'native-base';
import nbStyles from './Style';
import Style from '@Theme/Style';
import OfflineNotice from '@Component/OfflineNotice';
import numFormat from '@Component/numFormat';
import ModalSelector from 'react-native-modal-selector';
import {Navigation} from 'react-native-navigation';

import {_storeData, _getData} from '@Component/StoreAsync';
import {urlApi} from '@Config';
import {ticketDetail} from '../../_services';
import colors from '../../Theme/Colors';
import styleTheme from '../../Theme/Style';
import moment from 'moment';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import ImageView from 'react-native-image-viewing';

const dataPayment = [
  {
    type: 'C',
    descs: 'Cash',
  },
  {
    type: 'S',
    descs: 'Schedule',
  },
];

class ViewHistoryDetail extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
        title: {
          text: Platform.OS == 'ios' ? '' : 'Status Detail',
          //   color: colors.bg_abuabu,
        },
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
      isLoaded: true,
      email: '',
      name: '',
      dataTicket: [],
      billAmt: 0,
      item: [],
      service: [],
      showAmount: false,
      subTotalItem: 0,
      subTotalService: 0,
      selectedPayment: {
        type: 'C',
        descs: 'Cash',
      },
      selectedIndex: 0,
      dataImage: [],
      dataAction: [],
      arrImage: [],
      isImageViewVisible: false,
    };
  }

  async componentDidMount() {
    const email = await _getData('@User');
    const name = await _getData('@Name');
    const dataTicket = this.props.dataTicket;
    this.setState({email: email, name: name}, () => {
      this.getTicketDetail(dataTicket);

      //   if (dataTicket.status == 'S') {
      //     this.getTicketBilling(dataTicket);
      //   }
    });
  }

  async getTicketDetail(data) {
    const formData = {
      entity: data.entity_cd,
      project: data.project_no,
      report_no: data.report_no,
      email: this.state.email,
    };

    await ticketDetail.ticketMulti(formData).then(res => {
      console.log('res tiket multi', res);
      console.log('res tiket multi error', res.Error);
      if (res.Error === false) {
        let resData = res.Data[0]; //data dari api gak di map, di hardcode array ke 0
        let resImage = res.DataImage;
        let resAction = res.DataAction;

        console.log('res data tiket mmultti', resData);
        console.log('res data tiket image', resImage);
        console.log('res data action ', resAction);

        this.setState(
          {dataTicket: resData, dataImage: resImage, dataAction: resAction},
          () => {
            console.log('data', this.state.dataTicket);
          },
        );
      } else {
        this.setState({isDisabled: false});
      }
    });
  }

  saveConfirm = () => {
    const data = this.props.dataTicket;
    const formData = {
      entity: data.entity_cd,
      project: data.project_no,
      reportno: data.report_no,
      name: this.state.name,
      email: this.state.email,
      assignto: data.assign_to,
      payment_method: this.state.selectedPayment.type,
    };
    console.log('dataTicket', formData);

    // fetch(urlApi + 'c_ticket_history/saveConfirm/IFCAPB/', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     console.log('saveConfirm', res);
    //     this.showAlert(res.Pesan);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  showAlert(data) {
    Alert.alert(
      'Notification',
      data,
      [
        {
          text: 'OK',
          onPress: () => Navigation.popToRoot(this.props.componentId),
        },
      ],
      {cancelable: false},
    );
  }

  handleIndexChange = index => {
    console.log('index langsung klik', index);

    this.setState({
      selectedIndex: index,
    });

    console.log('Selected index', this.state.selectedIndex);
  };

  render() {
    console.log('datas', this.state.dataTicket);

    const deviceWidth = Dimensions.get('window').width;
    // const data = this.state.dataTicket;
    const wrapStyle = {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: 10,
    };
    const widthStyle = {
      width: (deviceWidth * 2) / 5,
    };
    const rowStyle = {
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
    const rowStyleTopBordered = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 0.5,
    };

    const rowItem = {
      flexWrap: 'wrap',
      width: '33%',
    };

    const title = {
      fontSize: 18,
      fontWeight: 'bold',
    };

    const btnConfirm = {
      width: '100%',
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#F9A233',
    };

    const borderBottomColor = {
      borderWidth: 1,
      borderBottomColor: '#f3f3f3',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: 'transparent',
    };
    const images = [
      {
        uri: this.state.url_image,
        //    title: this.state.news_title,
      },
    ];
    return (
      <NativeBaseProvider>
        <OfflineNotice />
        <View>
          {this.state.dataTicket.length !== 0 ? (
            <View>
              <SegmentedControlTab
                values={['Detail', 'Feedback']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                activeTabStyle={nbStyles.activeTabStyle}
                activeTabTextStyle={nbStyles.activeTabTextStyle}
                tabStyle={nbStyles.tabStyle}
                tabTextStyle={nbStyles.tabTextStyle}
              />
              {/* SELECTED TAB detail */}
              {this.state.selectedIndex === 0 && (
                <View style={{margin: 5}}>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Ticket No</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text># {this.state.dataTicket.report_no}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Date</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>
                          {moment(this.state.dataTicket.reported_date).format(
                            'DD-MM-YYYY hh:mm',
                          )}
                        </Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Name</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>{this.state.dataTicket.name}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Unit</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>{this.state.dataTicket.lot_no}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Contact No</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>{this.state.dataTicket.contact_no}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Reported By</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>{this.state.dataTicket.reported_by}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Complain Type</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>
                          {this.state.dataTicket.complain_type == 'C'
                            ? 'Complain'
                            : 'Request'}
                        </Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Category</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>{this.state.dataTicket.category}</Text>
                      </View>
                    </VStack>
                  </HStack>
                  <HStack space={4} alignItems="center">
                    <VStack>
                      <View style={widthStyle}>
                        <Text>Status</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View style={{width: 10}}>
                        <Text>:</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <View>
                        <Text>
                          {this.state.dataTicket.status == 'R'
                            ? 'Open'
                            : this.state.dataTicket.status == 'A'
                            ? 'Assign'
                            : this.state.dataTicket.status == 'S'
                            ? 'Need Confirmation'
                            : this.state.dataTicket.status == 'P'
                            ? 'Procces'
                            : this.state.dataTicket.status == 'F'
                            ? 'Confirm'
                            : this.state.dataTicket.status == 'V'
                            ? 'Solve'
                            : this.state.dataTicket.status == 'C'
                            ? 'Completed'
                            : this.state.dataTicket.status == 'D'
                            ? 'Done'
                            : ''}
                        </Text>
                      </View>
                    </VStack>
                  </HStack>

                  <View style={{marginTop: 10}}>
                    <View>
                      <Text>Work Requested</Text>
                    </View>
                    <View>
                      <View
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderColor: colors.grey,
                          borderRadius: 10,
                          borderWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{width: '100%'}}>
                          {this.state.dataTicket.work_requested}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <HStack
                    space={4}
                    alignItems="center"
                    style={{paddingTop: 10}}>
                    {this.state.dataImage.map(
                      (data, index) => (
                        console.log('data image nih', data.file_url),
                        console.log('index image nih', index),
                        (
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                isImageViewVisible: true,
                                url_image: data.file_url,
                              })
                            }>
                            <VStack key={index}>
                              <Image
                                source={{uri: data.file_url}}
                                style={{
                                  width: 200,
                                  height: 100,
                                  resizeMode: 'center',
                                }}></Image>
                            </VStack>
                          </TouchableOpacity>
                        )
                      ),
                    )}
                    <ImageView
                      images={images}
                      imageIndex={0}
                      animationType="fade"
                      visible={this.state.isImageViewVisible}
                      // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                      onRequestClose={() =>
                        this.setState({isImageViewVisible: false})
                      }
                    />
                  </HStack>
                </View>
              )}
              {/* END TAB detail */}
              {/* SELECTED TAB Feedback */}
              {this.state.selectedIndex === 1 &&
                (this.state.dataTicket.status != 'R' ? (
                  <View style={{marginHorizontal: 10}}>
                    <HStack space={4} alignItems="center">
                      <VStack>
                        <View style={widthStyle}>
                          <Text style={{fontFamily: 'Allison-Regular'}}>
                            Assign To
                          </Text>
                        </View>
                      </VStack>
                      <VStack>
                        <View style={{width: 10}}>
                          <Text>:</Text>
                        </View>
                      </VStack>
                      <VStack>
                        <View>
                          <Text>{this.state.dataTicket.assign_to}</Text>
                        </View>
                      </VStack>
                    </HStack>
                    <HStack space={4} alignItems="center">
                      <VStack>
                        <View style={widthStyle}>
                          <Text>Problem Cause</Text>
                        </View>
                      </VStack>
                      <VStack>
                        <View style={{width: 10}}>
                          <Text>:</Text>
                        </View>
                      </VStack>
                      <VStack>
                        <View>
                          <Text>{this.state.dataTicket.problem_cause}</Text>
                        </View>
                      </VStack>
                    </HStack>

                    {this.state.dataAction.map((data, index) => (
                      <View key={index} style={{marginVertical: 5}}>
                        <HStack space={4} alignItems="center">
                          <VStack>
                            <View style={widthStyle}>
                              <Text>Action By</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View>
                              <Text>{data.action_by}</Text>
                            </View>
                          </VStack>
                        </HStack>
                        <HStack space={4} alignItems="center">
                          <VStack>
                            <View style={widthStyle}>
                              <Text>Action Taken</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View>
                              <Text>{data.action_taken}</Text>
                            </View>
                          </VStack>
                        </HStack>
                        <HStack space={4} alignItems="center">
                          <VStack>
                            <View style={widthStyle}>
                              <Text>Action Date</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View style={{width: 10}}>
                              <Text>:</Text>
                            </View>
                          </VStack>
                          <VStack>
                            <View>
                              <Text>{data.action_date}</Text>
                            </View>
                          </VStack>
                        </HStack>
                      </View>
                    ))}

                    {/* <TouchableOpacity
                      style={btnConfirm}
                      onPress={() => this.saveConfirm()}>
                      <Text>Confirm</Text>
                    </TouchableOpacity> */}
                  </View>
                ) : (
                  <View>
                    <Text>No Feedback</Text>
                  </View>
                ))}
              {/* END TAB Feedback */}
            </View>
          ) : (
            <ActivityIndicator></ActivityIndicator>
          )}
        </View>
      </NativeBaseProvider>
    );
  }
}
export default ViewHistoryDetail;

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
