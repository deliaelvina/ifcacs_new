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
import IconFA from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';

//for clear cache

var clearCacheModuleObj = NativeModules.ClearCacheModule;
console.log('clear cache', clearCacheModuleObj);

class AboutUs extends React.Component {
  //   static options(passProps) {
  //     const isIos = Platform.OS === 'ios';

  //     return {
  //       topBar: {
  //         visible: false,
  //         // height : 0,
  //         drawBehind: true,
  //         background: {
  //           color: '#fff',
  //         },
  //       },
  //       statusBar: {
  //         style: isIos ? 'dark' : 'light',
  //         backgroundColor: '#000000',
  //       },
  //     };
  //   }
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'About Us',
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

      about: [],
      modalVisible: false,

      // for cache
      unit: '',
      cacheSize: '0',
    };

    Navigation.events().bindComponent(this);
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
      this.getAboutUs();
    });
  }

  getAboutUs = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/about/',
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
          let resData = res.data[0]; //hardcode array [0]

          this.setState({about: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getAboutUs', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bg_putih,
              paddingHorizontal: 10,
            }}>
            {/* <Button onPress={() => this.setModalVisible(true)}>Logout</Button> */}
            {/* <Text>About Us</Text> */}
            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.bg_hijaugelap,
                }}>
                About Us
              </Text>
            </View>

            <View
              style={{
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: '100%',
                // -- create shadow
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                backgroundColor: colors.bg_putih,
                borderRadius: 15,
              }}>
              <Text style={{fontSize: 13, textAlign: 'justify'}}>
                {this.state.about.about_us}
                Waterplace Residence adalah salah satu hasil karya PT. Pakuwon
                Dharma, Tbk. merupakan hunian prestisius yang memiliki 6 (enam)
                tower dengan total unit 2417 unit dan berlokasi di daerah
                Surabaya Barat. Waterplace Residence mulai dibangun sejak tahun
                2005 dan serah terima unit dimulai sejak bulan Oktober 2009.
                Waterplace Residence dibangun lengkap dengan beberapa fasilitas
                pendukung, diantaranya kolam renang dengan bermacam tema (Lap
                Pool, Kids Pool, Baby Pool, Jacuzzi Pool, Beach Pool, Lazy Pool
                dan Continuous Pool), BBQ area, Multifunctional Ballroom, Gym,
                Club House, area parkir yang luas dan lobby di setiap tower.
                Waterplace Residence juga pernah mendapatkan penghargaan
                “Bangunan Hijau Kategori Apartemen” dari Pemerintah Kota
                Surabaya pada tahun 2014.
              </Text>
            </View>

            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.bg_hijaugelap,
                }}>
                Address
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: '100%',
                // -- create shadow
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                backgroundColor: colors.bg_putih,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <IconFA
                  active
                  name="map-pin"
                  size={20}
                  color={colors.bg_coklat}
                  style={{marginHorizontal: 10}}
                />
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: 'justify',
                    paddingRight: 15,
                  }}>
                  {this.state.about.address}
                </Text>
              </View>
            </View>

            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.bg_hijaugelap,
                }}>
                Contact
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: '100%',
                // -- create shadow
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                backgroundColor: colors.bg_putih,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <IconFA
                  active
                  name="user-circle-o"
                  size={20}
                  color={colors.bg_coklat}
                  style={{marginHorizontal: 5}}
                />

                <Text style={{fontSize: 13, textAlign: 'justify'}}>
                  {this.state.about.contact_name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <IconFA
                  active
                  // name="facebook"
                  // type={MaterialCommunityIcons}
                  name={'envelope-o'}
                  size={20}
                  color={colors.bg_coklat}
                  style={{marginHorizontal: 5}}
                />
                <Text style={{fontSize: 13, textAlign: 'justify'}}>
                  {this.state.about.contact_email}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <IconFA
                  active
                  name={'phone'}
                  size={20}
                  color={colors.bg_coklat}
                  style={{marginHorizontal: 5}}
                />
                <Text style={{fontSize: 13, textAlign: 'justify'}}>
                  {this.state.about.contact_no}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export default AboutUs;
