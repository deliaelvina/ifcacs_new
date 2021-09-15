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
  Stack,
  NativeBaseProvider,
  VStack,
  HStack,
  Button,
  Pressable,
  Avatar,
  Modal,
} from 'native-base';
import colors from '../../Theme/Colors';
import {color, fontSize} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import nbStyles from './Styles';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconIC from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(86);
const itemHorizontalMargin = wp(4);

// let isMount = false;

const itemWidth = slideWidth + itemHorizontalMargin * 2;
// const config = {
//   dependencies: {
//     'linear-gradient': require('expo-linear-gradient').LinearGradient,
//   },
// };

// const modalizeRef = useRef(null);

import Carousel, {Pagination} from 'react-native-snap-carousel';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import fonts from '../../Theme/Fonts';

export default class RentSaleDetail extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '',
          color: colors.bg_abuabu,
        },
        // background: {
        //   color: 'black',
        //   opacity: 0.,
        // },
        // backButton: {
        //   color: '#fff',
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
      promo: [],
      dateNow: new Date(),
      carouselItems: [
        {
          title: 'Item 1',
          text: 'Text 1',
          image: require('@Asset/images/dummy_image/rumah1.jpeg'),
          //   image:
          //     'http://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
        },
        {
          title: 'Item 2',
          text: 'Text 2',
          image: require('@Asset/images/dummy_image/rumah2.jpeg'),
        },
        {
          title: 'Item 3',
          text: 'Text 3',
          image: require('@Asset/images/dummy_image/rumah3.jpeg'),
        },
      ],
      activeIndex: 0,

      //modal contact
      modalVisible: false,
      selectedIndex: 0,
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
      this.getPromo();
    });
  }

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
          //   console.log('resdata promo', resData);
          resData.map(item => {
            if (item.banner == 'Y') {
              let banners = {
                ...item,
                banner: item.banner,
              };
              //   console.log('banners', banners);
              databanners.push(banners);
            }
          });
          //   console.log('databanner', databanners);
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

  _renderItem({item, index}) {
    return (
      //   <AspectRatio ratio={11 / 5}>
      <Image
        source={item.image}
        alt="image base"
        resizeMode="cover"
        height={300}
        width={'100%'}
        roundedTop="lg"
        roundedBottom="lg"
        borderTopRadius={20}
        borderBottomRadius={20}
      />
      //   </AspectRatio>
    );
  }

  handleModalClick() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  handleIndexChange = index => {
    console.log('index langsung klik', index);

    this.setState({
      selectedIndex: index,
    });

    console.log('Selected index', this.state.selectedIndex);
  };
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          {/* ------- content rent sale  */}

          {/* //------- carousel image  */}

          {/* //-------end carousel image  */}

          <Center flex={1}>
            <Box
              width={'94%'}
              shadow={1}
              borderRadius={20}
              marginBottom={3}
              paddingBottom={3}
              marginTop={5}
              backgroundColor={colors.bg_putih}>
              {/* ------ image rent sale */}
              <Box>
                {/* ------ carousel image ------ */}
                <Center style={{width: '100%'}}>
                  <Carousel
                    layout={'default'}
                    ref={ref => (this.carousel = ref)}
                    data={this.state.carouselItems}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={itemWidth}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({activeIndex: index})}
                  />
                </Center>

                {/* ------ end carousel image ------ */}

                {/* ------- pagination carousel ----- */}
                <Pagination
                  dotsLength={this.state.carouselItems.length}
                  activeDotIndex={this.state.activeIndex}
                  containerStyle={{paddingTop: 10, paddingBottom: 5}}
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 3,
                    backgroundColor: colors.rs_navy,
                  }}
                  inactiveDotStyle={
                    {
                      // Define styles for inactive dots here
                    }
                  }
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
                {/* ------- end pagination carousel ----- */}

                {/* //------button navigasi carousel */}
                <Button
                  onPress={() => console.log(this.carousel.snapToPrev())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(107, 122, 161, 0.4)'}
                  borderRadius={0}
                  colorScheme={'rgba(107, 122, 161)'}
                  style={{position: 'absolute', top: '35%', left: 0}}>
                  <IconMI
                    name={'arrow-left'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconMI>
                </Button>
                <Button
                  onPress={() => console.log(this.carousel.snapToNext())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(107, 122, 161, 0.4)'}
                  borderRadius={0}
                  colorScheme={'rgba(107, 122, 161)'}
                  style={{position: 'absolute', top: '35%', right: 0}}>
                  <IconMI
                    name={'arrow-right'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconMI>
                </Button>
                {/* //------end button navigasi carousel */}

                {/* //---------label rent / sale, bisa ganti warna dan ganti text */}
                <Center
                  bg={colors.rs_grey}
                  _text={{
                    color: colors.bg_putih,
                    fontWeight: '700',
                    fontSize: 'sm',
                  }}
                  position="absolute"
                  px={6}
                  py={2}
                  top={0}
                  right={0}
                  borderBottomLeftRadius={8}>
                  Rent
                </Center>
                {/* //---------end label rent / sale, bisa ganti warna dan ganti text */}
              </Box>
              {/* ------ end image rent sale */}

              {/* ------ title, sub title, dan desc bedroom  */}
              <Stack space={1} py={4} px={4}>
                <Heading size="md">
                  <Text
                    style={{
                      fontFamily: fonts.PTSansWebBold,
                      color: colors.rs_grey,
                      paddingTop: 5,
                      fontSize: 18,
                    }}>
                    Rp. 600 Juta
                  </Text>
                </Heading>
                <Heading
                  //   fontFamily={'PT_Sans-Web-Italic'}
                  size="sm"
                  color={colors.bg_abuabu}
                  textTransform={'capitalize'}
                  noOfLines={1} //line buntut titk-titik
                >
                  <Text
                    style={{
                      color: colors.bg_abuabu,
                      fontSize: 16,
                      fontFamily: 'PT_Sans-Web-Bold',
                      textTransform: 'capitalize',
                    }}>
                    rumah murah full furnished di jelambar
                  </Text>
                </Heading>
                <Text
                  style={{
                    color: colors.greyUrban,
                    fontSize: 14,
                    fontFamily: fonts.PTSansWebItalic,
                  }}>
                  Jelambar, Jakarta Barat, Jakarta
                </Text>
              </Stack>
              <HStack px={3}>
                <VStack
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 150,
                  }}>
                  <IconIC
                    name={Platform.OS == 'ios' ? 'ios-bed' : 'bed'}
                    style={{
                      fontSize: 18,
                      paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconIC>

                  <Text
                    ml={1}
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    2 bedrooms
                  </Text>
                </VStack>
                <VStack
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 150,
                  }}>
                  <IconFA5
                    name={'ruler-combined'}
                    style={{
                      fontSize: 14,
                      paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconFA5>

                  <Text
                    ml={1}
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    100
                  </Text>
                  <Text
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    m
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      lineHeight: 15,
                      color: colors.bg_abuabu,
                      fontFamily: fonts.PTSansWebRegular,
                    }}>
                    2
                  </Text>
                  <Text
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    {' '}
                    Landing area
                  </Text>
                </VStack>
              </HStack>
              <HStack px={3}>
                <VStack
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 150,
                  }}>
                  <IconFA
                    name={'bathtub'}
                    style={{
                      fontSize: 16,
                      paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconFA>

                  <Text
                    ml={1}
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    2 bathtubs
                  </Text>
                </VStack>
                <VStack
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 150,
                  }}>
                  <IconMCI
                    name={'home-city'}
                    style={{
                      fontSize: 14,
                      paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.rs_navy,
                    }}></IconMCI>

                  <Text
                    ml={1}
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    90
                  </Text>
                  <Text
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    m
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      lineHeight: 15,
                      color: colors.bg_abuabu,
                      fontFamily: fonts.PTSansWebRegular,
                    }}>
                    2
                  </Text>
                  <Text
                    color={colors.bg_abuabu}
                    fontWeight="500"
                    style={{fontSize: 14, fontFamily: fonts.PTSansWebRegular}}>
                    {' '}
                    Building area
                  </Text>
                </VStack>
              </HStack>
              {/* ------ end title, sub title, dan desc bedroom  */}

              {/* -------- segmen tab  */}
              <View style={{marginHorizontal: 10, marginTop: 20}}>
                <SegmentedControlTab
                  values={['Detail Property', 'Description']}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                  activeTabStyle={nbStyles.activeTabStyle}
                  activeTabTextStyle={nbStyles.activeTabTextStyle}
                  tabStyle={nbStyles.tabStyle}
                  tabTextStyle={nbStyles.tabTextStyle}
                  borderRadius={10}
                />
              </View>
              {/* -------- end segmen tab  */}

              {/* SELECTED TAB detail */}
              {this.state.selectedIndex === 0 && (
                <Stack style={{marginHorizontal: 10}}>
                  <HStack py={5}>
                    <VStack width={'50%'} px={3} py={5}>
                      <View>
                        <Text
                          style={{
                            fontFamily: fonts.PTSansWebBold,
                            color: colors.rs_grey,
                            fontSize: 16,
                          }}>
                          ID Property
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Property Type
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Price
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Bedroom
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Maid Bedroom
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Building Area
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Landing Area
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Status
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Sertificate
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Bathroom
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Floor
                        </Text>
                      </View>
                    </VStack>
                    <VStack
                      width={'50%'}
                      px={3}
                      py={5}
                      bg={'rgba(107, 122, 161, 0.2)'}>
                      <View>
                        <Text
                          style={{
                            fontFamily: fonts.PTSansWebBold,
                            color: colors.rs_grey,
                            fontSize: 16,
                          }}>
                          # 1028291
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          House
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Rp. 600.000.000,00
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          2
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          1
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              nbStyles.textRegularMedium,
                              {marginVertical: 2},
                            ]}>
                            90m
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              lineHeight: 15,
                              color: colors.bg_abuabu,
                              fontFamily: fonts.PTSansWebRegular,
                            }}>
                            2
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              nbStyles.textRegularMedium,
                              {marginVertical: 2},
                            ]}>
                            100m
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              lineHeight: 15,
                              color: colors.bg_abuabu,
                              fontFamily: fonts.PTSansWebRegular,
                            }}>
                            2
                          </Text>
                        </View>

                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          Rent
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          SHM
                        </Text>
                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          2
                        </Text>

                        <Text
                          style={[
                            nbStyles.textRegularMedium,
                            {marginVertical: 2},
                          ]}>
                          2
                        </Text>
                      </View>
                    </VStack>
                  </HStack>
                </Stack>
              )}
              {this.state.selectedIndex === 1 && (
                <Stack style={{marginHorizontal: 10}}>
                  <Center style={{paddingHorizontal: 10, paddingVertical: 10}}>
                    <Text
                      style={[
                        nbStyles.textRegularMedium,
                        {textAlign: 'justify'},
                      ]}>
                      Listing ini merupakan Verified Listing 99 Group (Rumah123
                      & 99) Tim 99 Group sudah melakukan pengecekan dokumen,
                      lokasi asli, dan harga sesuai Silahkan laporkan dan
                      dapatkan kompensasi apabila listingan bukti tidak sesuai
                      Pasti Aman, Harga Sesuai, Respon cepat! Buat Pasangan Muda
                      atau Keluarga Kecil Sangat Cocok Sekali Bangunan Masih
                      Baru Siap Huni Air bersih dan cukup kencang Bebas banjir
                      maupun bising.. Cocok untuk yang mau melepas kepenatan
                      kota Udara yang bersih dan view yg cukup bagus di lantai 2
                      Jarak 3M ke mekar wangi dan 3,8M ke patung sepatu
                      cibaduyut HADAP SELATAN LT 70 m2 LB 90 m2 KT 2+1 KM 2 Daya
                      Listrik 1300 watt 2 lantai SHM Tahun dibangun 2019 Harga :
                      600.000.000
                    </Text>
                  </Center>
                </Stack>
              )}

              <Stack px={4} py={6}>
                <Center>
                  <Button
                    width={150}
                    height={45}
                    borderRadius={20}
                    bg={colors.rs_navy}
                    onPress={() => this.handleModalClick()}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        color: colors.bg_putih,
                        fontFamily: fonts.PTSansWebBold,
                      }}>
                      I'm Interested
                    </Text>
                  </Button>
                </Center>
              </Stack>
            </Box>
          </Center>

          {/* ------- content rent sale  */}

          <Modal
            isOpen={this.state.modalVisible}
            onClose={() => this.setState({modalVisible: false})}
            closeOnOverlayClick={true} //jika close modal di sembarang layar
            size={'lg'}>
            <Modal.Content pl={4} pt={5} bg={colors.bg_putih}>
              {/* <Modal.CloseButton /> //jika mau pakai button x di modal */}
              <Modal.Header
                _text={{
                  alignSelf: 'center',
                  fontFamily: fonts.PTSansWebBold,
                  fontWeight: 'normal',
                }}>
                Contact Agent
              </Modal.Header>
              <Modal.Body pr={4}>
                <Center
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <HStack pb={5}>
                    <Avatar
                      size="lg"
                      source={{
                        uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
                      }}>
                      GG
                    </Avatar>
                    <VStack
                      style={{
                        alignSelf: 'center',

                        alignContent: 'center',
                        paddingLeft: 5,
                      }}>
                      <HStack>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: fonts.PTSansWebBold,
                          }}>
                          Ridhwan Noerdin
                        </Text>
                      </HStack>
                      <HStack>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: fonts.PTSansWebRegular,
                          }}>
                          Agent Independent
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Button
                      width={110}
                      height={41}
                      borderRadius={20}
                      marginHorizontal={5}
                      bg={colors.rs_navy}
                      onPress={() => this.handleModalClick()}>
                      <Center>
                        <HStack>
                          <IconFA
                            name={'phone'}
                            color={colors.bg_putih}
                            style={{
                              fontSize: 14,
                              marginRight: 5,
                              top: 2,
                            }}></IconFA>

                          <Text
                            style={{
                              color: colors.bg_putih,

                              fontSize: 14,
                              bottom: 1,
                              fontFamily: fonts.PTSansWebBold,
                            }}>
                            Call
                          </Text>
                        </HStack>
                      </Center>
                    </Button>
                    <Button
                      width={110}
                      height={41}
                      borderRadius={20}
                      marginHorizontal={5}
                      bg={colors.rs_navy}
                      onPress={() => this.handleModalClick()}>
                      <Center>
                        <HStack>
                          <IconFA
                            name={'whatsapp'}
                            color={colors.bg_putih}
                            style={{
                              fontSize: 16,
                              marginRight: 5,
                              //   top: 2,
                            }}></IconFA>

                          <Text
                            style={{
                              color: colors.bg_putih,

                              fontSize: 14,
                              bottom: 1,
                              fontFamily: fonts.PTSansWebBold,
                            }}>
                            Whatsapp
                          </Text>
                        </HStack>
                      </Center>
                    </Button>
                    <Button
                      width={110}
                      height={41}
                      marginHorizontal={5}
                      borderRadius={20}
                      bg={colors.rs_navy}
                      onPress={() => this.handleModalClick()}>
                      <Center>
                        <HStack>
                          <IconFA
                            name={'envelope-o'}
                            color={colors.bg_putih}
                            style={{
                              fontSize: 14,
                              marginRight: 5,
                              top: 2,
                            }}></IconFA>

                          <Text
                            style={{
                              color: colors.bg_putih,
                              fontFamily: fonts.PTSansWebBold,
                              fontSize: 14,
                              bottom: 1,
                            }}>
                            Email
                          </Text>
                        </HStack>
                      </Center>
                    </Button>
                  </HStack>
                </Center>
              </Modal.Body>
              {/* 
              <Modal.Footer>
                <Button.Group variant="ghost" space={2}>
                  <Button>SAVE</Button>
                  <Button
                    onPress={() => {
                      this.setState({modalVisible: !this.state.modalVisible});
                    }}
                    colorScheme="muted">
                    CLOSE
                  </Button>
                </Button.Group>
              </Modal.Footer> */}
            </Modal.Content>
          </Modal>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
