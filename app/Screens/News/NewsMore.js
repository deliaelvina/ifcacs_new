import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
// import Style from '../../Theme/Style';
import {Style, Colors} from '../../Theme/';
// import Style from '@Theme/Style';
// import ProgressCircle from 'react-native-progress-circle'
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
import colors from '../../Theme/Colors';
import moment from 'moment';

export default class NewsMore extends React.Component {
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
    this.myRef = React.createRef();
    this.state = {
      dataNews: [],
    };
  }
  async componentDidMount() {
    // this.startHeaderHeight = 150;
    // if (Platform.OS == 'android') {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    console.log('item from passed prop', this.props.passed);
    const dataNews = this.props.passed;
    const data = {
      // user: true,

      mounted: true,
    };
    console.log('data', data);
    this.setState({data, dataNews}, () => {});
  }

  sortDate() {
    const dateArray = this.state.dataNews;
    console.log('date all', dateArray);
    let dateSort = [];
    dateArray.map(item => {
      if (item.date_created) {
        let date = {
          //   ...item,
          date_created: item.date_created,
        };
        console.log('date', date);
        dateSort.push(date);
      }
    });
    const sortedArray = dateSort.sort(
      (a, b) =>
        new moment(a.date_created).format('YYYYMMDD') -
        new moment(b.date_created).format('YYYYMMDD'),
    );
    console.log(sortedArray);
  }
  render() {
    console.log('datanews', this.state.dataNews);
    return (
      <View>
        <TouchableOpacity onPress={() => this.sortDate()}>
          <Text>sorts</Text>
        </TouchableOpacity>
        {this.state.dataNews.map((item, index) => (
          <Text key={index} style={{color: 'black'}}>
            {item.news_title}
          </Text>
        ))}
      </View>
    );
  }
}
