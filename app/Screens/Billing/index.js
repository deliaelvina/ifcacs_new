import React, {Component} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  RefreshControl,
  Animated,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  H3,
  Button,
  Header,
  Left,
  Body,
  Card,
  Icon,
  Title,
  Right,
  NativeBaseProvider,
} from 'native-base';

class Billing extends React.Component {
  // _isMounted: false;

  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
      },
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
      },
    };
  }
  render() {
    return (
      <NativeBaseProvider>
        <View>
          <Text>ini billing</Text>
        </View>
      </NativeBaseProvider>
    );
  }
}

export default Billing;
