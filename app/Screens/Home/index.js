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
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  H3,
  Button,
  Header,
  Left,
  Body,
  Card,
  Icon,
  Title,
  Right,
  NativeBaseProvider,
} from 'native-base';

import {Navigation} from 'react-native-navigation';

import Style from '../../Theme/Style';

class Home extends React.Component {
  static options(passProps) {
    const isIos = Platform.OS === 'ios';

    return {
      topBar: {
        visible: false,
        // height : 0,
        drawBehind: true,
        background: {
          color: '#fff',
        },
      },
      statusBar: {
        style: isIos ? 'dark' : 'light',
        backgroundColor: '#008bbf',
      },
    };
  }

  handleOverlay = name => {
    Navigation.showOverlay({
      component: {
        name,
        options: {overlay: {interceptTouchOutside: true}},
      },
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isDisable: false,
      name: '',
      totalInvoice: 0,
      totalInvoiceDue: '.00',
      dateNow: 0,
      token: '',

      mounted: false,
      fotoProfil: require('@Asset/images/profile.png'),

      username: '',
      dash: [],
      dataNews: [],
      dataTower: [],
      dataProfile: [],

      scrollY: new Animated.Value(0),
    };

    Navigation.events().bindComponent(this);
  }

  render() {
    const {name} = this.state;
    return (
      <NativeBaseProvider>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <Text>ini home</Text>
          </View>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default Home;

const nbStyles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  leftHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: [Style.textBlack, Style.textLarge, {marginTop: 5}],
  subtitle: {
    textAlign: 'center',
    color: '#ACD2FA',
  },
  btn: {
    marginTop: 15,
  },

  icon_home: {
    width: 50,
    // height: 200
    height: 80,
  },
  mewnuWrap: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  textWelcome: [Style.textWhite, {fontSize: 18, paddingHorizontal: 16}],
  contentHeader: {
    paddingVertical: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#37BEB7',
    shadowOpacity: 0.5,
    elevation: 4,
    marginTop: 4,
    // borderWidth: 1,
    backgroundColor: 'rgba(0, 175, 240, 0.5)',
  },
};
