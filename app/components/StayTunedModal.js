/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import RoundedButton from './RoundedButton';
import {palette} from '../constants/colors';

const {height, width} = Dimensions.get('window');

const StayTunedModal = ({visible, onClose, text, icon}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <SafeAreaView style={styles.subContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicon name="ios-close" size={28} color={palette.gray} />
          </TouchableOpacity>
          <View style={styles.parent}>
            <Text style={styles.label}>Stay Tuned!</Text>
            {icon}
            <Text style={styles.sublabel}>{text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <RoundedButton
              onPress={onClose}
              label="got it!"
              fontSize={16}
              buttonColor={palette.midnightblue}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: palette.translucentBlue,
    justifyContent: 'flex-end',
  },
  subContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  parent: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: palette.midnightblue,
    marginVertical: 20,
  },
  sublabel: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: palette.midnightblue,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginVertical: 40,
  },
});

export default StayTunedModal;
