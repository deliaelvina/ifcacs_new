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
} from 'react-native';

import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from 'native-base';
import colors from '../../Theme/Colors';
import {color} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIC from 'react-native-vector-icons/Ionicons';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class Regulation extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Regulation / Document',
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
      regulation: [],
      dateNow: new Date(),
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
      this.getRegulation();
    });
  }

  getRegulation = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/regulations/',
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

          this.setState({regulation: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getRegulation', res);
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
          }}>
          {this.state.regulation.map((item, index) => (
            <TouchableOpacity
              // onPress={() => this.handleNavigation('screen.showPDF', item)}
              onPress={() => this.handleNavigation('screen.flipPDF', item)}
              key={index}
              style={{
                flexDirection: 'row',
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
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginRight: 10,
                  height: 50,
                  alignItems: 'center',
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
                  {item.regulations_title}
                </Text>
                <IconFA
                  name="chevron-right"
                  style={{
                    fontSize: 16,
                    paddingTop: 5,
                    marginRight: 10,

                    justifyContent: 'space-around',
                    color: colors.bg_abuabu,
                  }}></IconFA>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
