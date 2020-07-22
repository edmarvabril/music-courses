import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {palette} from '../constants/colors';

const StatCard = ({label, value, valueText}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: palette.gray,
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 48,
    lineHeight: 65,
    color: palette.steelblue,
    textAlign: 'center',
    fontWeight: '600',
  },
  valueText: {
    color: palette.red,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    textTransform: 'uppercase',
  },
});

export default StatCard;
