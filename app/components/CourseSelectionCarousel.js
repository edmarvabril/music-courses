/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {get} from 'lodash';

import CourseSelectionCard from './CourseSelectionCard';

const CourseSelectionCarousel = ({courses, onSelectionChange}) => {
  // const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedCardId, setselectedCardId] = useState(get(courses, '[0].id'));

  const flatList = useRef(null);

  const handleCardPress = (index, id) => {
    // setSelectedCardIndex(index);
    setselectedCardId(id);
    onSelectionChange(id);
    flatList.current.scrollToIndex({animated: true, index: index});
  };

  const handleScroll = e => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const cardIndex = xOffset / 160; // divide x-offset by interval to get index
    const selectedItem = courses.find((item, i) => i === cardIndex); // find which card item is selected
    // setSelectedCardIndex(cardIndex);

    // if selectedItem is truthy, value is not undefined
    if (selectedItem) {
      setselectedCardId(selectedItem.id);
      onSelectionChange(selectedItem.id);
    }
  };

  console.log('from course selection carousel', get(courses, '[0].id'));

  return (
    <FlatList
      onScroll={handleScroll}
      scrollEventThrottle={800}
      ref={flatList}
      snapToInterval={160} // item width plus any additional padding or margin
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
          <CourseSelectionCard
            index={index}
            containerStyle={styles.contentContainer}
            info={item}
            onPress={handleCardPress}
            active={selectedCardId === item.id}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  contentContainer: {
    marginRight: 15,
  },
});

export default CourseSelectionCarousel;
