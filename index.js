import React from 'react';
import {Navigation} from 'react-native-navigation';
import {registerScreen} from './app/Screens/screens';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

registerScreen();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing',
      },
    },
  });
});
