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

export default class News extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'News',
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
      news: [],
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
      this.getNews();
    });
  }

  getNews = () => {
    fetch(
      'http://34.87.121.155:8000/ifcaprop-api/api/news',
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
          //   let databanners = [];
          //   console.log('resdata promo', resData);
          //   resData.map(item => {
          //     if (item.banner == 'Y') {
          //       let banners = {
          //         ...item,
          //         banner: item.banner,
          //       };
          //       console.log('banners', banners);
          //       databanners.push(banners);
          //     }
          //   });
          //   console.log('databanner', databanners);
          this.setState({news: resData});
          //   this.setState({promobanner: databanners});
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
        <ScrollView
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            marginBottom: 20,
          }}>
          {this.state.news.map((item, index) => (
            <TouchableOpacity
              onPress={() => this.handleNavigation('screen.NewsDetail', item)}>
              <Box
                bg="white"
                shadow={2}
                rounded="lg"
                maxWidth="100%"
                key={index}
                style={{paddingBottom: 10}}>
                <Image
                  source={{
                    uri: item.url_image,
                  }}
                  alt="image base"
                  resizeMode="cover"
                  height={150}
                  roundedTop="md"
                />
                <Text
                  bold
                  position="absolute"
                  color="white"
                  top={0}
                  m={[4, 4, 8]}>
                  NEWS
                </Text>
                <Stack space={4} p={[4, 4, 8]}>
                  <Text color="gray.400">
                    {moment(item.date_created).format('DD MMM YYYY')}
                  </Text>
                  <Heading
                    size={['md', 'lg', 'md']}
                    //   noOfLines={2}
                    textAlign="justify">
                    {item.news_title}
                  </Heading>
                  <Text
                    lineHeight={[5, 5, 7]}
                    noOfLines={[3, 4, 2]}
                    color="gray.700">
                    {item.news_descs.replace(/<\/?[^>]+(>|$)/g, '')}
                  </Text>
                </Stack>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
