/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {filter, get, round} from 'lodash';
import * as Progress from 'react-native-progress';

import {palette, shadow} from '../constants/colors';
import doneIcon from '../assets/modules/done.png';
import playIcon from '../assets/modules/play.png';
import lessoncurrent from '../assets/lessons/current.png';
import lessondone from '../assets/lessons/done.png';
import lessonpending from '../assets/lessons/pending.png';

const CourseCollapsible = ({
  moduleContent,
  index,
  isActive,
  onPress,
  onLessonPress,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handlePress = () => {
    setIsCollapsed(!isCollapsed);
    onPress(index);
  };

  const topics = get(moduleContent, 'topics', []);
  const topicsCount = topics.length;
  const completedCount = filter(topics, item => item.completed).length;
  const isModuleStarted = completedCount > 0;
  const currentInProgress = topics.find(topic => topic.completed === false); // temporary
  const progress = completedCount / topicsCount;
  const progressText = `${round(progress * 100)}%`;
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.header}>
        {isModuleStarted ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Progress.Circle
              progress={progress}
              size={36}
              unfilledColor={palette.fadedblue}
              borderWidth={0}
              color={palette.red}
              thickness={4}
            />
            <Text
              style={{
                position: 'absolute',
                color: palette.red,
                fontSize: 9,
                fontWeight: '600',
              }}>
              {progressText}
            </Text>
          </View>
        ) : (
          <Image
            source={moduleContent.completed ? doneIcon : playIcon}
            style={{height: 36, width: 36}}
          />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{moduleContent.title}</Text>
          <Text
            style={
              styles.desc
            }>{`${completedCount} out of ${topicsCount} lessons completed.`}</Text>
        </View>
      </View>
      <Collapsible collapsed={!isActive}>
        {topics.map((item, i) => {
          let isInProgress = false;
          if (currentInProgress) {
            isInProgress = item.id === currentInProgress.id;
          }
          return (
            <TouchableOpacity
              key={i.toString()}
              onPress={() => onLessonPress(moduleContent.id, item.id)}>
              <View style={styles.line} />
              <View style={styles.lesson}>
                {item.completed ? (
                  <Image source={lessondone} style={styles.lessonIcon} />
                ) : (
                  <Image
                    source={isInProgress ? lessoncurrent : lessonpending}
                    style={styles.lessonIcon}
                  />
                )}
                <View style={styles.lessonIcon} />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.lessonTitle,
                    {
                      color: isInProgress ? palette.midnightblue : palette.gray,
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Collapsible>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
    minHeight: 76,
    backgroundColor: 'white',
    ...shadow,
  },
  header: {
    flexDirection: 'row',
  },
  titleContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.steelblue,
    lineHeight: 19,
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    color: palette.gray,
  },
  lesson: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  lessonTitle: {
    marginLeft: 27,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    textTransform: 'capitalize',
  },
  lessonIcon: {
    height: 16,
    width: 16,
  },
  line: {
    height: 25,
    borderLeftWidth: 1,
    borderColor: palette.fadedblue,
    marginLeft: 17.5,
    marginBottom: 2,
  },
});

export default CourseCollapsible;
