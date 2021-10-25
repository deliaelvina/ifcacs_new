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
import moment from 'moment';

import PromoList from '../Promo/PromoList';
import NoPromo from '../Promo/NoPromo';

import NewsList from '../News/NewsList';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry from '@Component/SliderEntry/SliderEntry';
import styleSlider from './styleSlider';
import ItemsHeader from '../../components/SliderEntry/ItemsHeader';

import {
  sliderWidthAnnounce,
  itemWidthAnnounce,
} from '../../components/MomentumCarousel/styles/SliderEntry.style';
import stylesAnnounce from '../../components/MomentumCarousel/styles/index.style';
import SliderEntryAnnounce from '../../components/MomentumCarousel/components/SliderEntry';

import InvoiceCard from '../../components/Home/InvoiceCard';
import {color} from 'styled-system';
// import ItemCarousel from '../../components/ItemCarousel/item';
// import LinearGradient from 'react-native-linear-gradient';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 0;
const {height, width} = Dimensions.get('window');

// console.log('invoice', InvoiceCard);

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
      refreshing: false,
      isDisable: false,
      name: '',
      totalInvoice: 0,
      totalInvoiceDue: '0',
      dateNow: 0,
      token: '',
      username: '',
      dash: [],
      dataNews: [],
      dataTower: [],
      dataProfile: [],
      news: [],
      promo: [],
      dashmenu: [],
      dashmenuLoop: [],
      // announce: [],

      scrollY: new Animated.Value(0),
      noOfPic: 2,

      bannerHeader: 'Y',
      promobanner: [],

      //for carousel
      activeIndex: 0,

      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
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
    const dashmenu = await sessions.getSess('@DashMenu');
    const data = {
      email: await sessions.getSess('@User'),
      name: await sessions.getSess('@Name'),
      token: await sessions.getSess('@Token'),
      userId: await sessions.getSess('@UserId'),
      dataTower: await sessions.getSess('@UserProject'),
      user: await sessions.getSess('@isLogin'),
      dashmenu: await sessions.getSess('@DashMenu'),
      // user: true,

      mounted: true,
    };

    console.log('data', data);

    this.setState(data, () => {
      this.getNews();
      this.getPromo();
      this.loopDashMenu(dashmenu);
    });
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

  //------ for carousel promo header
  renderHeaderCarousel = ({item, index}, parallaxProps) => {
    // console.log('index render carousel', index);s
    return (
      <ItemsHeader
        item={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        // onPress={() => this.handleNavigation('screen.NewsDetail', item.id)}
      />
    );
  };

  headerCarousel(number, title) {
    // console.log('stte promo', this.state.promo);
    // const slider1ActiveSlide = this.state;
    return this.state.promo == null ? (
      <View>
        <Text>belom ada promo</Text>
      </View>
    ) : (
      <View>
        <Carousel
          sliderWidth={width + 25}
          sliderHeight={width}
          itemWidth={width}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          firstItem={SLIDER_1_FIRST_ITEM}
          ref={c => (this._slider1Ref = c)}
          //dari google
          // layout={'default'}
          data={this.state.promobanner}
          autoplayInterval={4000}
          autoplay
          loop
          hasParallaxImages={true}
          inactiveSlideScale={1}
          loopClonesPerSide={this.state.promobanner.length - 1}
          renderItem={this.renderHeaderCarousel}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={this.state.promobanner.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={{
            paddingTop: 8,
            paddingBottom: 0,
            marginBottom: 0,
            // backgroundColor: '#000',
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            // marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            // marginTop: 5,
            paddingTop: 0,
            top: 0,
          }}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
          inactiveDotStyle={{backgroundColor: colors.goldUrban}}
          inactiveDotOpacity={0.4}
          delayPressInDot={500}
        />
      </View>
    );
  }
  //----- close carousel promo header

  //------ for carousel announce
  _renderItem({item, index}) {
    return <SliderEntryAnnounce data={item} even={(index + 1) % 2 === 0} />;
  }

  announceCarousel(number, title) {
    return (
      <View style={stylesAnnounce.exampleContainer}>
        {/* <Text style={stylesAnnounce.title}>{`Example ${number}`}</Text> */}
        {/* <Text style={stylesAnnounce.subtitle}>{title}</Text> */}
        <Carousel
          data={this.state.promo}
          renderItem={this._renderItem}
          sliderWidth={sliderWidthAnnounce}
          itemWidth={itemWidthAnnounce}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={'start'}
          containerCustomStyle={stylesAnnounce.slider}
          contentContainerCustomStyle={stylesAnnounce.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
      </View>
    );
  }

  // getInvoice = async () => {
  //   const {db_profile} = this.state.dataTower[0];
  //   const data = {
  //     cons: db_profile,
  //     email: this.state.email,
  //   };

  //   dashboardService.getInvoice(data).then(res => {
  //     const Data = res;
  //     const inv = Data.totalInvoice;
  //     const invDue = Data.totalInvoiceDue;
  //     this.setState(
  //       {
  //         totalInvoice: inv,
  //         totalInvoiceDue: invDue,
  //         dateNow: Data.dateNow,
  //       },
  //       () => {
  //         sessions.setSess('@TotalInvoiceDue', invDue);
  //       },
  //     );
  //     this.setState({refreshing: false});
  //   });
  // };

  // getProfile = () => {
  //   const data = {
  //     email: this.state.email,
  //     userId: this.state.userId,
  //   };

  //   profilService.getData(data).then(res => {
  //     console.log('res prof', res);
  //     const resData = res.Data[0];
  //     // ? Agar Gambar Tidak ter cache
  //     this.setState({
  //       dataProfile: resData,
  //     });
  //   });
  // };

  getNews = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/news/',
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
        // console.log('res news', res);
        if (!res.Error) {
          const resData = res.data;
          // console.log('res data news', resData);
          this.setState({news: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.pesan);
          });
        }
        // console.log('getNews', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPromo = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/promo',
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
          let databanners = [];
          // console.log('resdata promo', resData);
          resData.map(item => {
            if (item.banner == 'Y') {
              let banners = {
                ...item,
                banner: item.banner,
              };
              // console.log('banners', banners);
              databanners.push(banners);
            }
          });
          // console.log('databanner', databanners);
          this.setState({promo: resData});
          this.setState({promobanner: databanners});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        // console.log('getPromo', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  loopDashMenu(dashmenu) {
    console.log('dashmenuu loop', dashmenu);

    for (let index = 0; index < dashmenu.length; index++) {
      const element = dashmenu[index];
      if (dashmenu[index].priority == 1) {
        this.setState({dashmenuLoop: element});
      }
      console.log('element loop', element);
    }
    console.log('dashmenuloop', this.state.dashmenuLoop);
  }

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

  goToFeed = (dataPriority, passedProps) => {
    const screenName = dataPriority.URL;
    this.setState({isDisable: true}, () => {
      this.goToScreen(screenName, passedProps);
    });
    // if (val.isProject == 1) {
    //   Actions.project({goTo: val.URL_angular});
    // } else {
    //   Actions[val.URL_angular]();
    // }
  };

  componentDidDisappear() {
    this.setState({isDisable: false});
  }
  render() {
    const {name} = this.state;
    const {user} = this.state;
    // console.log('total invoice', this.state.totalInvoice);

    const headerCarousel = this.headerCarousel();

    return (
      <NativeBaseProvider>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.bg_putih,
          }}>
          {/* <OfflineNotice /> */}
          <SafeAreaView
            style={{
              backgroundColor: colors.bg_peachmuda,
              height: Platform.OS === 'ios' ? 130 : 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontSize: 20,
                    paddingTop: Platform.OS === 'ios' ? 20 : 30,
                    //fontFamifly: 'Bold',

                    color: colors.bg_coklat,
                  }}>
                  Welcome back,
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontSize: 20,
                    marginBottom: 20,
                    //fontFamily: 'Bold',

                    color: colors.bg_coklat,
                  }}>
                  {this.state.user != null ? (
                    this.state.name
                  ) : (
                    <Text
                      style={{
                        paddingHorizontal: 15,
                        fontSize: 20,
                        paddingTop: 20,
                        marginBottom: 20,
                        //fontFamily: 'Bold',

                        color: color.bg_coklat,
                      }}>
                      Friends
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <ScrollView>
            {/* {example1} */}
            {headerCarousel}

            {user != null ? (
              <View
                style={{
                  // flexDirection: "row",
                  backgroundColor: '#fff',
                  marginTop: 25,
                  // paddingBottom: 5,
                  marginHorizontal: 10,
                  borderRadius: 20,
                  paddingVertical: 5,
                  // paddingLeft: 30,
                  marginBottom: 15,
                  // width: '100%'

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
                <Grid>
                  <Col
                    style={{
                      marginHorizontal: 5,
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 70,
                      bottom: 5,
                    }}>
                    {/* <Icon name="receipt-outline" style={{ fontSize: 30, padding: 5, color: colors.bg_abuabu }}></Icon> */}
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        // source={require('@Asset/icons/billing.png')}
                        source={require('@Asset/icons/menu_icon/invoicedue.png')}
                        style={{width: 35, height: 35}}
                      />
                    </View>

                    <View style={{flexGrow: 1, flexDirection: 'column'}}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 13,
                          //fontFamily: 'Bold',
                          fontWeight: 'bold',
                        }}>
                        INVOICE DUE
                      </Text>
                      <Text
                        style={[
                          Style.textGreyLight,
                          {
                            fontSize: 12,
                            textAlign: 'left',
                            fontWeight: '300',
                          },
                        ]}>
                        Date {this.state.dateNow}
                      </Text>
                      <View style={{flexDirection: 'row', top: 10}}>
                        <Text
                          style={{
                            color: colors.bg_abuabu,
                            fontSize: 15,
                            //fontFamily: 'Bold',
                            textAlign: 'left',
                            fontWeight: 'bold',
                          }}>
                          Rp.{' '}
                        </Text>
                        <Text
                          style={{
                            color: colors.bg_abuabu,
                            fontSize: 15,
                            //fontFamily: 'Bold',
                            fontWeight: 'bold',
                            // textAlign: 'right',
                            // flex: 1
                          }}>
                          {this.state.totalInvoice}
                        </Text>
                      </View>
                    </View>
                  </Col>
                  <Col
                    style={{
                      marginHorizontal: 5,
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 70,
                      bottom: 5,
                    }}>
                    {/* <Icon name="receipt-outline" style={{ fontSize: 30, padding: 5, color: colors.bg_abuabu }}></Icon> */}
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('@Asset/icons/menu_icon/totalinvoice.png')}
                        style={{width: 35, height: 35}}
                      />
                    </View>
                    <TouchableOpacity
                      style={{flexGrow: 1, flexDirection: 'column'}}
                      onPress={() =>
                        this.handleNavigation(
                          'screen.Billing',
                          this.state.totalInvoiceDue,
                        )
                      }>
                      <View>
                        <Text
                          style={{
                            color: colors.bg_abuabu,
                            fontSize: 13,
                            //fontFamily: 'Bold',
                            fontWeight: 'bold',
                          }}>
                          TOTAL
                        </Text>
                        <Text
                          style={{
                            color: colors.bg_abuabu,
                            fontSize: 15,
                            //fontFamily: 'Bold',
                            textAlign: 'left',
                            fontWeight: 'bold',
                          }}>
                          {this.state.totalInvoiceDue}
                        </Text>
                        <TouchableOpacity
                          style={{top: 10}}
                          onPress={
                            () => alert(this.state.totalInvoiceDue)
                            // this.handleNavigation(
                            //   'screen.Billing',
                            //   this.state.totalInvoiceDue,
                            // )
                          }>
                          <Text style={{fontSize: 14, color: colors.bg_coklat}}>
                            View all
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            ) : (
              <View style={{marginBottom: 25}}></View>
            )}

            <View style={{marginTop: 20}}>
              <Grid>
                {this.state.dashmenu.map((dataPriority, indexPriority) =>
                  dataPriority.priority === '1' ? (
                    <Col
                      style={{
                        height: 100,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      key={indexPriority}>
                      <TouchableOpacity
                        onPress={() =>
                          this.goToFeed(
                            dataPriority,
                            'props dashmenu ceritanya',
                          )
                        }>
                        <View
                          style={{
                            width: 47,
                            height: 47,
                            borderRadius: 25,
                            backgroundColor: colors.bg_peachmuda,
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            // -- create shadow
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                            // -- end create shadow
                          }}>
                          <Image
                            // source={require('@Asset/icons/billing.png')}
                            source={{uri: dataPriority.file_url}}
                            // source={require('@Asset/icons/menu_icon/billing2.png')}
                            style={{
                              bottom: 5,
                              left: 3,
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
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            paddingTop: 5,
                            color: colors.bg_abuabu,
                            fontSize: 14,
                            //fontFamily: 'Bold',
                            paddingLeft: 5,
                            textAlign: 'center',
                          }}>
                          {dataPriority.title_descs}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                  ) : null,
                )}
              </Grid>
              <Grid>
                {this.state.dashmenu.map((dataPriority, indexPriority) =>
                  dataPriority.priority === '2' ? (
                    <Col
                      style={{
                        height: 100,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      key={indexPriority}>
                      <TouchableOpacity
                        onPress={() =>
                          this.goToFeed(
                            dataPriority,
                            'props dashmenu ceritanya',
                          )
                        }>
                        <View
                          style={{
                            width: 47,
                            height: 47,
                            borderRadius: 25,
                            backgroundColor: colors.bg_peachmuda,
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            // -- create shadow
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                            // -- end create shadow
                          }}>
                          <Image
                            // source={require('@Asset/icons/billing.png')}
                            source={{uri: dataPriority.file_url}}
                            // source={require('@Asset/icons/menu_icon/billing2.png')}
                            style={{
                              bottom: 5,
                              left: 3,
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
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            paddingTop: 5,
                            color: colors.bg_abuabu,
                            fontSize: 14,
                            //fontFamily: 'Bold',
                            paddingLeft: 5,
                            textAlign: 'center',
                          }}>
                          {dataPriority.title_descs}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                  ) : null,
                )}
              </Grid>
            </View>

            {Platform.OS == 'ios' ? (
              // {/* -------- MENU - MENU IOS----------- */}
              <View style={{marginTop: 15}}>
                <Grid>
                  <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  
                    <View
                      style={{
                        width: 47,
                        height: 47,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        // -- create shadow
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        // -- end create shadow
                      }}>
                      <Image
                        // source={require('@Asset/icons/billing.png')}
                        source={require('@Asset/icons/menu_icon/billing2.png')}
                        style={{
                          bottom: 5,
                          left: 3,
                          width: 40,
                          height: 40,
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        paddingTop: 5,
                        color: colors.bg_abuabu,
                        fontSize: 14,
                        //fontFamily: 'Bold',
                        paddingLeft: 5,
                        textAlign: 'center',
                      }}>
                      Billing
                    </Text>
                    {/* </TouchableOpacity> */}
                  </Col>

                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Helpdesk')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/helpdesk3.png')}
                          style={{
                            bottom: 5,

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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Helpdesk
                      </Text>
                    </TouchableOpacity>
                  </Col>

                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                      <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.CategoriTower')}>
                    <View
                      style={{
                        width: 47,
                        height: 47,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        // -- create shadow
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        // -- end create shadow
                      }}>
                      <Image
                        // source={require('@Asset/icons/billing.png')}
                        source={require('@Asset/icons/menu_icon/meterinfo.png')}
                        style={{
                          bottom: 5,

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
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        paddingTop: 5,
                        color: colors.bg_abuabu,
                        fontSize: 14,
                        //fontFamily: 'Bold',
                        paddingLeft: 5,
                        textAlign: 'center',
                      }}>
                      Meter Info
                    </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.News')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/news.png')}
                          style={{
                            bottom: 5,

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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        News
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>

                <Grid>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Promo')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/promo.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',

                          textAlign: 'center',
                        }}>
                        Promo
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Announce')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/announce.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          // paddingLeft: 5,
                          width: '100%',
                          textAlign: 'center',
                        }}>
                        Announce
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleNavigation('screen.Regulation')
                      }>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/regulation.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Regulation
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Facility')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/fasilitas.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Facility
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            ) : (
              // {/* -------- END MENU - MENU IOS----------- */}
              <View>
                <Grid>
<<<<<<< HEAD
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.ChooseTower')}>
=======
                  <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
>>>>>>> 7658f948fc430d137ef70b2e80c202bbea2bf848
                    <View
                      style={{
                        width: 47,
                        height: 47,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        // -- create shadow
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        // -- end create shadow
                      }}>
                      <Image
                        // source={require('@Asset/icons/billing.png')}
                        source={require('@Asset/icons/menu_icon/billing2.png')}
                        style={{
                          bottom: 5,
                          left: 3,
                          width: 40,
                          height: 40,
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        paddingTop: 5,
                        color: colors.bg_abuabu,
                        fontSize: 14,
                        //fontFamily: 'Bold',
                        paddingLeft: 5,
                        textAlign: 'center',
                      }}>
                      Billing
                    </Text>
                    </TouchableOpacity>
                  </Col>

                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Helpdesk')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/helpdesk3.png')}
                          style={{
                            bottom: 5,

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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Helpdesk
                      </Text>
                    </TouchableOpacity>
                  </Col>

                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                      <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.CategoriTower')}>
                    <View
                      style={{
                        width: 47,
                        height: 47,
                        borderRadius: 25,
                        backgroundColor: colors.bg_peachmuda,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        // -- create shadow
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        // -- end create shadow
                      }}>
                      <Image
                        // source={require('@Asset/icons/billing.png')}
                        source={require('@Asset/icons/menu_icon/meterinfo.png')}
                        style={{
                          bottom: 5,

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
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        paddingTop: 5,
                        color: colors.bg_abuabu,
                        fontSize: 14,
                        //fontFamily: 'Bold',
                        paddingLeft: 5,
                        textAlign: 'center',
                      }}>
                      Meter Info
                    </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      // paddingBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.News')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/news.png')}
                          style={{
                            bottom: 5,

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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        News
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>

                <Grid>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Promo')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/promo.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',

                          textAlign: 'center',
                        }}>
                        Promo
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Announce')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/announce.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          // paddingLeft: 5,
                          width: '100%',
                          textAlign: 'center',
                        }}>
                        Announce
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleNavigation('screen.Regulation')
                      }>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/regulation.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Regulation
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{height: 100, paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity
                      onPress={() => this.handleNavigation('screen.Facility')}>
                      <View
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: 25,
                          backgroundColor: colors.bg_peachmuda,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          // -- create shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadow
                        }}>
                        <Image
                          // source={require('@Asset/icons/billing.png')}
                          source={require('@Asset/icons/menu_icon/fasilitas.png')}
                          style={{
                            bottom: 5,
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
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          paddingTop: 5,
                          color: colors.bg_abuabu,
                          fontSize: 14,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                        }}>
                        Facility
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            )}

            {/* -------- PROMOTIONS -------- */}
            <View style={{paddingLeft: 10, paddingTop: 15}}>
              <Text
                style={{
                  color: colors.bg_abuabu,
                  fontSize: 16,
                  //fontFamily: 'Bold',
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                Promotions
              </Text>
            </View>
            {/* ----- tampilan awal promo, list seperti biasa  */}
            <View style={{paddingBottom: 10}}>
              {this.state.promo.length == 0 ? (
                <NoPromo
                  title={'No Promo Available'}
                  // bg={index % 2 === 0 ? "#fdddf3" : "#fef8e3"} //jika index  genap, maka warna krem. else ganjil warna pink
                  bg={colors.bg_putih}
                />
              ) : (
                this.state.promo.map((item, index) => (
                  <PromoList
                    key={index}
                    img={{uri: item.url_image}}
                    title={item.promo_title}
                    // bg={index % 2 === 0 ? "#fdddf3" : "#fef8e3"} //jika index  genap, maka warna krem. else ganjil warna pink
                    bg={colors.bg_putih}
                    datepost={moment(item.start_date).format('ll')}
                    onPress={() =>
                      this.handleNavigation('screen.PromoDetail', item)
                    }
                  />
                ))
              )}
            </View>
            {/* -----  tutup tampilan awal promo, list seperti biasa  */}
            <TouchableOpacity style={{marginBottom: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                  paddingTop: 5,
                }}>
                <Text style={{color: colors.bg_abuabu, fontWeight: 'bold'}}>
                  more promo
                </Text>
                <IconFA
                  name="chevron-right"
                  style={{
                    fontSize: 16,
                    paddingTop: 5,
                    paddingLeft: 8,
                    color: colors.bg_abuabu,
                  }}></IconFA>
              </View>
            </TouchableOpacity>
            {/* <FlatListSlider
                        data={this.state.promo}
                        width={300}
                        timer={4000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={30}
                        contentContainerStyle={styles.contentStyle}
                        indicatorStyle={{ marginTop: 0 }}
                    /> */}
            {/* -------- END PROMOTIONS -------- */}
          </ScrollView>
        </ImageBackground>
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
