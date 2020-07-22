import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';

import {palette} from '../constants/colors';
import checkedIcon from '../assets/checked.png';
import uncheckedIcon from '../assets/unchecked.png';

import SectionSpacer from './SectionSpacer';

const StepCard = ({containerStyle, info, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[containerStyle, styles.container]}>
        {/* <Image
          source={info.checked ? checkedIcon : uncheckedIcon}
          style={styles.icon}
        /> */}
        <Image style={styles.image} source={info.image} />
        <Text style={styles.title}>{info.title}</Text>
        <SectionSpacer height={10} />
        <Text style={styles.desc}>{info.desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 289,
    width: 265,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 24,
    width: 24,
  },
  image: {
    height: 175,
    width: 175,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: palette.midnightblue,
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 14,
    color: palette.gray,
  },
});

export default StepCard;
