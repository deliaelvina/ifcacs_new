import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
const {width} = Dimensions.get('window');
let startTop = 30;
if (Platform.OS == 'android') {
  // startTop = 100 + StatusBar.currentHeight;
  startTop = 0;
}
import NetInfo from '@react-native-community/netinfo';
import {left} from 'styled-system';

const unsubscribe = NetInfo.addEventListener(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

class OfflineNotice extends React.Component {
  state = {
    isConnected: true,
    isVisible: false,
  };

  // constructor() {
  //   this.unsubscribe = NetInfo.addEventListener(
  //     'connectionChange',
  //     this.handleConnectivityChange,
  //   );
  // }

  componentDidMount() {
    // NetInfo.getConnectionInfo().then(connectionInfo => {
    //   console.log(connectionInfo.type);
    //   if (connectionInfo.type == 'unknown' || connectionInfo.type == 'none') {
    //     this.setState({isConnected: false});
    //   } else {
    //     this.setState({isConnected: true});
    //   }
    // });

    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.type == 'unknown' || state.type == 'none') {
        this.setState({isConnected: false});
      } else {
        this.setState({isConnected: true});
      }
    });

    // NetInfo.isConnected.addEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange,
    // );
    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  // UNSAFE_componentWillUnmount() {
  //   unsubscribe();
  //   // NetInfo.removeEventListener(
  //   //   'connectionChange',
  //   //   this.handleConnectivityChange,
  //   // );
  // }

  handleConnectivityChange = networkStatus => {
    console.log('network status', networkStatus);
    if (networkStatus) {
      this.setState({isConnected: true, isVisible: true}, () => {
        setTimeout(() => {
          this.setState({isVisible: false});
        }, 2000);
      });
    } else {
      this.setState({isConnected: false});
    }
  };

  renderOffline() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }

  renderOnline() {
    return (
      this.state.isVisible && (
        <View style={styles.onlineContainer}>
          <Text style={styles.onlineText}>Connected</Text>
        </View>
      )
    );
  }

  render() {
    console.log('offline?', this.state.isConnected);
    if (!this.state.isConnected) {
      return this.renderOffline();
    }

    return this.renderOnline();
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    // top: 0,
    top: startTop,
  },
  offlineText: {
    color: '#fff',
  },

  onlineContainer: {
    backgroundColor: '#4AA22E',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: startTop,
  },
  onlineText: {
    color: '#fff',
  },
});
export default OfflineNotice;
