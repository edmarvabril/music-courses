import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import guitar1 from '../assets/guitar/guitar1.png';
import guitar2 from '../assets/guitar/guitar2.png';
import guitar3 from '../assets/guitar/guitar3.png';
import plusButton from '../assets/whiteplus.png';

import {shadow, palette} from '../constants/colors';
import SectionSpacer from './SectionSpacer';

const {height} = Dimensions.get('window');

const EmptyCourseState = ({onPlusPress}) => {
  return (
    <View style={styles.container}>
      <SectionSpacer height={height / 6} />
      <View style={styles.cardsContainer}>
        <View style={styles.card2}>
          <Image source={guitar2} style={styles.image2} />
        </View>
        <View style={styles.card1}>
          <Image source={guitar1} style={styles.image1} />
        </View>
        <View style={styles.card3}>
          <Image source={guitar3} style={styles.image2} />
        </View>
      </View>
      <Text style={styles.title}>No Courses!</Text>
      <Text style={styles.desc}>
        Choose a course from Course tab or use the button below to start
      </Text>
      <TouchableOpacity onPress={onPlusPress} style={styles.plusButton}>
        <Image source={plusButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  card1: {
    height: 160,
    width: 160,
    borderRadius: 15,
    backgroundColor: 'white',
    ...shadow,
  },
  card2: {
    height: 120,
    width: 120,
    borderRadius: 15,
    backgroundColor: 'white',
    ...shadow,
    transform: [{rotate: '-15deg'}],
    position: 'absolute',
    right: 100,
    bottom: 12,
    zIndex: -1,
  },
  card3: {
    height: 120,
    width: 120,
    borderRadius: 15,
    backgroundColor: 'white',
    ...shadow,
    transform: [{rotate: '15deg'}],
    position: 'absolute',
    left: 100,
    bottom: 12,
    zIndex: -1,
  },
  image1: {
    height: 114,
    width: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image2: {
    height: 85,
    width: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    height: 25,
    lineHeight: 25,
    textTransform: 'capitalize',
  },
  desc: {
    color: palette.gray,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    width: 211,
    marginTop: 10,
    marginBottom: 20,
  },
  plusButton: {
    height: 44,
    width: 44,
    borderRadius: 10,
    backgroundColor: palette.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyCourseState;
