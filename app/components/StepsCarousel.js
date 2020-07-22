import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import StepCard from './StepCard';

const GoalsCarousel = ({steps, onStepPress}) => {
  return (
    <FlatList
      snapToInterval={280}
      snapToAlignment="start"
      decelerationRate="fast"
      data={steps}
      style={styles.container}
      contentContainerStyle={{paddingRight: 30}}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <StepCard
            onPress={() => onStepPress(index)}
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

export default GoalsCarousel;
