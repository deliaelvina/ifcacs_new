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
import IconIC from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
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
        roundedTop="md"
      />

      //   <View
      //     style={{
      //       backgroundColor: 'floralwhite',
      //       borderRadius: 5,
      //       height: 250,
      //       padding: 50,
      //       marginLeft: 25,
      //       marginRight: 25,
      //     }}>
      //     <Text style={{fontSize: 30}}>{item.title}</Text>
      //     <Text>{item.text}</Text>
      //   </View>
    );
  }

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <Center flex={1} top={2}>
            <Box
              bg={colors.bg_putih}
              shadow={2}
              rounded="lg"
              width="95%"
              marginBottom={3}>
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
                    color: colors.yellow,
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
                    color: colors.yellow,
                  }}></IconMI>
              </Button>

              <Stack space={1} px={5} paddingTop={2}>
                <Heading
                  size="sm"
                  style={{
                    textTransform: 'uppercase',
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
              </HStack>

              <HStack alignSelf="flex-end" space={4}>
                <HStack alignItems="center">
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
            <Box
              bg={colors.bg_putih}
              shadow={2}
              rounded="lg"
              width="95%"
              marginBottom={3}>
              <Image
                source={{
                  uri: 'https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png',
                }}
                alt="image base"
                resizeMode="cover"
                height={150}
                roundedTop="md"
              />
              <Text bold position="absolute" color="#fff" top={0} m={[4, 4, 8]}>
                NEWS
              </Text>
              <Stack space={4} p={[4, 4, 8]}>
                <Text color="gray.400">June 22, 2021</Text>
                <Heading size={['md', 'lg', 'md']} noOfLines={2}>
                  The Stunning Dawki River in Meghalaya is So Clear That Boats
                  Appear Floating in Air
                </Heading>
                <Text
                  lineHeight={[5, 5, 7]}
                  noOfLines={[4, 4, 2]}
                  color="gray.700">
                  With lush green meadows, rivers clear as crystal, pine-covered
                  hills, gorgeous waterfalls, lakes and majestic forests, the
                  mesmerizing. Meghalaya is truly a Nature lover’s paradise…
                </Text>
              </Stack>
            </Box>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
