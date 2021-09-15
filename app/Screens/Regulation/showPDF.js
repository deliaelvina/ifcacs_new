import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

import Pdf from 'react-native-pdf';

import colors from '../../Theme/Colors';

export default class showPDF extends React.Component {
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

    this.state = {
      regulation: [],
      dateNow: new Date(),
    };
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    const dataReg = this.props.passed;

    const data = {
      // user: true,
      regulations_file: dataReg.regulations_file,
      regulations_title: dataReg.regulations_title,

      mounted: true,
    };
    console.log('data', data);
    this.setState(data, () => {});
  }
  render() {
    const source = {
      uri: this.state.regulations_file,
      cache: true,
    };
    console.log('source', source);
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <View style={styles.container}>
        <Text style={{marginVertical: 10, fontWeight: 'bold'}}>
          {this.state.regulations_title}
        </Text>
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
            console.log('filepat', filePath);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={source => {
            console.log(`Link presse: ${source}`);
          }}
          style={styles.pdf}
        />
      </View>
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
