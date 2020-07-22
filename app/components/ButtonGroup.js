import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {palette, shadow} from '../constants/colors';

const ButtonGroup = ({buttons, buttonIndex, onPress}) => {
  const handleButtonPress = i => {
    onPress(i);
  };

  return (
    <View style={styles.container}>
      {buttons.map((item, index) => {
        const firstItem = index === 0;
        const lastItem = index === buttons.length - 1;
        return (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.button,
              {
                borderTopLeftRadius: firstItem && 10,
                borderBottomLeftRadius: firstItem && 10,
                borderTopRightRadius: lastItem && 10,
                borderBottomRightRadius: lastItem && 10,
              },
            ]}
            onPress={() => handleButtonPress(index)}>
            <Text
              style={buttonIndex === index ? styles.focused : styles.blurred}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    ...shadow,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 1,
  },
  focused: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: palette.midnightblue,
  },
  blurred: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: palette.lightgray,
  },
});

export default ButtonGroup;
