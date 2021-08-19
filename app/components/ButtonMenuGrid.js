import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import colors from '../Theme/Colors';

class ButtonMenuGrid extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);

    this.state = {
      isDisable: false,
      linkTo: 'screen.ZonkScreen',
    };

    Navigation.events().bindComponent(this);
  }

  UNSAFE_componentWillMount() {
    let link = this.props.tapTo;
    if (link) {
      this.setState({linkTo: link});
    }
  }

  handleNavigation = screenName => {
    this.setState({isDisable: true}, () => {
      this.goToScreen(screenName);
    });
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
    });
  };

  componentDidDisappear() {
    this.setState({isDisable: false});
  }
  render() {
    return (
      <TouchableOpacity
        style={nbStyles.btnBox}
        onPress={() => {
          this.handleNavigation(this.state.linkTo);
        }}
        disabled={this.state.isDisable}>
        <Image source={this.props.imgUrl} style={nbStyles.btnImage} />
        <Text style={nbStyles.btnText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
export default ButtonMenuGrid;

const nbStyles = {
  btnBox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F4F5',
    borderRadius: 10,
    width: '40%',
    borderColor: 'transparent',
    borderWidth: 1,
    // -- create shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.1,
    elevation: 3,
    // -- end create shadow
  },
  btnText: {
    textAlign: 'center',
    color: colors.bg_abuabu,
  },
  btnImage: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
};
