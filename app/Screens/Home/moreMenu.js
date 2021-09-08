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
  ImageBackground,
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
  HStack,
  VStack,
  Box,
  Divider,
  Pressable,
  Avatar,
} from 'native-base';

import {Navigation} from 'react-native-navigation';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Style from '../../Theme/Style';
// import OfflineNotice from '@Component/OfflineNotice';
import {sessions} from '../../_helpers';
import colors from '../../Theme/Colors';
import {
  profilService,
  // dashboardService,
  // newsService
} from '../../_services';

import IconFA from 'react-native-vector-icons/FontAwesome';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 0;
const {height, width} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';

class moreMenu extends React.Component {
  static options(passProps) {
    const isIos = Platform.OS === 'ios';

    return {
      topBar: {
        title: {
          text: 'More',
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
      statusBar: {
        style: isIos ? 'dark' : 'light',
        backgroundColor: '#000000',
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
      refreshing: false,
      isDisable: false,
      name: '',
      totalInvoice: 0,
      totalInvoiceDue: '0',
      dateNow: 0,
      token: '',
      username: '',

      // announce: [],

      scrollY: new Animated.Value(0),
      noOfPic: 2,

      bannerHeader: 'Y',
      promobanner: [],

      //for carousel
      activeIndex: 0,
    };

    Navigation.events().bindComponent(this);
  }

  // async componentDidMount() {
  //   this.startHeaderHeight = 150;
  //   if (Platform.OS == 'android') {
  //     this.startHeaderHeight = 100 + StatusBar.currentHeight;
  //   }

  //   const data = {
  //     email: await sessions.getSess('@User'),
  //     // user: await sessions.getSess('@isLogin'),
  //     user: true,

  //     name: await sessions.getSess('@Name'),
  //     // navigation: this.props.navigation,
  //   };
  //   console.log('data', data);

  //   this.setState(data, () => {
  //     this.getNews();
  //     this.getPromo();
  //     this.getAnnouncement();
  //   });
  // }

  async UNSAFE_componentWillMount() {
    this.startHeaderHeight = 150;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }

    const data = {
      email: await sessions.getSess('@User'),
      name: await sessions.getSess('@Name'),
      token: await sessions.getSess('@Token'),
      userId: await sessions.getSess('@UserId'),
      dataTower: await sessions.getSess('@UserProject'),
      user: await sessions.getSess('@isLogin'),
      // user: true,

      mounted: true,
    };

    console.log('data', data);

    this.setState(data, () => {});
  }

  async componentDidAppear() {
    let refresh = await sessions.getSess('@RefreshProfile');
    if (this.state.mounted) {
      if (refresh) {
        sessions.setSess('@RefreshProfile', false);
        this.getProfile();
        // this.getNews();
        // this.getPromo();
        // this.getAnnouncement();
      }
    }
  }

  getProfile = () => {
    const data = {
      email: this.state.email,
      userId: this.state.userId,
    };

    profilService.getData(data).then(res => {
      console.log('res prof', res);
      const resData = res.Data[0];
      // ? Agar Gambar Tidak ter cache
      this.setState({
        dataProfile: resData,
      });
    });
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    // this.loadData()
    this.getInvoice();

    this.getNews();
    this.getPromo();
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

  componentDidDisappear() {
    this.setState({isDisable: false});
  }
  render() {
    // console.log('total invoice', this.state.totalInvoice);

    return (
      <NativeBaseProvider>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.bg_putih,
          }}>
          {/* <OfflineNotice /> */}

          <VStack
            space={5}
            paddingTop={5}
            marginHorizontal={8}
            divider={
              <Divider my={2} style={{width: '85%', right: 10, left: 60}} />
            }>
            <TouchableOpacity
              onPress={() => this.handleNavigation('screen.RentSale')}>
              <HStack>
                <Image
                  // source={require('@Asset/icons/billing.png')}
                  source={require('@Asset/icons/menu_icon/fasilitas.png')}
                  style={{
                    // left: 3,
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // -- create shadow
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.1,
                    // elevation: 3,
                    // -- end create shadow
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  Rent & Sale
                </Text>

                <IconFA
                  name="chevron-right"
                  style={{
                    fontSize: 14,
                    color: colors.bg_coklat,

                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity>
              <HStack>
                <Image
                  // source={require('@Asset/icons/billing.png')}
                  source={require('@Asset/icons/menu_icon/fasilitas.png')}
                  style={{
                    // left: 3,
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // -- create shadow
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.1,
                    // elevation: 3,
                    // -- end create shadow
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  Promo
                </Text>
                <IconFA
                  name="chevron-right"
                  style={{
                    fontSize: 14,
                    color: colors.bg_coklat,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                />
              </HStack>
            </TouchableOpacity>
          </VStack>
        </ImageBackground>
      </NativeBaseProvider>
    );
  }
}

export default moreMenu;

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
