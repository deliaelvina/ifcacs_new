import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SegmentedControlIOS,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  DatePicker,
  Button,
  Card,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import nbStyles from './Style';
import Style from '@Theme/Style';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {ListItem} from 'react-native-elements';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import CardTicket from '@Component/HelpDesk/CardTicket';
import OfflineNotice from '@Component/OfflineNotice';
import colors from '../../Theme/Colors';
import {urlApi} from '@Config';

class ViewHistory extends Component {
  static options(passProps) {
    return {
      topBar: {
        noBorder: true,
        title: {
          text: Platform.OS == 'ios' ? '' : 'View Status',
          // color: colors.bg_abuabu,
        },
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
      dataTicket: props.dataTicket,
      modalVisible: false,
      starCount: 0,
      audit_user: '',
      selectedReportNo: '',
    };

    // console.log('props', props.dataTicket);
  }

  async UNSAFE_componentWillMount() {
    const data = {
      audit_user: await AsyncStorage.getItem('@Name'),
    };
    this.setState(data);
  }

  setModalVisible(visible, report_no) {
    let rNo = visible === false ? '' : report_no;
    this.setState({
      modalVisible: visible,
      selectedReportNo: rNo,
    });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <NativeBaseProvider>
        {/* <OfflineNotice /> */}
        <ScrollView style={styles.listview}>
          <View>
            <View style={nbStyles.wrap}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={nbStyles.title}>View History Ticket</Text>
              </View>
            </View>
          </View>
          {this.state.dataTicket != undefined ? (
            this.state.dataTicket.map((data, key) => (
              <CardTicket
                data={data}
                key={key}
                email={this.state.email}
                {...this.props}
              />
            ))
          ) : (
            <ActivityIndicator></ActivityIndicator>
          )}
        </ScrollView>

        <Modal
          isVisible={this.state.modalVisible}
          deviceWidth={deviceWidth}
          style={nbStyles.bottomModal}>
          <View style={nbStyles.modalView}>
            <View style={nbStyles.modalContainer}>
              <View style={nbStyles.modalHeader}>
                <Text style={[Style.textBlack, nbStyles.textModal]}>
                  {this.state.selectedReportNo}
                </Text>
                <Icon
                  style={nbStyles.iconModal}
                  name="times"
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                />
              </View>
              <View style={nbStyles.modalBody}>
                <View>
                  <Text style={[Style.textBlack, nbStyles.modalBodyTitle]}>
                    Please rate our work !
                  </Text>
                </View>
                <View style={nbStyles.starWrap}>
                  <StarRating
                    fullStarColor={'#F9A233'}
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={rating => this.onStarRatingPress(rating)}
                  />
                </View>

                <View style={nbStyles.btnWrapModal}>
                  <TouchableOpacity
                    style={nbStyles.btnNo}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text style={nbStyles.textNo}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={nbStyles.btnYes}
                    onPress={() => this.btnSubmit()}>
                    <Text style={nbStyles.textYes}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </NativeBaseProvider>
    );
  }
}
export default ViewHistory;

const styles = StyleSheet.create({
  listview: {},
  listitemm: {
    height: 100,
  },
});
const starStyle = {
  width: 100,
  height: 20,
  marginBottom: 20,
};
