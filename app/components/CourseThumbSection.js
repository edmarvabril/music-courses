import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CourseThumbCarousel from './CourseThumbCarousel';
import SectionSpacer from './SectionSpacer';
import {palette} from '../constants/colors';

const CourseThumbSection = ({courses, title}) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.link}>View All</Text>
      </View>
      <SectionSpacer height={10} />
      <CourseThumbCarousel courses={courses} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.midnightblue,
    textTransform: 'capitalize',
  },
  link: {
    color: '#497DC0',
    fontWeight: '600',
  },
});

export default CourseThumbSection;
