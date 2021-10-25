import React, { Component } from "react";
import {
    StatusBar,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    View,
    Alert,
    ActivityIndicator,
    Modal,
} from "react-native";
import { WebView } from 'react-native-webview';
import {
    Container,
    Header,
    Content,
    Button,
    Text,
    NativeBaseProvider
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../Theme/Colors';
import {Navigation} from 'react-native-navigation';

export default class WebViewPage extends React.PureComponent {

    static options(passProps) {
        return {
          topBar: {
            title :{
              text: 'Online Payment Billing',
              color: colors.bg_abuabu,
            },
            // noBorder: true,
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true,
          },
        };
      }

      handleNavigation = (screenName, passedProps) => {
        this.setState({isDisable: true}, () => {
          this.goToScreen(screenName, passedProps);
        });
      };
      
      goToScreen = (screenName, passedProps) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: screenName,
            passProps: {
              passed: passedProps,
            },
          },
        });
      };

    
    render() {
        const state = {...this.props.item}
        console.log('check props from NUP DETAIL',state);

        // const state = this.props;
        // console.log('check props from NUP DETAIL',state);

        return (
            // <NativeBaseProvider>
            //     <ScrollView style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                <WebView style={{flex:1}} source={{ 
                            uri: state.redirects,
                            method:'GET'
                    }} />
            //     </ScrollView>
            // </NativeBaseProvider>
        );
    }
}
