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
  ActivityIndicator,
  StyleSheet,
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

import RenderHtml from 'react-native-render-html';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class Privacy extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Privacy & Policy',
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
      privacy: [],
      dateNow: new Date(),
      isVisible: false,
      isLoaded: true,
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
      this.getPrivacy();
    });
  }

  getPrivacy = () => {
    // this.setState({isLoaded: true});
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/privacy/',
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
          // this.setState({privacy: resData, isVisible: true}, () => {
          //   setTimeout(() => {
          //     this.setState({isVisible: false});
          //   }, 2000);
          // });
          //   setTimeout(() => {
          //     this.setState({isLoaded: true});
          //   }, 2000);
          this.setState({privacy: resData});
          this.setState({isLoaded: false});
        } else {
          this.setState({isLoaded: true}, () => {
            alert(res.Pesan);
          });
        }
        // this.setState({isLoaded: false});
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
    const {width} = Dimensions.get('window');
    return (
      <NativeBaseProvider>
        <ScrollView
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}>
          {this.state.isLoaded === false && this.state.privacy ? (
            this.state.privacy.map((item, index) => (
              <View key={index}>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.descriptions}}
                  enableExperimentalMarginCollapsing={true}
                />
              </View>
            ))
          ) : (
            <ActivityIndicator
              size="large"
              color="#00AFF0"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
          )}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
