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

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIC from 'react-native-vector-icons/Ionicons';

import ImageView from 'react-native-image-viewing';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getDetailFacility} from '../../_services';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class Facility extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Facility',
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
        visible: false,
        drawBehind: true,
        animate: true,
      },
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      facility: [],
      detailfacility: [],
      dateNow: new Date(),
      isImageViewVisible: false,
      datagambar: [
        {
          id: 'ini judul untuk news',
          image:
            'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        },
        {
          id: 'ini judul untuk news',
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
        {
          id: 'c',
          value: 'C',
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
      ],
    };
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }

    const data = {
      // user: true,

      mounted: true,
    };
    console.log('data', data);
    this.setState(data, () => {
      this.getFacility();
    });
  }

  getFacility = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/facility/',
      // "https://my.api.mockaroo.com/news.json",
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Token: this.state.token
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          let resData = res.data;

          let data = [];
          //   console.log('resdata detail fasilitas', resData);
          resData.map(item => {
            if (item.rowID) {
              let datas = {
                ...item,

                // rowid: item.rowID,
                api: 'http://34.87.121.155:8000/ifcaprop-api/api/facility/',
              };
              //   console.log('rowid', rowid);

              //   this.detailFacility(rowid);
              data.push(datas);
              console.log('data fasilitas', data);
              this.setState({facility: data});
            }
          });
          //   this.detailFacility(rows);
          //   this.detailFacility({dataFacility: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getFacility', res);
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
    // const images = [
    //   {
    //     uri: this.state.datagambar,
    //     //    title: this.state.news_title,
    //   },
    // ];
    // console.log('images', images);

    console.log('this dettail facility', this.state.detailfacility);

    // const images = [
    //   {
    //     source: {
    //       uri: data.image,
    //     },
    //     title: data.id,
    //     width: null,
    //     height: null,
    //   },
    // ];
    return (
      <NativeBaseProvider>
        <ScrollView
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            backgroundColor: colors.bg_peach,
          }}>
          {this.state.facility.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                this.handleNavigation('screen.FacilityDetail', item)
              }>
              <View
                style={{
                  width: '100%',
                  height: 130,
                  // -- create shadow
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  // -- end create shadows
                  marginBottom: 10,
                  borderRadius: 15,
                  backgroundColor: colors.bg_putih,
                  flexDirection: 'row',
                }}>
                {/* {this.state.datagambar.map((indexIcon, itemIcon) => (
                  <View key={indexIcon}>
                    <Image source={{uri: itemIcon.image}}></Image>
                  </View>
                ))} */}

                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 45,
                    marginLeft: 10,
                    marginTop: 10,
                    backgroundColor: colors.bg_peachmuda,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // -- create shadow
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    // -- end create shadows
                  }}>
                  <Image
                    source={{uri: item.facility_icon}}
                    style={{width: 55, height: 55, bottom: 10}}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.bg_abuabu,
                      //fontFamily: "Bold",
                      fontSize: 14,
                      paddingHorizontal: 10,
                      width: '100%',
                      //   justifyContent: 'space-around',
                      // alignContent: 'center',
                      // alignItems: 'baseline',
                      fontWeight: 'bold',
                      //   textAlign: 'justify',
                    }}>
                    {item.facility_name}
                  </Text>

                  <Text
                    style={{
                      color: colors.bg_abuabu,
                      //fontFamily: "Bold",
                      fontSize: 14,
                      paddingHorizontal: 10,
                      width: '100%',
                      //   justifyContent: 'space-around',
                      // alignContent: 'center',
                      // alignItems: 'baseline',
                      //   fontWeight: 'bold',
                      //   textAlign: 'justify',
                    }}>
                    {item.facility_descs}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

{
  /* <TouchableOpacity
  onPress={() => this.handleNavigation('screen.FacilityDetail', item)}
  key={index}
  style={{
    // flexDirection: 'row',
    backgroundColor: colors.bg_putih,
    paddingLeft: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    // -- create shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    // -- end create shadows
  }}>
  <Text
    style={{
      color: colors.bg_abuabu,
      //fontFamily: "Bold",
      fontSize: 14,
      //   paddingHorizontal: 10,
      width: '93%',
      //   justifyContent: 'space-around',
      // alignContent: 'center',
      // alignItems: 'baseline',
      //   fontWeight: 'bold',
      //   textAlign: 'justify',
    }}>
    {item.facility_name}
  </Text>
  <Text
    style={{
      color: colors.bg_abuabu,
      //fontFamily: "Bold",
      fontSize: 14,
      //   paddingHorizontal: 10,
      width: '93%',
      //   justifyContent: 'space-around',
      // alignContent: 'center',
      // alignItems: 'baseline',
      //   fontWeight: 'bold',
      //   textAlign: 'justify',
    }}>
    {item.facility_descs}
  </Text>
</TouchableOpacity>; */
}
