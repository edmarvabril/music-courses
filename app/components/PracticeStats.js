import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {connect} from 'react-redux';
import {get} from 'lodash';

import {shadow, palette} from '../constants/colors';
import StatCard from './StatCard';
import SectionSpacer from './SectionSpacer';
import PracticeEntries from './PracticeEntries';

const PracticeStats = ({dates}) => {
  return (
    <View>
      <View style={styles.streakStat}>
        <Text style={styles.title}>Your Practice Streak</Text>
        <View style={styles.statContainer}>
          <View style={styles.stats}>
            <StatCard label="Current streak" value={10} valueText="days" />
            <Text style={styles.vsText}>vs</Text>
            <StatCard label="highest streak" value={20} valueText="days" />
          </View>
        </View>
      </View>
      <SectionSpacer height={30} />
      <View style={styles.timeStat}>
        <Text style={styles.title}>Your Practice Time</Text>
        <View style={styles.statContainer}>
          <SwitchSelector
            bold
            options={[{label: 'WEEK', value: 0}, {label: 'MONTH', value: 1}]}
            initial={0}
            onPress={value => console.log(`Call onPress with value: ${value}`)}
            style={styles.switch}
            fontSize={14}
            buttonColor={palette.steelblue}
            backgroundColor={palette.fadedblue}
            height={48}
            textColor={palette.midnightblue}
          />
          <View style={styles.stats}>
            <StatCard label="This week" value={60} valueText="minutes" />
            <Text style={styles.vsText}>vs</Text>
            <StatCard label="last week" value={80} valueText="minutes" />
          </View>
        </View>
      </View>
      <SectionSpacer height={60} />
      <PracticeEntries entries={dates} />
      <SectionSpacer height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  streakStat: {
    height: 240,
    backgroundColor: 'white',
    borderRadius: 15,
    ...shadow,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: palette.midnightblue,
    textAlign: 'center',
    marginTop: 25,
  },
  statContainer: {
    marginTop: 20,
    flex: 1,
    borderTopWidth: 1,
    borderColor: palette.fadedblue,
    paddingHorizontal: 30,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  vsText: {
    color: palette.lightgray,
    fontSize: 20,
    lineHeight: 27,
    marginHorizontal: 20,
  },
  switch: {
    marginTop: 20,
  },
  timeStat: {
    height: 314,
    backgroundColor: 'white',
    borderRadius: 15,
    ...shadow,
  },
});

const mapStateToProps = state => ({
  dates: get(state, 'practice.dates'),
});

const mapDispatchToProps = {
  //
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PracticeStats);
