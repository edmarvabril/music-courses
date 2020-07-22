import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {palette} from '../constants/colors';
import lockIcon from '../assets/lessons/padlock.png';

const CourseSelectionTitle = ({
  title,
  isLocked,
  moduleCount,
  completedModuleCount,
}) => {
  return (
    <View style={styles.titleSection}>
      <View>
        <Text style={styles.contentTitle}>{title}</Text>
        <Text
          style={
            styles.desc
          }>{`${completedModuleCount} of ${moduleCount} modules completed`}</Text>
      </View>
      {isLocked && <Image source={lockIcon} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    textTransform: 'capitalize',
    color: palette.midnightblue,
  },
  desc: {
    color: palette.gray,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  icon: {
    height: 20,
    width: 16,
  },
});

export default CourseSelectionTitle;
