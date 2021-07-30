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

export default class NewsList extends React.Component {
  render() {
    const {
      img,
      title,
      bg,
      onPress,
      desc,
      data,
      item,
      numColumns,
      colorTextTitle,
      colorTextDesc,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          // flexDirection: "row",
          // backgroundColor: Colors.backgrey,
          backgroundColor: bg,
          // padding: 10,
          // marginHorizontal: 5,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop: 5,
          // margin: 5,
          // width: vw / numColumns,
          height: vw / numColumns,
          // height: vh / numColumns,

          // flexWrap: "wrap",
          flex: 1,

          // -- create shadow
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          // -- end create shadow
        }}>
        <Image
          source={img}
          style={{
            resizeMode: 'cover',
            flex: 1,
            width: 190,
            height: 300,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <View style={{width: 190}}>
          <Text
            style={{
              color: colorTextTitle,
              // //fontFamily: "Bold",
              fontWeight: 'bold',
              fontSize: 16,
              paddingHorizontal: 5,
              textAlign: 'left',
              // width: 190,
              paddingTop: 5,

              // flex:
            }}>
            {title}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{
              color: colorTextDesc,
              //fontFamily: 'Medium',
              fontSize: 12,
              paddingHorizontal: 5,
              // width: 190,
              // paddingBottom: 20
              marginBottom: 10,
            }}>
            {desc}
          </Text>
        </View>

        {/* <ProgressCircle
                    percent={30}
                    radius={17}
                    borderWidth={1.5}
                    color="f580084"
                    shadowColor="#FFF"
                    bgColor="#FFF"
                >
                    <Image
                        source={require('@Asset/images/pl.png')}
                    />
                </ProgressCircle> */}
      </TouchableOpacity>
    );
  }
}
