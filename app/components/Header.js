import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {textShadow} from '../constants/colors';

const Header = ({headerTitle, color}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicon name="ios-arrow-back" size={30} color={color} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={[styles.header, {color}]}>
        {headerTitle}
      </Text>
      <View style={styles.padder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 30,
    paddingRight: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  padder: {
    paddingRight: 50,
  },
});

export default Header;
