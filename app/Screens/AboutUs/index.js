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
  Alert,
  Modal,
  NativeModules,
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

import {sessions} from '../../_helpers';

import colors from '../../Theme/Colors';

//for clear cache

var clearCacheModuleObj = NativeModules.ClearCacheModule;
console.log('clear cache', clearCacheModuleObj);

class AboutUs extends React.Component {
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
        backgroundColor: '#000000',
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
      mounted: false,
      isDisabled: false,

      username: '',
      email: '',
      token: '',
      userId: '',

      fotoProfil: require('@Asset/images/profile.png'),

      dataProfile: [],
      modalVisible: false,
      dataMenu: [
        {id: '1', menu: 'info personal'},
        {id: '2', menu: 'help'},
        {id: '3', menu: 'about us'},
        {id: '4', menu: 'sign out'},
      ],

      // for cache
      unit: '',
      cacheSize: '0',
    };

    Navigation.events().bindComponent(this);
  }

  async UNSAFE_componentWillMount() {
    // get the storage usage

    const data = {
      email: await sessions.getSess('@User'),
      username: await sessions.getSess('@Name'),
      token: await sessions.getSess('@Token'),
      userId: await sessions.getSess('@UserId'),
      mounted: true,
      isLogin: await sessions.getSess('@isLogin'),
    };
    console.log('data sess profil', data);
    this.setState(data, () => '');
  }

  handleNavigation = screenName => {
    this.setState({isDisable: true}, () => {
      this.goToScreen(screenName);
    });
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
    });
  };

  render() {
    return (
      <NativeBaseProvider>
        <View style={{flex: 1, backgroundColor: colors.bg_peach}}>
          {/* <Button onPress={() => this.setModalVisible(true)}>Logout</Button> */}
          <Text>About Us</Text>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>About Us</Text>
            <Text style={{fontSize: 13}}>
              Waterplace Residence adalah salah satu hasil karya PT. Pakuwon
              Dharma, Tbk. merupakan hunian prestisius yang memiliki 6 (enam)
              tower dengan total unit 2417 unit dan berlokasi di daerah Surabaya
              Barat. Waterplace Residence mulai dibangun sejak tahun 2005 dan
              serah terima unit dimulai sejak bulan Oktober 2009. Waterplace
              Residence dibangun lengkap dengan beberapa fasilitas pendukung,
              diantaranya kolam renang dengan bermacam tema (Lap Pool, Kids
              Pool, Baby Pool, Jacuzzi Pool, Beach Pool, Lazy Pool dan
              Continuous Pool), BBQ area, Multifunctional Ballroom, Gym, Club
              House, area parkir yang luas dan lobby di setiap tower. Waterplace
              Residence juga pernah mendapatkan penghargaan “Bangunan Hijau
              Kategori Apartemen” dari Pemerintah Kota Surabaya pada tahun 2014.
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Address</Text>
            <Text style={{fontSize: 13}}>
              Jl. Alteri No. 50, Kelapa Dua, Kebon Jeruk, Jakarta Barat
            </Text>
            <Text style={{fontSize: 13}}>Postcode : 10292</Text>
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Contact</Text>
            <Text style={{fontSize: 13}}>
              Badan Pengelola Waterplace Residence
            </Text>
            <Text style={{fontSize: 13}}>031 - 7390996</Text>
            <Text style={{fontSize: 13}}>bpl@waterplaceresidence.com</Text>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}

export default AboutUs;
