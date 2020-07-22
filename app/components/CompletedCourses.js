import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';

import CourseSelectionCard from './CourseSelectionCard';
import SectionSpacer from './SectionSpacer';

const {width} = Dimensions.get('window');

const CompletedCourses = ({courses}) => {
  const handleCardPress = (index, id) => {
    console.info('index: ', index);
    console.info('id: ', id);
  };

  return (
    <View style={styles.container}>
      <SectionSpacer height={30} />
      <View style={styles.cardContainer}>
        {courses.map((item, index) => {
          return (
            <View style={styles.card}>
              <CourseSelectionCard
                info={item}
                index={index}
                onPress={handleCardPress}
              />
            </View>
          );
        })}
      </View>
      <SectionSpacer height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    width: width - 60,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    marginBottom: 20,
  },
});

export default CompletedCourses;
