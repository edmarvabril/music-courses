/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import RoundedButton from './RoundedButton';
import {palette} from '../constants/colors';

import {saveLogTime} from '../store/actions';

const {height, width} = Dimensions.get('window');

const LogTimeModal = ({
  onClose,
  visible,
  time,
  onSaveLogTime,
  token,
  date,
  requesting,
  requestSuccessful,
  dates,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSavePress = () => {
    onSaveLogTime({
      token,
      data: {
        mins: time.min,
        secs: time.sec,
        date,
        notes: inputText,
      },
    });
  };

  useEffect(() => {
    if (!requesting && requestSuccessful) {
      onClose();
    }
  }, [requesting, requestSuccessful]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView behavior="position">
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <SafeAreaView style={styles.subContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicon name="ios-close" size={28} color={palette.gray} />
            </TouchableOpacity>
            <View style={styles.parent}>
              <Text style={styles.label}>Log Your Practice Time</Text>
              <Text style={styles.digits}>{`${time.min} : ${time.sec} : ${
                time.msec
              }`}</Text>
              <Text style={styles.desc}>
                What did you practice? (optional):
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  value={inputText}
                  onChangeText={text => setInputText(text)}
                />
              </View>
              <RoundedButton
                onPress={handleSavePress}
                label="save"
                fontSize={16}
                loading={requesting}
              />
              <Text style={styles.note}>
                Note: Time recorded will be added to your previous entries for
                today, and what you practiced will be appended to any previous
                entries.
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  label: {
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    fontWeight: '600',
    color: palette.midnightblue,
    marginVertical: 20,
  },
  digits: {
    fontSize: 36,
    lineHeight: 49,
    textAlign: 'center',
    fontWeight: '600',
    color: palette.steelblue,
  },
  desc: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 19,
    color: palette.gray,
  },
  inputContainer: {
    height: 80,
    borderRadius: 6,
    backgroundColor: palette.powderblue,
    padding: 5,
    marginBottom: 30,
    marginTop: 10,
  },
  note: {
    marginVertical: 30,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: palette.gray,
  },
});

const mapStateToProps = state => ({
  token: state.auth.accessToken,
  requestSuccessful: state.practice.requestSuccessful,
  requesting: state.practice.requesting,
});

const mapDispatchToProps = {
  onSaveLogTime: saveLogTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogTimeModal);
