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
  Text,
  Left,
  Right,
  // Icon,
  VStack,
  HStack,
  Divider,
  NativeBaseProvider,
} from 'native-base';
import nbStyles from './Style';
import {Navigation} from 'react-native-navigation';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Title from '@Component/Title';
import SubTitle from '@Component/SubTitle';
import ButtonMenuGrid from '@Component/ButtonMenuGrid';
import OfflineNotice from '@Component/OfflineNotice';
import {urlApi} from '@Config';

class SelectCategory extends Component {
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

    this.state = {
      isDisabled: false,
      category_code: props.category_code,
      dataCategoryDetail: [],
      titleCategory: '',
    };

    console.log('props', props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this._isMount = true;
    this.getCategoryDetail();
  }

  getCategoryDetail = () => {
    const dT = this.props.prevProps.dataTower[0];
    console.log('category detail', dT);
    console.log('prevprops category detail', this.props.prevProps);

    const formData = {
      entity_cd: dT.entity_cd,
      project_no: dT.project_no,
      category_group: this.state.category_code,
      complain_type: this.props.prevProps.typeTicket,
    };
    console.log('formdata category detail', formData);

    const params =
      '?entity_cd=' + dT.entity_cd + '&' + 'project_no=' + dT.project_no;

    fetch(urlApi + '/csentry-getCategoryDetail' + params, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(res => {
        console.log('res category detail', res);
        if (res.Error === false) {
          let resData = res.Data;
          if (this._isMount) {
            this.setState({
              dataCategoryDetail: resData,
              titleCategory: resData[0].descs,
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });

    console.log('Selected index', this.state.selectedIndex);
  };

  onCategoryPress = cat => {
    this.setState({isDisabled: true}, () => {
      this.goToScreen('screen.SubmitHelpDesk', cat);
    });
  };

  goToScreen = (screenName, pass) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          prevProps: this.props.prevProps,
          category_cd: pass,
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
        <OfflineNotice />
        <ScrollView>
          <View style={nbStyles.wrap}>
            <Title text={this.state.titleCategory} />
            <View
              pointerEvents={this.state.isDisabled ? 'none' : 'auto'}></View>
            <VStack space={3} divider={<Divider />} w="100%">
              {this.state.dataCategoryDetail.map((data, key) => (
                <TouchableOpacity
                  onPress={() => this.onCategoryPress(data.category_cd)}
                  key={key}>
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
export default SelectCategory;

const styles = StyleSheet.create({
  listvieww: {
    marginTop: 20,
  },
  listitemm: {
    height: 100,
  },
});
