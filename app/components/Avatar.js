import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {palette} from '../constants/colors';

const Avatar = ({onPress, source, size = 100}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{uri: source}}
        style={{
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: palette.lightgray,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //
});

export default Avatar;
