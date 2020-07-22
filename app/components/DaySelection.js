import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {includes, isEqual, sortBy} from 'lodash';

import {palette} from '../constants/colors';

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DaySelection = ({paddingHorizontal, selectedDays, onSelectionChange}) => {
  const handleDayPress = day => {
    if (includes(selectedDays, day)) {
      onSelectionChange(selectedDays.filter(item => item !== day));
    } else {
      onSelectionChange([...selectedDays, day]);
    }
  };

  const isAllSelected = isEqual(sortBy(selectedDays), sortBy(days));

  const handleAllPress = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(days);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, {paddingHorizontal}]}>
      <TouchableOpacity
        onPress={handleAllPress}
        style={isAllSelected ? styles.selectedButton : styles.button}>
        <Text style={isAllSelected ? styles.selectedDayText : styles.dayText}>
          all days
        </Text>
      </TouchableOpacity>
      {days.map((day, i) => {
        const selected = includes(selectedDays, day);
        return (
          <TouchableOpacity
            key={i.toString()}
            onPress={() => handleDayPress(day)}
            style={selected ? styles.selectedButton : styles.button}>
            <Text style={selected ? styles.selectedDayText : styles.dayText}>
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: palette.fadedblue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedButton: {
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: 'rgba(227, 36, 56, 0.05)',
    borderWidth: 1,
    borderColor: palette.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dayText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: palette.midnightblue,
  },
  selectedDayText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: palette.red,
  },
});

export default DaySelection;
