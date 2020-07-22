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
import moment from 'moment';
import {Slider} from '@miblanchard/react-native-slider';
import {connect} from 'react-redux';
import {toNumber} from 'lodash';

import RoundedButton from './RoundedButton';
import SectionSpacer from './SectionSpacer';
import {palette} from '../constants/colors';

import {saveLogTime} from '../store/actions';

const {height, width} = Dimensions.get('window');

const LogPracticeModal = ({
  onClose,
  visible,
  selectedDate,
  onSaveLogTime,
  token,
  requesting,
  requestSuccessful,
  entry,
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [inputText, setInputText] = useState('');

  const handleValueChange = value => {
    setSliderValue(value[0]);
  };

  useEffect(() => {
    if (entry) {
      if (visible) {
        setSliderValue(toNumber(entry.mins));
        setInputText(entry.duration_note);
      }
    } else {
      setSliderValue(0);
      setInputText('');
    }
  }, [visible]);

  const handleSavePress = () => {
    onSaveLogTime({
      token,
      data: {
        mins: sliderValue,
        secs: 0,
        date: selectedDate,
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
              <Text style={styles.label}>Log Your Practice</Text>
              <SectionSpacer height={20} />
              <Text style={styles.desc}>{`Date: ${moment(selectedDate).format(
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
            </View>
            <SectionSpacer height={40} />
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
  sublabel: {
    flexDirection: 'row',
    marginVertical: 20,
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
)(LogPracticeModal);
