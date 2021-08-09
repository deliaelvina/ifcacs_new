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
  HStack,
  Stack,
  NativeBaseProvider,
} from 'native-base';
import colors from '../../Theme/Colors';
import {color} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIC from 'react-native-vector-icons/Ionicons';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class Promo extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Promotion',
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
  constructor(props) {
    super(props);

    this.state = {
      promo: [],
      dateNow: new Date(),
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
          console.log('resdata promo', resData);
          resData.map(item => {
            if (item.banner == 'Y') {
              let banners = {
                ...item,
                banner: item.banner,
              };
              console.log('banners', banners);
              databanners.push(banners);
            }
          });
          console.log('databanner', databanners);
          this.setState({promo: resData});
          this.setState({promobanner: databanners});
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

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
          {this.state.promo.map((item, index) => (
            <TouchableOpacity
              onPress={() => this.handleNavigation('screen.PromoDetail', item)}>
              <Box
                width={'100%'}
                //   shadow={2}
                _light={{
                  backgroundColor: colors.bg_peach,
                }}
                _dark={{
                  backgroundColor: 'gray.700',
                }}
                shadow={10}
                //   bg={colors.bg_peachmuda}
                borderRadius={10}
                key={index}
                style={{marginBottom: 10}}>
                <Box>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      // roundedTop="lg"
                      borderRadius={15}
                      source={{
                        uri: item.url_image,
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
                    {/* {moment(item.start_date).fromNow()} */}
                    Periode Promo :
                    {moment(item.end_date).endOf('day').fromNow()}
                  </Center>
                  {/* <Center
                  p={1} //for text wrap
                  rounded="full"
                  bg="red.500"
                  boxSize={10}
                  position="absolute"
                  right={0}
                  m={2} //posisi margin all
                  _text={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 'xs',
                    bottom: 0.5,
                  }}>
                  {moment(item.date_created).format('DD MMM')}
                
                </Center> */}
                </Box>
                <Stack
                  p={4}

                  // shadow={5}
                  // bg={colors.bg_peachmuda}
                  //       borderRadius={10}
                >
                  <Stack space={2}>
                    <Heading
                      size="md"
                      //   ml={-1}
                    >
                      {item.promo_title}
                    </Heading>
                  </Stack>

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
                        {moment(item.date_created).fromNow()}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
