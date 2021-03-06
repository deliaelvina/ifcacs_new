// Note : ini semua masih hardcode
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  VStack,
  HStack,
  Divider,
  Text,
  Left,
  Right,
  // Icon,
  NativeBaseProvider,
} from 'native-base';
import nbStyles from './Style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import ButtonMenuGrid from '@Component/ButtonMenuGrid';
import OfflineNotice from '@Component/OfflineNotice';
import {urlApi} from '@Config';

class CategoryHelp extends React.Component {
  _isMount = false;

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

  constructor(props) {
    super(props);
    console.log('props', props);

    this.state = {
      dataCategory: [],
      isDisabled: false,
    };

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this._isMount = true;
    this.getCategoryHelp();
  }

  UNSAFE_componentWillUnmount() {
    this._isMount = false;
  }

  getCategoryHelp = () => {
    const dT = this.props.prevProps.dataTower[0];
    console.log('dt category help', dT);

    const formData = {
      entity: dT.entity_cd,
      project: dT.project_no,
    };

    console.log('formdata category help', formData);

    fetch(urlApi + '/csentry-getCategoryHelp', {
      method: 'GET',
      // body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Token: this.state.token
      },
    })
      .then(response => response.json())
      .then(res => {
        console.log('res category help', res);
        if (res.Error === false) {
          let resData = res.Data;
          if (this._isMount) {
            this.setState({dataCategory: resData});
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onCategoryPress = cat => {
    // this.goToScreen('screen.SelectCategory', cat);
    this.setState({isDisabled: true}, () => {
      this.goToScreen('screen.SelectCategory', cat);
    });
  };

  goToScreen = (screenName, pass) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          prevProps: this.props.prevProps,
          category_code: pass,
        },
      },
    });
  };

  componentDidDisappear() {
    this.setState({isDisabled: false});
  }

  render() {
    return (
      <NativeBaseProvider>
        {/* <OfflineNotice /> */}
        <ScrollView>
          <View style={nbStyles.wrap}>
            <VStack space={3} divider={<Divider />} w="100%">
              {this.state.dataCategory.map((data, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => this.onCategoryPress(data.category_group_cd)}>
                  <HStack justifyContent="space-between">
                    <Text>{data.descs}</Text>
                    <IconFA name="chevron-right" style={{fontSize: 14}} />
                  </HStack>
                </TouchableOpacity>
              ))}
            </VStack>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
export default CategoryHelp;

const styles = StyleSheet.create({
  listvieww: {
    marginTop: 20,
  },
  listitemm: {
    height: 100,
  },
});
