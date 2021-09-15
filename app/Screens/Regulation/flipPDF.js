import React from 'react';
import {StyleSheet, Dimensions, View, Text, Button} from 'react-native';

import colors from '../../Theme/Colors';
import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import Pdf from 'react-native-pdf';
import HTMLFlipBook from 'react-pageflip';
import RenderHtml from 'react-native-render-html';
const PageCover = React.forwardRef((props, ref) => {
  return (
    // <RenderHtml>
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children} halo</h2>
      </div>
    </div>
    // </RenderHtml>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

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
    // this.setState({
    //   totalPage: this.flipBook.getPageFlip().getPageCount(),
    // });
  }

  onFlip() {
    const source = {
      uri: this.state.regulations_file,
      cache: true,
    };
    return source;
    //   console.log(data);
  }

  //   nextButtonClick = () => {
  //     this.flipBook.getPageFlip().flipNext();
  //   };

  //   prevButtonClick = () => {
  //     this.flipBook.getPageFlip().flipPrev();
  //   };

  //   onPage = e => {
  //     this.setState({
  //       page: e.data,
  //     });
  //   };
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
      <RenderHtml
        source={{
          html: (
            <HTMLFlipBook
              width={300}
              height={500}
              onFlip={e => this.onFlip(e.data)}>
              {/* <Page number="1">Page text</Page>
              <Page number="2">Page text</Page>
              <Page number="3">Page text</Page>
              <Page number="4">Page text</Page> */}
            </HTMLFlipBook>
          ),
        }}
        contentWidth={Dimensions.get('window').width}></RenderHtml>
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
