import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
// import Style from '../../Theme/Style';
import {Style, Colors} from '../../Theme/';
import {Navigation} from 'react-native-navigation';
// import Style from '@Theme/Style';
// import ProgressCircle from 'react-native-progress-circle'
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
import {Col, Row, Grid} from 'react-native-easy-grid';
import {sessions} from '../../_helpers';
import {NativeBaseProvider} from 'native-base';

export default class Amenities extends React.Component {
  //   static options(passProps) {
  //     const isIos = Platform.OS === 'ios';

  //     return {
  //       topBar: {
  //         visible: true,
  //         // height : 0,
  //         drawBehind: true,
  //         background: {
  //           color: '#fff',
  //         },
  //       },
  //       statusBar: {
  //         style: isIos ? 'dark' : 'light',
  //         backgroundColor: '#008bbf',
  //       },
  //     };
  //   }

  static options(passProps) {
    const isIos = Platform.OS === 'ios';

    return {
      // topBar: {
      //     visible: false,
      //     // height : 0,
      //     drawBehind: true,
      //     background: {
      //         color: "#008bbf"
      //     }
      // },
      topBar: {
        noBorder: true,
        visible: true,
        height: 0,
        drawBehind: true,
        background: {
          color: '#008bbf',
        },
      },
      statusBar: {
        style: isIos ? 'dark' : 'light',
        backgroundColor: '#008bbf',
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
      menus: [],
    };
  }

  async componentDidMount() {
    this.startHeaderHeight = 150;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }

    const data = {
      email: await sessions.getSess('@User'),
      user: await sessions.getSess('@isLogin'),
      // user: 'hany',
      name: await sessions.getSess('@Name'),
      // token: await sessions.getSess("@Token"),
      // userId: await sessions.getSess("@UserId"),
      // dataTower: await sessions.getSess("@UserProject"),

      mounted: true,
    };
    console.log('data', data);

    this.setState(data, () => {
      this.getMenus();
    });
  }

  // async UNSAFE_componentWillMount() {
  //     this.startHeaderHeight = 150;
  //     if (Platform.OS == "android") {
  //         this.startHeaderHeight = 100 + StatusBar.currentHeight;
  //     }

  //     const data = {
  //         email: await sessions.getSess("@User"),
  //         user: await sessions.getSess("@isLogin"),
  //         // user: 'hany',
  //         name: await sessions.getSess("@Name"),
  //         // token: await sessions.getSess("@Token"),
  //         // userId: await sessions.getSess("@UserId"),
  //         // dataTower: await sessions.getSess("@UserProject"),

  //         mounted: true

  //     }
  //     console.log('data', data);

  //     this.setState(data, () => {
  //         this.getMenus();

  //     })
  // }

  getMenus = () => {
    fetch(
      'https://my.api.mockaroo.com/amenitis.json?key=0e67c810',
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
          let resData = res;
          let data = [];
          resData.map(item => {
            let items = {
              // ...item,
              rowID: item.r,
              menu: item.m,
              tanggal: item.t,
              // images: require('@Asset/icons/' + item.i),
            };
            data.push(items);
          });
          // ---- script diatas guna nya untuk ubah nama props dari db, supaya sesuai dengan sistem di mobile
          console.log('datamenu', data);

          // let tes_image = '@Asset/icons/' + data[0].images;
          // console.log('tes image', tes_image);
          // const resData = res; biasanyya pakai ini langsung bisa, kalo nama props sesuuai dengan db dan mobile
          this.setState({menus: data});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            alert(res.Pesan);
          });
        }
        // console.log("getmenu", res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  renderItemMenu(item) {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        // onPress={() => Actions.NewsAndPromoDetail({ items: item })}
      >
        <View>
          <Image
            source={require('@Asset/icons/billing.png')}
            style={{width: 40, height: 40}}
          />
        </View>
        <Text>{item.menu}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <NativeBaseProvider>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              fontSize: 25,
              //fontFamily: 'Montserrat-SemiBold',
              color: '#333',
            }}>
            ini title
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 12,
              //fontFamily: 'Montserrat-SemiBold',
              color: '#4E4E4E',
            }}>
            ini subtitle
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 20,
              alignItems: 'center',
            }}>
            {this.state.menus.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  width: '100%',
                  flexBasis: '21%',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'stretch'
                }}>
                <View>
                  <Image
                    source={require('@Asset/icons/billing.png')}
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    alt={item.images}
                  />
                  <Text style={{textAlign: 'center'}}>{item.menu}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* <FlatList
                    data={this.state.menus}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    keyExtractor={item => item.rowID.toString()}
                    numColumns={4}
                    renderItem={({ item }) => this.renderItemMenu(item)}
                    style={{ marginHorizontal: 20 }}

                /> */}

          {/* <Grid>
                    <Row style={{ marginVertical: 20, marginHorizontal: 20, }} >
                        {this.state.menus.map((item, index) => (

                            <Col style={{ alignItems: 'center', }} key={index}>
                                <Image source={require('@Asset/icons/billing.png')} style={{ width: 20, height: 20, }} />
                                <Text>{item.menu}</Text>
                            </Col>

                        ))}
                    </Row>
                </Grid> */}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

// Amenities.options = {
//     rightButtons: [
//         {
//             id: 'id',
//             text: 'Button',
//             icon: require('@Asset/icons/billing.png')
//         },
//     ],
//     // topBar: {
//     //     title: {
//     //         text: 'Home',
//     //         color: 'white'
//     //     },
//     //     background: {
//     //         color: '#4d089a'
//     //     }
//     // }
// }
