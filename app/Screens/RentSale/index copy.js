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
} from 'native-base';
import colors from '../../Theme/Colors';
import {color} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconIC from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const config = {
//   dependencies: {
//     'linear-gradient': require('expo-linear-gradient').LinearGradient,
//   },
// };

// const modalizeRef = useRef(null);

import Carousel from 'react-native-snap-carousel';

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
      <Image
        source={{
          uri: item.image,
        }}
        alt="image base"
        resizeMode="cover"
        height={200}
        roundedTop="lg"
        borderTopRadius={20}
        style={{
          // -- create shadow
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.1,
          elevation: 3,
          // -- end create shadow
        }}
      />
    );
  }

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <Stack space={3} alignItems="center">
            <HStack space={8} alignItems="center" marginTop={2}>
              <TouchableOpacity shadow={4}>
                <Center
                  // size={20}
                  width={150}
                  height={45}
                  bg={colors.bg_putih}
                  //   bg={colors.bg_hijaugelap}
                  //   borderColor={colors.bg_hijaugelap}
                  //   borderWidth={1}
                  rounded={10}>
                  <Text style={{color: colors.bg_abuabu}}>Buy a Home</Text>
                </Center>
              </TouchableOpacity>

              <TouchableOpacity>
                <Center
                  // size={20}
                  width={150}
                  height={45}
                  bg={colors.bg_putih}
                  //   bg={colors.bg_hijaugelap}
                  //   borderColor={colors.bg_hijaugelap}
                  //   borderWidth={1}
                  rounded={10}>
                  <Text style={{color: colors.bg_abuabu}}>Rent a Home</Text>
                </Center>
              </TouchableOpacity>
            </HStack>
          </Stack>

          <Center flex={1} top={2}>
            <Box
              width={72}
              shadow={1}
              _light={{
                backgroundColor: 'gray.50',
              }}
              _dark={{
                backgroundColor: 'gray.700',
              }}>
              <Box>
                <AspectRatio ratio={18 / 9}>
                  <Image
                    roundedTop="lg"
                    width={100}
                    height={100}
                    source={{
                      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="red.500"
                  _text={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 'xs',
                  }}
                  position="absolute"
                  bottom={0}
                  px={2}
                  py={1}>
                  PHOTOS
                </Center>
                <Center
                  p={1}
                  rounded="full"
                  bg="red.500"
                  boxSize={10}
                  position="absolute"
                  right={0}
                  m={2}
                  _text={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 'xs',
                  }}>
                  27 MAR
                </Center>
              </Box>
              <Stack p={4} space={2}>
                <Stack space={2}>
                  <Heading size="md" ml={-1}>
                    The Garden City
                  </Heading>
                  <Heading
                    size="xs"
                    _light={{
                      color: 'red.500',
                    }}
                    _dark={{
                      color: 'red.300',
                    }}
                    fontWeight="500"
                    ml={-0.5}
                    mt={-1}>
                    The Silicon Valley of India.
                  </Heading>
                </Stack>
                <Text lineHeight={6} fontWeight={400}>
                  Bengaluru (also called Bangalore) is the center of India's
                  high-tech industry. The city is also known for its parks and
                  nightlife.
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between">
                  <HStack alignItems="center">
                    {/* <Icon
                      as={<MaterialIcons name="access-time" />}
                      color="gray.500"
                      size="sm"
                    /> */}
                    <Text ml={1} color="gray.500" fontWeight="500">
                      6 mins ago
                    </Text>
                  </HStack>
                  <HStack alignItems="center">
                    {/* <Icon
                      as={<Ionicons name="ios-chatbubbles" />}
                      color="gray.500"
                      size="sm"
                    /> */}

                    <Text ml={1} color="gray.500" fontWeight="500">
                      39 comments
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
            <Pressable
              onPress={() => this.handleNavigation('screen.rentsaleDetail')}>
              <Box
                //   onPress={() => alert('ha;')}
                bg={colors.bg_putih}
                // bg="emerald.400"
                shadow={2}
                //   rounded="lg"
                borderRadius={20}
                width="93%"
                // margin={20}
                marginBottom={3}
                paddingBottom={3}>
                {/* //------- carousel image  */}
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
                    }}
                    alt="image base"
                    resizeMode="cover"
                    height={200}
                    roundedTop="lg"
                    borderTopRadius={20}
                    style={{
                      // -- create shadow
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.1,
                      elevation: 3,
                      // -- end create shadow
                    }}
                  />
                  {/* <Carousel
                    layout={'default'}
                    ref={ref => (this.carousel = ref)}
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({activeIndex: index})}
                  /> */}
                </View>
                {/* //-------end carousel image  */}

                {/* //---------label rent / sale, bisa ganti warna dan ganti text */}
                <Center
                  bg={colors.yellow}
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

                {/* //------button navigasi carousel */}
                <Button
                  onPress={() => console.log(this.carousel.snapToPrev())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(121, 210, 209, 0.498)'}
                  borderRadius={0}
                  colorScheme="danger"
                  style={{position: 'absolute', top: '20%', left: 0}}>
                  <IconMI
                    name={'arrow-left'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.bg_hijautua,
                    }}></IconMI>
                </Button>
                <Button
                  onPress={() => console.log(this.carousel.snapToNext())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(121, 210, 209, 0.498)'}
                  borderRadius={0}
                  colorScheme="danger"
                  style={{position: 'absolute', top: '20%', right: 0}}>
                  <IconMI
                    name={'arrow-right'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.bg_hijautua,
                    }}></IconMI>
                </Button>
                {/* //------end button navigasi carousel */}

                <Stack space={1} px={5} paddingTop={2}>
                  <Heading
                    size="sm"
                    style={{
                      // textTransform: 'uppercase',
                      color: colors.goldUrban,
                    }}>
                    Rp2,1mily
                  </Heading>
                </Stack>
                <Stack px={5}>
                  <Heading size={'sm'} textTransform={'uppercase'}>
                    rumah murah full furnished di jelambar
                  </Heading>
                  <Text style={{color: colors.greyUrban, fontSize: 14}}>
                    Jelambar, Jakarta Barat, Jakarta
                  </Text>
                </Stack>

                <HStack style={{paddingTop: 10}}>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      left: 10,
                    }}>
                    <IconIC
                      name={Platform.OS == 'ios' ? 'ios-bed' : 'bed'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconIC>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      2 beds
                    </Text>
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      left: 10,
                    }}>
                    <IconFA
                      name={'bathtub'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconFA>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      2 baths
                    </Text>
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      left: 10,
                    }}>
                    <IconFA5
                      name={'ruler-combined'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconFA5>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      100m
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignSelf="flex-end" space={4}>
                  <HStack alignItems="center" style={{paddingRight: 5}}>
                    <IconIC
                      name={Platform.OS == 'ios' ? 'ios-time' : 'time'}
                      style={{
                        fontSize: 16,
                        paddingTop: 5,
                        // paddingLeft: 8,
                        color: colors.bg_abuabu,
                      }}></IconIC>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      6 hours ago
                      {/* {moment(new Date()).fromNow()} */}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Pressable>

            <Pressable onPress={() => Alert.alert('hello')}>
              <Box
                bg={colors.bg_putih}
                shadow={2}
                //   rounded="lg"
                borderRadius={20}
                width="95%"
                marginBottom={3}
                paddingBottom={3}>
                {/* //------- carousel image  */}
                <View style={{flexDirection: 'row'}}>
                  <Carousel
                    layout={'default'}
                    ref={ref => (this.carousel = ref)}
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({activeIndex: index})}
                  />
                </View>
                {/* //-------end carousel image  */}

                {/* //---------label rent / sale, bisa ganti warna dan ganti text */}
                <Center
                  bg={colors.loginGreen}
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
                  Sale
                </Center>
                {/* //---------end label rent / sale, bisa ganti warna dan ganti text */}

                {/* //------button navigasi carousel */}
                <Button
                  onPress={() => console.log(this.carousel.snapToPrev())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(121, 210, 209, 0.498)'}
                  borderRadius={0}
                  colorScheme="danger"
                  style={{position: 'absolute', top: '20%', left: 0}}>
                  <IconMI
                    name={'arrow-left'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.bg_hijautua,
                    }}></IconMI>
                </Button>
                <Button
                  onPress={() => console.log(this.carousel.snapToNext())}
                  variant="ghost"
                  px={0.5}
                  py={3}
                  bg={'rgba(121, 210, 209, 0.498)'}
                  borderRadius={0}
                  colorScheme="danger"
                  style={{position: 'absolute', top: '20%', right: 0}}>
                  <IconMI
                    name={'arrow-right'}
                    style={{
                      fontSize: 32,
                      //   paddingTop: 2,
                      // paddingLeft: 8,
                      color: colors.bg_hijautua,
                    }}></IconMI>
                </Button>
                {/* //------end button navigasi carousel */}

                <Stack space={1} px={5} paddingTop={2}>
                  <Heading
                    size="sm"
                    style={{
                      // textTransform: 'uppercase',
                      color: colors.goldUrban,
                    }}>
                    Rp5mily
                  </Heading>
                </Stack>
                <Stack px={5}>
                  <Heading size={'sm'} textTransform={'uppercase'}>
                    rumah murah pondok indah
                  </Heading>
                  <Text style={{color: colors.greyUrban, fontSize: 14}}>
                    Pondok Indah, Jakarta Selatan, Jakarta
                  </Text>
                </Stack>

                <HStack style={{paddingTop: 10}}>
                  <VStack style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <IconIC
                      name={Platform.OS == 'ios' ? 'ios-bed' : 'bed'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconIC>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      2 beds
                    </Text>
                  </VStack>
                  <VStack style={{flexDirection: 'row'}}>
                    <IconFA
                      name={'bathtub'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconFA>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      2 baths
                    </Text>
                  </VStack>
                  <VStack
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      left: 10,
                    }}>
                    <IconFA5
                      name={'ruler-combined'}
                      style={{
                        fontSize: 16,
                        paddingTop: 2,
                        // paddingLeft: 8,
                        color: colors.goldUrban,
                      }}></IconFA5>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      100m
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignSelf="flex-end" space={4}>
                  <HStack alignItems="center" style={{paddingRight: 5}}>
                    <IconIC
                      name={Platform.OS == 'ios' ? 'ios-time' : 'time'}
                      style={{
                        fontSize: 16,
                        paddingTop: 5,
                        // paddingLeft: 8,
                        color: colors.bg_abuabu,
                      }}></IconIC>

                    <Text
                      ml={1}
                      color="gray.500"
                      fontWeight="500"
                      style={{fontSize: 14}}>
                      6 hours ago
                      {/* {moment(new Date()).fromNow()} */}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Pressable>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
