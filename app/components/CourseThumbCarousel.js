import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import CourseThumbCard from './CourseThumbCard';

const CourseThumbCarousel = ({courses}) => {
  return (
    <FlatList
      snapToInterval={280} // item width plus any additional padding or margin
      snapToAlignment="start"
      decelerationRate="fast"
      data={courses}
      style={styles.container}
      contentContainerStyle={{paddingRight: 30}}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <CourseThumbCard
            containerStyle={styles.contentContainer}
            info={item}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  contentContainer: {
    marginRight: 15,
  },
});

export default CourseThumbCarousel;
