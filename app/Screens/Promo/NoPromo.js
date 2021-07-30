import React from 'react';
import {Text, TouchableOpacity, View, Image, Linking} from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../Theme/Colors';

export default class NoPromo extends React.Component {
  render() {
    const {img, title, bg, onPress, datepost} = this.props;
    return (
      <TouchableOpacity
        // onPress={onPress}
        style={{
          flexDirection: 'row',
          backgroundColor: bg,
          paddingLeft: 10,
          // paddingTop: 10,
          // paddingBottom: 10,
          marginHorizontal: 10,
          borderRadius: 20,
          alignItems: 'center',
          marginTop: 10,
          // -- create shadow
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          // -- end create shadows
        }}>
        {/* <Image
          source={img}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            resizeMode: 'contain',
          }}
        /> */}

        <View style={{width: '80%'}}>
          <Text
            style={{
              color: colors.bg_abuabu,
              //fontFamily: "Bold",
              fontSize: 16,
              paddingHorizontal: 20,
              width: 200,
              // justifyContent: 'space-around',
              // alignContent: 'center',
              // alignItems: 'baseline',
              fontWeight: 'bold',
              textAlign: 'justify',
            }}>
            No Promo Available
          </Text>
          {/* <Text
            style={{
              color: colors.bg_abuabu,
              //   fontFamily: 'Medium',
              fontSize: 13,
              paddingHorizontal: 20,
            }}>
            {datepost}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}
