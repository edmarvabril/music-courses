import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {capitalize} from 'lodash';

import {palette} from '../constants/colors';
const WelcomeHeader = ({name, avatar}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greet}>Welcome, {capitalize(name)}!</Text>
        <Text style={styles.info}>
          {'Complete these three steps \nbelow to get started.'}
        </Text>
      </View>
      <Image source={{uri: avatar}} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  greet: {
    fontSize: 28,
    fontWeight: '600',
    color: palette.midnightblue,
  },
  info: {
    fontSize: 18,
    color: palette.gray,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default WelcomeHeader;
