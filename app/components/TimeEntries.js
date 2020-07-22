import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import SectionSpacer from './SectionSpacer';
import TimeEntryCard from './TimeEntryCard';
import {palette} from '../constants/colors';

const dummySelection = [
  {label: 'This Week', value: 'week'},
  {label: 'This Month', value: 'month'},
];

const TimeEntries = ({entries}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(dummySelection[0].value);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Your Practice Entries</Text>
        <RNPickerSelect
          value={selectedPeriod}
          onValueChange={value => setSelectedPeriod(value)}
          items={dummySelection}
          Icon={() => (
            <Ionicon name="ios-arrow-down" size={16} color={palette.gray} />
          )}
          style={{
            inputIOS: {
              fontSize: 14,
              fontWeight: '600',
              color: palette.gray,
              paddingRight: 20, // to ensure the text is never behind the icon
            },
          }}
        />
      </View>
      <SectionSpacer height={30} />
      {entries.map((item, i) => {
        console.log('day?', moment(item.date).week());
        return (
          <View key={i.toString()} style={styles.cardContainer}>
            <TimeEntryCard entry={item} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: palette.midnightblue,
  },
  cardContainer: {
    marginBottom: 15,
  },
});

export default TimeEntries;
