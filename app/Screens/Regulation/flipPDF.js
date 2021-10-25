import React from 'react';
import {StyleSheet, Dimensions, View, Text, Button} from 'react-native';
import {Image, NativeBaseProvider} from 'native-base';
import colors from '../../Theme/Colors';
import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import Pdf from 'react-native-pdf';

export default class flipPDF extends React.Component {
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
      page: 0,
      totalPage: 0,
      gambarPdf: [
        {key: '1', pdf: require('@Img/ilovepdf_pages-to-jpg/1.jpg')},
        {key: '2', pdf: require('@Img/ilovepdf_pages-to-jpg/2.jpg')},
        {key: '3', pdf: require('@Img/ilovepdf_pages-to-jpg/3.jpg')},
        {key: '4', pdf: require('@Img/ilovepdf_pages-to-jpg/4.jpg')},
        {key: '5', pdf: require('@Img/ilovepdf_pages-to-jpg/5.jpg')},
        {key: '6', pdf: require('@Img/ilovepdf_pages-to-jpg/6.jpg')},
        {key: '7', pdf: require('@Img/ilovepdf_pages-to-jpg/7.jpg')},
        {key: '8', pdf: require('@Img/ilovepdf_pages-to-jpg/8.jpg')},
        {key: '9', pdf: require('@Img/ilovepdf_pages-to-jpg/9.jpg')},
      ],
    };
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
    // const source = {
    //   uri: this.state.regulations_file,
    //   cache: true,
    // };
    // console.log('source', source);
    console.log('pdf img', this.state.gambarPdf);

    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <NativeBaseProvider>
        <FlipPage
          orientation={'horizontal'}
          loopForever={false}
          onFinish="null">
          {this.state.gambarPdf.map((data, index) => (
            <FlipPagePage key={index}>
              <Image
                source={data.pdf}
                alt="image base"
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}></Image>
              {/* <Text>{data.pdf}</Text> */}
              {/* <Text>Page 1</Text> */}
            </FlipPagePage>
          ))}
          {/* <FlipPagePage>
          <View style={{backgroundColor: 'red', height: '100%'}}>
            <Image source={require('@Img/bg-login/loginbg2.png')}></Image>
          </View>
        </FlipPagePage> */}
          {/* <FlipPagePage>
          <View style={{backgroundColor: 'red', height: '100%'}}>
            <Image source={require('@Img/bg-login/loginbg2.png')}></Image>
            {/* <Text>Page 1</Text> */}
          {/* </View>
        </FlipPagePage>
        <FlipPagePage>
          <View style={{backgroundColor: 'blue', height: '100%'}}>
            <Text>Page 2</Text>
          </View>
        </FlipPagePage>
        <FlipPagePage>
          <Text>Page 3</Text>
        </FlipPagePage>  */}
        </FlipPage>
      </NativeBaseProvider>

      // <RenderHtml
      //   source={{
      //     html: (
      //       <HTMLFlipBook
      //         width={300}
      //         height={500}
      //         onFlip={e => this.onFlip(e.data)}>
      //         {/* <Page number="1">Page text</Page>
      //         <Page number="2">Page text</Page>
      //         <Page number="3">Page text</Page>
      //         <Page number="4">Page text</Page> */}
      //       </HTMLFlipBook>
      //     ),
      //   }}
      //   contentWidth={Dimensions.get('window').width}></RenderHtml>
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
