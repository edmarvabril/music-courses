/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
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
import {Slider} from '@miblanchard/react-native-slider';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

import RoundedButton from './RoundedButton';
import SectionSpacer from './SectionSpacer';
import DaySelection from './DaySelection';
import {palette} from '../constants/colors';

import {saveDays, getDays} from '../store/actions';

const {height, width} = Dimensions.get('window');

const ChangeGoalModal = ({
  visible,
  onClose,
  days,
  onSaveDays,
  token,
  requesting,
  requestSuccessful,
  minuteGoal,
}) => {
  const [sliderValue, setSliderValue] = useState(minuteGoal);
  const [selectedDays, setSelectedDays] = useState(days);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = value => {
    setSliderValue(value[0]);
  };

  useEffect(() => {
    if (visible) {
      setSliderValue(minuteGoal);
      setSelectedDays(days);
    }
  }, [visible]);

  const handleSavePress = () => {
    if (sliderValue < 1) {
      setHasError(true);
      setErrorMessage('At least one minute is required.');
    } else if (isEmpty(selectedDays)) {
      setHasError(true);
      setErrorMessage('At least one day of week is required.');
    } else {
      onSaveDays({
        token,
        data: {
          days: selectedDays,
          minutes: sliderValue,
        },
      });
    }
  };

  useEffect(() => {
    if (sliderValue > 0) {
      setHasError(false);
      setErrorMessage('');
    } else if (isEmpty(selectedDays)) {
      setHasError(false);
      setErrorMessage('');
    }
  }, [sliderValue, selectedDays]);

  useEffect(() => {
    if (!requesting && requestSuccessful) {
      onClose();
    }
  }, [requesting, requestSuccessful]);

  console.log('MINGO', minuteGoal);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <SafeAreaView style={styles.subContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicon name="ios-close" size={28} color={palette.gray} />
          </TouchableOpacity>
          <View style={styles.parent}>
            <Text style={styles.label}>Change Daily Practice Goal</Text>
            <View style={styles.sublabel}>
              <Text style={styles.desc}>How many minutes per day?</Text>
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
            <SectionSpacer height={40} />
            <Text style={styles.desc}>Choose specific days</Text>
            <SectionSpacer height={20} />
          </View>
          <DaySelection
            selectedDays={selectedDays}
            paddingHorizontal={30}
            onSelectionChange={selection => setSelectedDays(selection)}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.error}>
              {hasError && (
                <Ionicon name="ios-alert" color={palette.red} size={20} />
              )}
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <RoundedButton
              loading={requesting}
              onPress={handleSavePress}
              label="update"
              fontSize={16}
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
  error: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  errorMessage: {
    color: palette.red,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginVertical: 40,
  },
});

const mapStateToProps = state => ({
  days: state.practice.days.map(d => d.day),
  token: state.auth.accessToken,
  requesting: state.practice.requesting,
  requestSuccessful: state.practice.requestSuccessful,
});

const mapDispatchToProps = {
  fetchDays: getDays,
  onSaveDays: saveDays,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeGoalModal);
