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

import InvoiceCard from '../../components/Home/InvoiceCard';
// import ItemCarousel from '../../components/ItemCarousel/item';
// import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 'ini judul untuk news',
    value:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    img: '@Asset/images/new/news/Shelton.jpg',
  },
  {
    id: 'ini judul untuk news',
    value:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    img: '@Asset/images/new/news/Shelton.jpg',
  },
  {
    id: 'ini judul untuk news',
    value:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    img: '@Asset/images/new/news/Shelton.jpg',
  },
  // { id: 'c', value: 'C', img: '@Asset/images/new/news/Shelton.jpg' },
  // { id: 'd', value: 'D', img: '@Asset/images/new/news/Shelton.jpg' },
  // { id: 'e', value: 'E', img: '@Asset/images/new/news/Shelton.jpg' },
  // { id: 'f', value: 'F', img: '@Asset/images/new/news/Shelton.jpg' },
];

console.log('invoice', InvoiceCard);

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
      announce: [],

      scrollY: new Animated.Value(0),
      noOfPic: 2,

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
        {
          id: 'd',
          value: 'D',
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
        {
          id: 'e',
          value: 'E',
          image:
            'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        },
        {
          id: 'f',
          value: 'F',
          image:
            'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        },
      ],
      datapromo: [
        {
          id: 'a',
          judul: 'Promo Galon 15%',
          date: '6/6/2021',
          image:
            'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        },
        {
          id: 'b',
          judul: 'Promo Sembako 20%',
          date: '6/6/2021',
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
        {
          id: 'c',
          judul: 'Soft Opening Laundry',
          date: '6/6/2021',
          image:
            'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
      ],
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

    this.setState(data, () => {
      this.getNews();
      this.getPromo();
      this.getAnnouncement();
    });
  }

  async componentDidAppear() {
    let refresh = await sessions.getSess('@RefreshProfile');
    if (this.state.mounted) {
      if (refresh) {
        sessions.setSess('@RefreshProfile', false);
        this.getProfile();
      }
    }
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

  getNews = () => {
    fetch(
      'https://my.api.mockaroo.com/news.json?key=0e67c810',
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
          const resData = res;
          this.setState({news: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getNews', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPromo = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/promo/id/1',
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

          console.log('resdata promo', resData);
          this.setState({promo: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getPromo', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getAnnouncement = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/announce',
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
          const resData = res.data[0];
          console.log('resdata annouce', resData);
          this.setState({announce: resData});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        console.log('getAnnounce', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    // this.loadData()
    this.getInvoice();
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
    const {name} = this.state;
    const {user} = this.state;
    console.log(this.state.totalInvoice);

    return (
      <NativeBaseProvider>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.bg_peach,
          }}>
          {/* <OfflineNotice /> */}
          <SafeAreaView
            style={{backgroundColor: colors.bg_hijautua, height: 130}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontSize: 20,
                    paddingTop: 20,
                    //fontFamifly: 'Bold',

                    color: '#fff',
                  }}>
                  Welcome back,
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontSize: 20,
                    marginBottom: 20,
                    //fontFamily: 'Bold',

                    color: '#fff',
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

                        color: '#fff',
                      }}>
                      Friends
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <ScrollView>
            {user != null ? (
              <View
                style={{
                  // flexDirection: "row",
                  backgroundColor: '#fff',
                  marginTop: 15,
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
                        source={require('@Asset/icons/billing.png')}
                        style={{width: 20, height: 20}}
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
                        source={require('@Asset/icons/total.png')}
                        style={{width: 20, height: 20}}
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
              <View style={{marginBottom: 100}}></View>
            )}

            {Platform.OS == 'ios' ? (
              // {/* -------- MENU - MENU IOS----------- */}
              <Grid>
                <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                    // // onPress={() => this.props.navigation.navigate('Cources')}
                    // onPress={() => this.handleNavigation(
                    //     "screen.Cources",
                    //     // this.state.totalInvoiceDue
                    // )}
                    style={{
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 100,
                      width: '100%',
                      paddingVertical: 10,

                      paddingHorizontal: 5,
                      marginBottom: 15,
                      borderRadius: 20,
                      textAlign: 'center',

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
                        source={require('@Asset/icons/billing.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View style={{flexGrow: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 16,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                        }}>
                        Billing
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col
                  style={{
                    height: 90,
                    paddingLeft: 10,
                    paddingRight: 10,
                    // paddingBottom: 10,
                  }}>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('Cources')}
                    // onPress={() => this.handleNavigation(
                    //     "screen.Cources",
                    //     // this.state.totalInvoiceDue
                    // )}
                    style={{
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 100,
                      width: '100%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      marginBottom: 10,

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
                        source={require('@Asset/icons/customerservice.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View
                      style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 15,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                          textAlign: 'center',
                          // marginBottom: 10,
                        }}>
                        Customer Services
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                    // onPress={() =>
                    //     Navigation.navigate('Amenities')
                    // }
                    onPress={() =>
                      user != null
                        ? this.handleNavigation(
                            'screen.Amenities',
                            this.state.totalInvoiceDue,
                          )
                        : alert('please login')
                    }
                    style={{
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 100,
                      width: '100%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      marginBottom: 10,

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
                        source={require('@Asset/icons/amenities2.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View style={{flexGrow: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 15,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                        }}>
                        Amenities
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
              </Grid>
            ) : (
              // {/* -------- END MENU - MENU IOS----------- */}
              // {/* -------- MENU - MENU ANDRO----------- */}
              <Grid>
                <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                    // // onPress={() => this.props.navigation.navigate('Cources')}
                    // onPress={() => this.handleNavigation(
                    //     "screen.Cources",
                    //     // this.state.totalInvoiceDue
                    // )}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 80,
                      width: '100%',
                      paddingVertical: 10,

                      paddingHorizontal: 5,
                      marginBottom: 15,
                      borderRadius: 20,
                      textAlign: 'center',

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
                        source={require('@Asset/icons/billing.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View style={{flexGrow: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 16,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                        }}>
                        Billing
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('Cources')}
                    // onPress={() => this.handleNavigation(
                    //     "screen.Cources",
                    //     // this.state.totalInvoiceDue
                    // )}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 80,
                      width: '100%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      marginBottom: 10,

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
                        source={require('@Asset/icons/customerservice.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View
                      style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 15,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                        }}>
                        Customer Services
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={{height: 90, paddingLeft: 10, paddingRight: 10}}>
                  <TouchableOpacity
                    // onPress={() =>
                    //     Navigation.navigate('Amenities')
                    // }
                    onPress={() =>
                      user != null
                        ? this.handleNavigation(
                            'screen.Amenities',
                            this.state.totalInvoiceDue,
                          )
                        : alert('please login')
                    }
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      alignItems: 'center',

                      height: 80,
                      width: '100%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      marginBottom: 10,

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
                        source={require('@Asset/icons/amenities2.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                    <View style={{flexGrow: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: colors.bg_abuabu,
                          fontSize: 15,
                          //fontFamily: 'Bold',
                          paddingLeft: 5,
                        }}>
                        Amenities
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Col>
              </Grid>
              // {/* -------- END MENU - MENU ANDRO----------- */}
            )}
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
