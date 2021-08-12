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

export default class FacilityDetail extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: Platform.OS == 'ios' ? '' : 'Facility',
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
      detailfacility: [],
      dateNow: new Date(),
      isImageViewVisible: false,
    };
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    console.log('item from passed prop', this.props.passed);
    const dataFacility = this.props.passed;
    const data = {
      // user: true,
      rowid: dataFacility.rowID,
      api: dataFacility.api,
      facility_name: dataFacility.facility_name,
      facility_descs: dataFacility.facility_descs,

      mounted: true,
    };
    console.log('data', data);
    this.setState(data, () => {
      this.detailFacility(data);
    });
  }

  async detailFacility(value) {
    // console.log('value detail facility', value);

    await getDetailFacility.getDetail(value).then(res => {
      //   console.log('res di deetail fas', res);
      const data = res.data;
      console.log('detail fasilitas', data);
      this.setState({detailfacility: data});
    });
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
  renderItem = item => {
    console.log('item render resData', item.item);
    console.log('item.item.facility_image', item.item.facility_image);

    return (
      //   <TouchableOpacity
      //     style={{margin: 10}}
      //     onPress={() => this.setState({isImageViewVisible: true})}>
      <Image
        source={{uri: item.item.facility_image}}
        style={{
          height: 200,
          width: '100%',

          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      //   </TouchableOpacity>
    );
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
          }}>
          <View style={{paddingBottom: 20}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.bg_abuabu,
              }}>
              {this.state.facility_name}
            </Text>
            <Text
              style={{
                fontSize: 12,

                color: colors.bg_abuabu,
              }}>
              {this.state.facility_descs}
            </Text>
            {this.state.detailfacility.map((item, index) => (
              <View key={index}>
                <Image
                  source={{uri: item.facility_image}}
                  style={{
                    width: '100%',
                    height: 200,
                    marginVertical: 5,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              </View>
            ))}
          </View>

          {/* <FlatList
            contentContainerStyle={{
              alignSelf: 'center',
              justifyContent: 'center',

              flex: 1,
              marginVertical: 20,
              marginHorizontal: 10,
            }}
            keyExtractor={item => item.id}
            data={this.state.detailfacility}
            renderItem={this.renderItem}
            numColumns={3}
          /> */}
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
