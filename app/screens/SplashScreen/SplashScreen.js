import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Spinner from 'react-native-spinkit';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styles from './SplashScreen.style';
import logo from '../../assets/ga-logo.png';
import {palette} from '../../constants/colors';

const SplashScreen = ({isAuthenticated}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('LoginScreen');
    } else {
      navigation.replace('TabNavigator');
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Spinner type="Arc" size={150} color={palette.powderblue} />
    </View>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SplashScreen);
