/**
 * Tax Calculation App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from 'store/store';
import AppNavigator from 'screens/routes';
import SplashScreen from 'screens/welcome/Splash';
import OneSignal from 'react-native-onesignal';
import { WebView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true,
      url: "",
      wifi: false,
    }
  }

  componentDidMount() {
    this.CheckConnectivity();
    OneSignal.init("31d82524-fa3d-4871-95eb-b5a59083a5a0");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  async componentDidUpdate() {

  }
  
  render() {
    if(this.state.wifi === false)
      return (
        <SplashScreen/>
      );

    return (
      <>
        {
          this.state.page?
            <Provider store={store}>
              <PersistGate loading={<SplashScreen />} persistor={persistor}>
                <AppNavigator />
              </PersistGate>
            </Provider>
          :
            <WebView
              source={{uri: this.state.url}}
              style={{flex: 1}}
            />
        }
      </>
    );
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  CheckConnectivity = () => {
    NetInfo.fetch().then(state => {
      this.handleFirstConnectivityChange(state.isConnected);
    });
  };
  handleFirstConnectivityChange = isConnected => {

    if (isConnected === false) {
      //Alert.alert("You are offline!");
      this.setState({wifi: false})
    } else {
      this.setState({wifi: true})
      this.reload();
      /*
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
      */
    }
  };

  async reload() {
    // this.CheckConnectivity();
    let parent = this;

    await axios.get('http://townhall.magehire.com/is-multiple-lang')
    .then(async function (response) {
      if(response.data.data[0].data !== "") {
        parent.setState({
          page: false,
          url: response.data.data[0].data
        })
      }
    })
    .catch(function (error) {
      
    })
  }
  
}

console.disableYellowBox = true

export default App;
