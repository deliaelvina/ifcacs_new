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
  Image,
} from 'react-native';

import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Text,
  Center,
  HStack,
  VStack,
  Stack,
  //   Image,
  Divider,
  NativeBaseProvider,
} from 'native-base';
import colors from '../../Theme/Colors';
import {color} from 'styled-system';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import OfflineNotice from '@Component/OfflineNotice';
import nbStyles from './Style';

import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import ButtonMenuGrid from '@Component/ButtonMenuGrid';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIC from 'react-native-vector-icons/Ionicons';

import ImageView from 'react-native-image-viewing';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getDetailFacility} from '../../_services';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
// const modalizeRef = useRef(null);

export default class Helpdesk extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Helpdesk',
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
        visible: false, //munculin navigasi bawah
        drawBehind: true,
        animate: true,
      },
    };
  }
  constructor(props) {
    super(props);

    this.state = {
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
    this.setState(data, () => {});
  }

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
            backgroundColor: colors.bg_peach,
          }}>
          {/* <OfflineNotice /> */}
          <View style={nbStyles.wrap}>
            <Title text="Help Desk" />

            {/* Start Menu Kotak Kotak */}
            <View style={nbStyles.menuWrap}>
              <View style={nbStyles.btnLayout}>
                <ButtonMenuGrid
                  imgUrl={require('@Asset/images/icon-helpdesk/newtiket.png')}
                  text="New Ticket"
                  tapTo="screen.SpecHelpDesk"
                  {...this.props}
                />
                <ButtonMenuGrid
                  imgUrl={require('@Asset/images/icon-helpdesk/history.png')}
                  text="History"
                  tapTo="screen.HistoryHelp"
                  {...this.props}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
