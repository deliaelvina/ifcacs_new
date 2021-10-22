// MasterHouseRuleslow1-6

import React from 'react';
import {StyleSheet, Dimensions, View, Text, Button} from 'react-native';
import {Image, NativeBaseProvider} from 'native-base';
import colors from '../../Theme/Colors';
import WebView from 'react-native-webview';

export default class RoleBook extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          //   text: 'Regulation / Document',
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

    this.state = {};
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    // const dataReg = this.props.passed;

    const data = {
      // user: true,
      // regulations_file: dataReg.regulations_file,
      // regulations_title: dataReg.regulations_title,

      mounted: true,
    };

    console.log('data', data);
    this.setState(data, () => {});
  }

  render() {
    return (
      <NativeBaseProvider>
        <WebView
          source={{
            uri: 'http://34.87.121.155:8181/apiwebifca/MasterHouseRuleslow1-6/index.html',
          }}
        />
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 2,
    // marginVertical: 15,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
