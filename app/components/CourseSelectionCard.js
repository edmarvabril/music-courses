import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {palette, shadow} from '../constants/colors';

const CourseSelectionCard = ({
  onPress,
  containerStyle,
  info,
  index,
  active,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(index, info.id)}
      style={[containerStyle, styles.container]}>
      <Image source={{uri: info.thumbnail}} style={styles.image} />
      <View style={styles.textSection}>
        <Text style={styles.title}>{info.title}</Text>
      </View>
      {active && <View style={styles.marker} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 145,
    backgroundColor: 'white',
    borderRadius: 15,
    ...shadow,
  },
  image: {
    height: 80,
    width: 145,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textSection: {
    padding: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 13,
    color: palette.midnightblue,
    textTransform: 'capitalize',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -9,
    zIndex: -1,
    transform: [{rotate: '45deg'}],
  },
});

export default CourseSelectionCard;
