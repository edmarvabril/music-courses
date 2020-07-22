import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import {palette} from '../constants/colors';

const RoundedButton = ({
  label,
  buttonColor,
  iconComponent,
  onPress,
  fontSize,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: buttonColor || palette.red}]}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {iconComponent}
          <Text style={[styles.buttonLabel, {fontSize: fontSize || 12}]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default RoundedButton;
