import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as Progress from 'react-native-progress';

import {palette} from '../constants/colors';

const CourseThumbCard = ({containerStyle, info}) => {
  const progress =
    info.lessons_completed === 0 ? 0 : info.lessons_completed / info.lessons;
  return (
    <View style={[containerStyle, styles.container]}>
      <Image source={{uri: info.thumbnail}} style={styles.image} />
      <View style={styles.textSection}>
        <Text style={styles.title}>{info.title}</Text>
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>{`${
            info.lessons_completed
          } out of ${info.lessons} lessons`}</Text>
          <Progress.Bar
            progress={progress}
            width={100}
            height={8}
            color={palette.aqua}
            unfilledColor={palette.fadedblue}
            borderWidth={0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 289,
    width: 265,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    height: 160,
    width: 265,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textSection: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: palette.midnightblue,
    textTransform: 'capitalize',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: palette.gray,
  },
  bar: {
    height: 8,
    width: 100,
    borderRadius: 5,
    backgroundColor: palette.gray,
  },
});

export default CourseThumbCard;
