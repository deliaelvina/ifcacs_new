import React from 'react';
import {Text, TouchableOpacity, View, Image, Linking} from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Theme/Colors';

export default class EmergencyList extends React.Component {
  render() {
    const {img, title, bg, onPress, datepost, call, halo} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          backgroundColor: bg,
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image source={img} style={{width: 40, height: 40}} />

        <View style={{width: '80%'}}>
          <Text
            style={{
              color: colors.bg_abuabu,
              //fontFamily: 'Bold',
              fontSize: 16,
              paddingHorizontal: 20,
              width: 200,
              // justifyContent: 'space-around',
              // alignContent: 'center',
              // alignItems: 'baseline',
              textAlign: 'justify',
            }}>
            {title}
          </Text>
        </View>

        <TouchableOpacity onPress={call}>
          <Icon
            name="phone-volume"
            style={{fontSize: 20, color: 'green', textAlign: 'right'}}></Icon>
        </TouchableOpacity>

        {/* <Text style={{
                    color: "#345c74",
                    fontFamily: "Medium",
                    fontSize: 13,
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    25%
                    </Text> */}
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
