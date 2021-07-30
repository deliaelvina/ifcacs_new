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

export default class PromoList extends React.Component {
  render() {
    const {img, title, bg, onPress, datepost} = this.props;
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
        <Image
          source={img}
          // style={{
          //   width: 100,
          //   height: 100,
          //   borderRadius: 20,
          //   resizeMode: 'contain',
          // }}
          style={{
            marginTop: Platform.OS === 'ios' ? 12 : 0,
            marginBottom: Platform.OS === 'ios' ? 12 : 0,
            width: Platform.OS === 'ios' ? 100 : 100,
            height: Platform.OS === 'ios' ? 75 : 100,
            borderRadius: Platform.OS === 'ios' ? 15 : 20,
            resizeMode: Platform.OS === 'ios' ? 'contain' : 'contain',
          }}
        />

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
            {title}
          </Text>
          <Text
            style={{
              color: colors.bg_abuabu,
              //   fontFamily: 'Medium',
              fontSize: 13,
              paddingHorizontal: 20,
            }}>
            {datepost}
          </Text>
        </View>

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
