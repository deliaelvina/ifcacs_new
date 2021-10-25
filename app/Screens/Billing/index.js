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
  Text,
  NativeBaseProvider,
  List,
  Box,
  Stack,
  Heading
} from 'native-base';
import colors from '../../Theme/Colors';
import nbStyles from './Style';
import {sessions} from '../../_helpers';
import DeviceInfo from 'react-native-device-info';
import {Navigation} from 'react-native-navigation';

export default class Billing extends React.Component {
//  _isMount = false;

  static options(passProps) {
    return {
      topBar: {
        title :{
          text: 'Billing',
          color: colors.bg_abuabu,
        },
        // noBorder: true,
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
      mounted: false,
      isDisabled: false,
      isLoaded: true,

      username: '',
      email: '',
      token: '',
      userId: '',

      duedate: [],
      trx_type: '0113'
    };

  }
// ---------------- FUNCTION FOR GET API ----------------------
async UNSAFE_componentWillMount() {
  // get the storage usage

  const data = {
    email: await sessions.getSess('@User'),
    username: await sessions.getSess('@Name'),
    token: await sessions.getSess('@Token'),
    userId: await sessions.getSess('@UserId'),
    mounted: true,
    isLogin: await sessions.getSess('@isLogin'),
  };
  console.log('data sess profil', data);
  this.setState(data, () => this.getBilling(data.email));
}

getBilling = () => {
  // console.log(this.state.email);
  const emails = this.state.email;
  console.log('get email', emails)
  fetch(
    'http://34.87.121.155:2121/apisysadmin/api/getDataDue/WPR/' + emails,
    // "https://my.api.mockaroo.com/news.json",
    {
      method:'GET',
      headers : this.state.hd,
      // method: 'POST',
      // body: JSON.stringify({emailz: emails})
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
        // Token: this.state.token,
      // },
    },
  )
  .then(response => response.json())
  .then(res => {
    if (!res.Error) {
      let resData = res.Data;
      // this.setState({privacy: resData, isVisible: true}, () => {
      //   setTimeout(() => {
      //     this.setState({isVisible: false});
      //   }, 2000);
      // });
      //   setTimeout(() => {
      //     this.setState({isLoaded: true});
      //   }, 2000);
      this.setState({duedate: resData});
      // this.setState({isLoaded: false});
      console.log('getDuedates', resData);
    } else {
      this.setState({isLoaded: true}, () => {
        alert(res.Pesan);
      });
    }
    // this.setState({isLoaded: false});
    console.log('getDuedate2', res);
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

// ---------------- (end) FUNCTION FOR GET API ----------------------

  render() {
    const getEmail = {
      isEmail: this.state.email
  }
    return (
      <NativeBaseProvider>
        <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        {this.state.duedate.map((item, index) => (
          <TouchableOpacity onPress={() => this.handleNavigation('screen.BillingDetail', item)}
          key={index}>
            <Box bg="white"
                shadow={2}
                rounded="lg"
                maxWidth="100%"
                style={{paddingBottom: 10}}>
                <Stack space={4} p={[4, 4, 8]}>
                  <Text color="gray.400">
                    {item.doc_no}
                  </Text>
                  <Heading
                    size={['md', 'lg', 'md']}
                    //   noOfLines={2}
                    textAlign="justify">
                    {item.name}
                  </Heading>
                  <Text
                    lineHeight={[5, 5, 7]}
                    noOfLines={[3, 4, 2]}
                    color="gray.700">
                    {item.tower}
                  </Text>
                </Stack>

            </Box>
          </TouchableOpacity>
          ))}

        {/* <TouchableOpacity onPress={() => this.handleNavigation('screen.BillingDetail', getEmail.isEmail)}>
            <Box bg="white"
                shadow={2}
                rounded="lg"
                maxWidth="100%"
                style={{paddingBottom: 10}}>
                <Stack space={4} p={[4, 4, 8]}>
                  <Text color="gray.400">
                  WE10283536
                  </Text>
                  <Heading
                    size={['md', 'lg', 'md']}
                    //   noOfLines={2}
                    textAlign="justify">
                    SUSELO
                  </Heading>
                  <Text
                    lineHeight={[5, 5, 7]}
                    noOfLines={[3, 4, 2]}
                    color="red.400">
                    Waiting for admin's confirmation
                  </Text>
                </Stack>

            </Box>
          </TouchableOpacity> */}
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

// export default Billing;
