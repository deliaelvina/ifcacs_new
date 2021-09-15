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

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconIC from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const config = {
//   dependencies: {
//     'linear-gradient': require('expo-linear-gradient').LinearGradient,
//   },
// };

// const modalizeRef = useRef(null);

import Carousel from 'react-native-snap-carousel';
import fonts from '../../Theme/Fonts';

export default class RentSale extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Rent & Sale',
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
          image:
            'https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
        },
        {
          title: 'Item 2',
          text: 'Text 2',
          image:
            'https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
        },
        {
          title: 'Item 3',
          text: 'Text 3',
          image:
            'https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
        },
      ],
      activeIndex: 0,

      //modal contact
      modalVisible: false,
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

  //   _renderItem({item, index}) {
  //     return (
  //       <Image
  //         source={{
  //           uri: item.image,
  //         }}
  //         alt="image base"
  //         resizeMode="cover"
  //         height={200}
  //         roundedTop="lg"
  //         borderTopRadius={20}
  //         style={{
  //           // -- create shadow
  //           shadowColor: '#000',
  //           shadowOffset: {
  //             width: 0,
  //             height: 1,
  //           },
  //           shadowOpacity: 0.22,
  //           shadowRadius: 2.1,
  //           elevation: 3,
  //           // -- end create shadow
  //         }}
  //       />
  //     );
  //   }

  handleModalClick() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          {/* ------- button rent sale */}
          <Stack space={3} alignItems="center" marginVertical={25}>
            <HStack
              space={8} //untuk jarak antar button
              alignItems="center"
              //   marginTop={2}
            >
              <TouchableOpacity shadow={4}>
                <Center
                  // size={20}
                  width={150}
                  height={45}
                  bg={colors.bg_putih}
                  //   bg={colors.bg_hijaugelap}
                  borderColor={colors.rs_grey}
                  borderWidth={2}
                  rounded={10}>
                  <Text
                    style={{
                      color: colors.rs_grey,

                      fontFamily: fonts.PTSansWebBold,
                    }}>
                    Rent
                  </Text>
                </Center>
              </TouchableOpacity>

              <TouchableOpacity>
                <Center
                  // size={20}
                  width={150}
                  height={45}
                  bg={colors.bg_putih}
                  //   bg={colors.bg_hijaugelap}
                  borderColor={colors.rs_grey}
                  borderWidth={2}
                  rounded={10}>
                  <Text
                    style={{
                      color: colors.rs_grey,
                      fontFamily: fonts.PTSansWebBold,
                    }}>
                    Sale
                  </Text>
                </Center>
              </TouchableOpacity>
            </HStack>
          </Stack>
          {/* ------- end button rent sale */}

          {/* ------- content rent sale  */}

          <TouchableOpacity
            onPress={() => this.handleNavigation('screen.RentSaleDetail')}>
            <Center flex={1}>
              <Box
                width={'93%'}
                shadow={1}
                borderRadius={20}
                marginBottom={3}
                paddingBottom={3}
                _light={{
                  backgroundColor: 'gray.50',
                }}
                _dark={{
                  backgroundColor: 'gray.700',
                }}>
                {/* ------ image rent sale */}
                <Box>
                  <AspectRatio ratio={11 / 5}>
                    <Image
                      source={require('@Asset/images/dummy_image/rumah1.jpeg')}
                      // source={{
                      //   uri: 'http://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                      // }}
                      alt="image base"
                      resizeMode="cover"
                      height={200}
                      width={'100%'}
                      // roundedTop="lg"
                      borderRadius={20}
                    />
                  </AspectRatio>
                  {/* //---------label rent / sale, bisa ganti warna dan ganti text */}
                  <Center
                    bg={colors.rs_grey}
                    _text={{
                      color: colors.bg_putih,
                      fontFamily: fonts.PTSansWebBold,
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
                <Stack space={1} py={4} px={4}>
                  <Heading size="md" style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: fonts.PTSansWebBold,
                        color: colors.rs_grey,
                        paddingTop: 10,

                        fontSize: 18,
                      }}>
                      Rp. 600 Juta
                    </Text>
                  </Heading>
                  <Heading
                    size="sm"
                    noOfLines={1} //line buntut titk-titik
                  >
                    <Text
                      style={{
                        fontFamily: fonts.PTSansWebBold,
                        color: colors.bg_abuabu,
                        paddingTop: 10,
                        textTransform: 'capitalize',
                        fontSize: 18,
                      }}>
                      rumah murah full furnished di jelambar
                    </Text>
                  </Heading>
                  <Text
                    style={{
                      color: colors.greyUrban,
                      fontSize: 14,
                      fontFamily: 'PT_Sans-Web-Italic',
                    }}>
                    Jelambar, Jakarta Barat, Jakarta
                  </Text>
                </Stack>
                <HStack px={3}>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
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
                      style={{
                        fontSize: 15,
                        fontFamily: fonts.PTSansWebRegular,
                      }}>
                      2 beds
                    </Text>
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
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
                      style={{
                        fontSize: 15,
                        fontFamily: fonts.PTSansWebRegular,
                      }}>
                      2 baths
                    </Text>
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
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
                      style={{
                        fontSize: 15,
                        fontFamily: fonts.PTSansWebRegular,
                      }}>
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
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
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
                      style={{
                        fontSize: 15,
                        fontFamily: fonts.PTSansWebRegular,
                      }}>
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
                  </VStack>
                </HStack>

                <Stack px={4} py={6}>
                  <HStack>
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
                    <Center
                      // bg={colors.rs_grey}
                      position="absolute"
                      px={0}
                      py={3}
                      top={0}
                      right={0}
                      borderBottomLeftRadius={8}>
                      <Button
                        width={120}
                        height={41}
                        borderRadius={20}
                        bg={colors.rs_navy}
                        onPress={() => this.handleModalClick()}>
                        <Center
                          _text={{
                            color: colors.bg_putih,

                            fontSize: 'md',
                            // bottom: 1,
                            height: 21,
                            fontFamily: fonts.PTSansWebBold,
                          }}>
                          Contact Us
                        </Center>
                      </Button>
                    </Center>
                  </HStack>
                </Stack>
                <HStack alignSelf="flex-end" space={4}>
                  <HStack alignItems="center" style={{paddingRight: 5}}>
                    <IconIC
                      name={Platform.OS == 'ios' ? 'ios-time' : 'time-outline'}
                      style={{
                        fontSize: 16,
                        paddingTop: 5,
                        // paddingLeft: 8,
                        color: colors.bg_abuabu,
                      }}></IconIC>

                    <Text
                      ml={1}
                      color="gray.500"
                      style={{
                        fontSize: 14,
                        fontFamily: fonts.PTSansWebRegular,
                      }}>
                      6 hours ago
                      {/* {moment(new Date()).fromNow()} */}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Center>
          </TouchableOpacity>

          {/* ------- content rent sale  */}

          <Modal
            isOpen={this.state.modalVisible}
            onClose={() => this.setState({modalVisible: false})}
            closeOnOverlayClick={true} //jika close modal di sembarang layar
            size={'lg'}>
            <Modal.Content pl={4} pt={5} bg={colors.bg_putih}>
              {/* <Modal.CloseButton /> //jika mau pakai button x di modal */}
              <Modal.Header _text={{alignSelf: 'center'}}>
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
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                          Ridhwan Noerdin
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={{fontSize: 14}}>Agent Independent</Text>
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
                              fontWeight: '700',
                              fontSize: 14,
                              bottom: 1,
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
                              fontWeight: '700',
                              fontSize: 14,
                              bottom: 1,
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
                              fontWeight: '700',
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
