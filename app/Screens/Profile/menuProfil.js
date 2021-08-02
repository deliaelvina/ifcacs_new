import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Platform,
} from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../Theme/Colors';
import IconFA from 'react-native-vector-icons/FontAwesome';

export default class MenuProfil extends React.Component {
  render() {
    const {img, bg, onPress, menu} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          backgroundColor: bg,
          paddingLeft: 10,
          // paddingTop: 10,
          // paddingBottom: 10,
          marginHorizontal: 10,
          borderRadius: 10,
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
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            height: 50,
            alignItems: 'center',
          }}>
          <Image
            source={img}
            style={{
              width: 25,
              height: 25,
              //   borderRadius: 10,
              resizeMode: 'contain',
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: colors.bg_abuabu,
              //fontFamily: "Bold",
              fontSize: 14,
              //   paddingHorizontal: 10,
              width: '80%',
              //   justifyContent: 'space-around',
              // alignContent: 'center',
              // alignItems: 'baseline',
              //   fontWeight: 'bold',
              //   textAlign: 'justify',
            }}>
            {menu}
          </Text>
          <IconFA
            name="chevron-right"
            style={{
              fontSize: 16,
              paddingTop: 5,
              marginRight: 10,

              justifyContent: 'space-around',
              color: colors.bg_abuabu,
            }}></IconFA>
        </View>
      </TouchableOpacity>
    );
  }
}
