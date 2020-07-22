import React from 'react';
import {View, ActivityIndicator, Image, Modal} from 'react-native';
import Spinner from 'react-native-spinkit';

import styles from './LoadingScreen.style';
import logo from '../../assets/ga-logo.png';
import {palette} from '../../constants/colors';

const LoadingScreen = () => {
  return (
    <Modal transparent>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Spinner type="Arc" size={150} color={palette.powderblue} />
      </View>
    </Modal>
  );
};

export default LoadingScreen;
