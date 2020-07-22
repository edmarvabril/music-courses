/* eslint-disable react-native/no-inline-styles */
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
import {Slider} from '@miblanchard/react-native-slider';
import moment from 'moment';
import {toNumber} from 'lodash';

import RoundedButton from './RoundedButton';
import {palette} from '../constants/colors';
import SectionSpacer from './SectionSpacer';

import {saveLogTime} from '../store/actions';

const {height, width} = Dimensions.get('window');

const UpdateEntryModal = ({
  onClose,
  visible,
  onSaveLogTime,
  token,
  requesting,
  requestSuccessful,
  entry,
}) => {
  const [inputText, setInputText] = useState(entry.duration_note);
  const [sliderValue, setSliderValue] = useState(entry.mins);

  const handleValueChange = value => {
    setSliderValue(value[0]);
  };

  useEffect(() => {
    if (visible) {
      setSliderValue(toNumber(entry.mins));
      setInputText(entry.duration_note);
    }
  }, [visible]);

  const handleSavePress = () => {
    onSaveLogTime({
      token,
      data: {
        mins: sliderValue,
        secs: 0,
        date: moment(entry.date).format('YYYY-MM-DD'),
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
              <Text style={styles.label}>Update Practice Entry</Text>
              <SectionSpacer height={20} />
              <Text style={styles.desc}>{`Date: ${moment(entry.date).format(
                'MMMM DD, YYYY',
              )}`}</Text>
              <SectionSpacer height={10} />
              <View style={styles.sublabel}>
                <Text style={styles.desc}>How many minutes?</Text>
                <Text style={styles.mins}>{sliderValue}</Text>
              </View>
              <View style={styles.timeMarkerContainer}>
                <Text style={styles.timeMarker}>0</Text>
                <Text style={[styles.timeMarker, {paddingLeft: 8}]}>15</Text>
                <Text style={styles.timeMarker}>30</Text>
                <Text style={styles.timeMarker}>45</Text>
                <Text style={styles.timeMarker}>60</Text>
              </View>
              <Slider
                trackStyle={styles.slider}
                thumbStyle={styles.trackthumb}
                minimumValue={0}
                maximumValue={60}
                step={1}
                thumbTintColor={palette.red}
                minimumTrackTintColor={palette.red}
                maximumTrackTintColor={palette.fadedblue}
                trackClickable
                value={sliderValue}
                onValueChange={handleValueChange}
              />
              <SectionSpacer height={30} />
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
  sublabel: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  mins: {
    fontSize: 14,
    lineHeight: 19,
    marginLeft: 5,
    color: palette.red,
  },
  timeMarkerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeMarker: {
    fontSize: 11,
    lineHeight: 15,
    color: palette.gray,
  },
  slider: {
    height: 8,
    borderRadius: 100,
  },
  trackthumb: {
    height: 14,
    width: 14,
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
)(UpdateEntryModal);
