import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import configureStore from './app/store/configureStore';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './app/AppNavigator';

const {store} = configureStore();
function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
