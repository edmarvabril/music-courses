import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {palette} from '../constants/colors';
import RoundedButton from './RoundedButton';

const LockedCourseState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {'Upgrade To Premium\nFor Instant Access'}
      </Text>
      <Text style={styles.desc}>
        {
          'Join now to watch this video.\nPlus get full access to the\ncomplete library.'
        }
      </Text>
      <RoundedButton label="upgrade to premium" fontSize={14} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 270,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: palette.midnightblue,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: palette.gray,
    marginBottom: 20,
  },
});

export default LockedCourseState;
