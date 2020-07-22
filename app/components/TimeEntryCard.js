import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {isEqual} from 'lodash';

import {palette, shadow} from '../constants/colors';

const TimeEntryCard = ({entry}) => {
  const date = () => {
    if (
      isEqual(moment(entry.date).format('MMM DD'), moment().format('MMM DD'))
    ) {
      return 'Today';
    } else if (
      isEqual(
        moment(entry.date).format('MMM DD'),
        moment()
          .subtract(1, 'days')
          .format('MMM DD'),
      )
    ) {
      return 'Yesterday';
    } else {
      return moment(entry.date).format('MMM DD');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.digits}>{`${entry.mins}m ${entry.secs}s`}</Text>
      <Text style={styles.date}>{date()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'white',
    ...shadow,
  },
  digits: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.steelblue,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    lineHeight: 19,
    color: palette.gray,
  },
});

export default TimeEntryCard;
