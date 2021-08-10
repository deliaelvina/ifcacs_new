import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {itemWidth} from '../../components/SliderEntry/Style';
import {Navigation} from 'react-native-navigation';

import {Style} from '../../Theme/';
import colors from '../../Theme/Colors';
import {Modalize} from 'react-native-modalize';
import moment from 'moment';

import nbStyles from './Style';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import ImageView from 'react-native-image-viewing';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class PromoDetail extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: Platform.OS == 'ios' ? '' : 'Promo',
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
    this.myRef = React.createRef();

    this.state = {
      dataPromo: [],
      isImageViewVisible: false,
      selectedIndex: 0,
      customStyleIndex: 0,
      //   typeTab: 'DT',
    };
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    console.log('item from passed prop', this.props.passed);
    const dataPromo = this.props.passed;

    const data = {
      // user: true,
      start_date: dataPromo.start_date,
      end_date: dataPromo.end_date,
      promo_descs: dataPromo.promo_descs.replace(/<\/?[^>]+(>|$)/g, ''),
      promo_title: dataPromo.promo_title,
      tnc_descs: dataPromo.tnc_descs.replace(/<\/?[^>]+(>|$)/g, ''),
      url_image: dataPromo.url_image,
      mounted: true,
    };
    console.log('data', data);
    console.log(
      'replace promo desc',
      dataPromo.promo_descs.replace(/<\/?[^>]+(>|$)/g, ''),
    );
    this.setState(data, () => {
      //   this.handleIndexChange();
    });
  }

  handleClose = dest => {
    //   alert('close');
    if (this.myRef.current) {
      this.myRef.current.close(dest);
    }
    //   Navigation.dismissOverlay();
  };
  renderSK() {
    return (
      <View>
        <Text>halo</Text>
      </View>
    );
  }

  handleCustomIndexSelect = (index: number) => {
    this.setState(prevState => ({...prevState, customStyleIndex: index}));
  };

  render() {
    const images = [
      {
        uri: this.state.url_image,
        title: this.state.promo_title,
      },
    ];

    const {customStyleIndex} = this.state;

    console.log('this.index', this.state.selectedIndex);

    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{paddingLeft: 10, paddingRight: 10, width: vw}}>
          <TouchableOpacity
            onPress={() => this.setState({isImageViewVisible: true})}>
            <Image
              style={{
                height: 250,
                width: '100%',
                resizeMode: 'contain',
                alignSelf: 'center',
                top: 20,
              }}
              source={{uri: this.state.url_image}}
            />
          </TouchableOpacity>
          <ImageView
            images={images}
            imageIndex={0}
            animationType="fade"
            visible={this.state.isImageViewVisible}
            // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
            onRequestClose={() => this.setState({isImageViewVisible: false})}
          />
        </View>

        <Modalize
          handleStyle={{
            marginTop: 30,
            backgroundColor: colors.bg_hijautua,
            width: 80,
          }}
          modalStyle={{
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            backgroundColor: colors.bg_putih,
            marginTop: 30,

            // paddingTop: 30,
          }}
          alwaysOpen={500}
          snapPoint={200}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          handlePosition="outside"
          overlayStyle={{backgroundColor: 'transparent'}}
          HeaderComponent={<View style={{height: 40}}></View>}
          onClosed={this.handleClose()}>
          <View style={{flex: 1, height: '100%'}}>
            <ScrollView>
              <View
                style={{
                  backgroundColor: colors.bg_putih,
                  borderTopLeftRadius: 60,
                  borderTopRightRadius: 60,
                  // top: '10%',
                  height: '100%',
                  paddingBottom: '50%',
                }}>
                <View
                  style={{
                    // top: 10,
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingBottom: 5,
                  }}>
                  <Text style={{fontSize: 23}}>{this.state.promo_title}</Text>
                </View>

                <View style={{top: 20, left: 25}}>
                  <Text style={{fontSize: 15, color: colors.bg_coklat}}>
                    Valid until :{' '}
                    {moment(this.state.end_date).format('DD MMMM YYYY')}
                  </Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                  <SegmentedControlTab
                    values={['Detail', 'S&K']}
                    selectedIndex={customStyleIndex}
                    onTabPress={this.handleCustomIndexSelect}
                    borderRadius={10}
                    activeTabStyle={nbStyles.activeTabStyle}
                    activeTabTextStyle={nbStyles.activeTabTextStyle}
                    tabStyle={nbStyles.tabStyle}
                    tabTextStyle={nbStyles.tabTextStyle}
                  />
                </View>

                {customStyleIndex === 0 && (
                  <View
                    style={{
                      marginTop: 40,
                      paddingLeft: 25,
                      paddingRight: 15,
                    }}>
                    <Text style={{textAlign: 'justify', fontSize: 15}}>
                      {this.state.promo_descs}
                    </Text>
                  </View>
                )}
                {customStyleIndex === 1 && (
                  <View
                    style={{
                      marginTop: 40,
                      paddingLeft: 25,
                      paddingRight: 15,
                      marginBottom: 15,
                      height: '100%',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>S&K</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.bg_abuabu,
                        textAlign: 'justify',
                      }}>
                      {this.state.tnc_descs}
                      {/* Promo period : {moment(this.state.start_date).format(
                      'DD',
                    )}{' '}
                    - {moment(this.state.end_date).format('DD MMMM YYYY')} */}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </Modalize>
      </View>
    );
  }
  //   render() {
  //     return (
  //       <SafeAreaView style={{backgroundColor: colors.bg_peach}}>
  //         <View style={{top: '2%', width: '100%', padding: 0, margin: 0}}>
  //           <Image
  //             source={{uri: this.state.url_image}}
  //             style={{
  //               height: 200,
  //               width: vw,
  //               resizeMode: 'contain',
  //               marginBottom: 35,
  //             }}
  //           />
  //         </View>
  //       <View
  //           style={{
  //             backgroundColor: colors.bg_putih,
  //             borderTopLeftRadius: 60,
  //             borderTopRightRadius: 60,
  //             // top: '10%',
  //             height: '100%',
  //           }}>
  //           <View
  //             style={{
  //               top: 25,
  //               paddingLeft: 25,
  //               paddingRight: 25,
  //               paddingBottom: 5,
  //             }}>
  //             <Text style={{fontSize: 23}}>{this.state.news_title}</Text>
  //           </View>

  //           <View style={{top: 20, left: 25}}>
  //             <Text style={{fontSize: 14, color: colors.bg_coklat}}>
  //               {moment(this.state.date_created).format(
  //                 'dddd, DD MMMM YYYY HH:mm',
  //               )}
  //             </Text>
  //           </View>

  //           <View
  //             style={{
  //               top: 20,
  //               paddingLeft: 15,
  //               paddingRight: 15,
  //               marginTop: 10,
  //             }}>
  //             <Text style={{textAlign: 'justify', fontSize: 15}}>
  //               {this.state.news_descs}
  //             </Text>
  //           </View>

  //           <View style={{top: 20, paddingLeft: 15, paddingRight: 15}}>
  //             <Text style={{color: colors.bg_coklat, fontSize: 14}}>
  //               Source : {this.state.source}
  //             </Text>
  //           </View>
  //         </View>

  //       </SafeAreaView>
  //     );
  //   }
}
