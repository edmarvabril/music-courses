/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {reverse, get, isEqual} from 'lodash';

import Header from '../../components/Header';
import TimeEntries from '../../components/TimeEntries';
import SectionSpacer from '../../components/SectionSpacer';
import LogTimeModal from '../../components/LogTimeModal';

import styles from './PracticeTimer.style';
import playIcon from '../../assets/play.png';
import pauseIcon from '../../assets/pause.png';

let padToTwo = number => (number <= 9 ? `0${number}` : number);

const PracticeTimer = ({onSaveLogTime, token, dates}) => {
  const [timeState, setTimeState] = useState({
    min: 0,
    sec: 0,
  });
  const [msec, setMsec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isControlDisabled, setIsControlDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const today = dates.find(d =>
    isEqual(moment(d.date).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')),
  );

  useEffect(() => {
    setTimeState({
      min: get(today, 'mins', 0),
      sec: get(today, 'secs', 0),
    });
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (msec !== 99) {
          setMsec(msec + 1);
        } else {
          setMsec(0);
        }
      }, 1);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, msec]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (timeState.sec !== 59) {
          setTimeState({
            ...timeState,
            sec: ++timeState.sec,
          });
        } else {
          setTimeState({
            ...timeState,
            sec: 0,
            min: ++timeState.min,
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeState]);

  useEffect(() => {
    if (isRunning) {
      setStartTime(moment().format('hh:mm a'));
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeState.min === 0 && timeState.sec === 0 && msec === 0) {
      setIsControlDisabled(true);
    } else {
      setIsControlDisabled(false);
    }
  }, [timeState.min, timeState.sec, msec]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeState({
      min: 0,
      sec: 0,
    });
    setMsec(0);
    setIsRunning(false);
    setStartTime(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogTimeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        time={{
          min: padToTwo(timeState.min),
          sec: padToTwo(timeState.sec),
          msec: padToTwo(msec),
        }}
        date={moment().format('YYYY-MM-DD')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.timerContainer}>
          <StatusBar barStyle="light-content" />
          <Header headerTitle="Practice Timer" color="white" />
          <View style={styles.digitsContainer}>
            <Text numberOfLines={1} style={styles.digits}>
              {padToTwo(timeState.min)}
            </Text>
            <Text numberOfLines={1} style={styles.colon}>
              :
            </Text>
            <Text numberOfLines={1} style={styles.digits}>
              {padToTwo(timeState.sec)}
            </Text>
            <Text numberOfLines={1} style={styles.colon}>
              :
            </Text>
            <Text numberOfLines={1} style={styles.digits}>
              {padToTwo(msec)}
            </Text>
          </View>
          {startTime && (
            <Text style={styles.startTime}>{`Started ${startTime}`}</Text>
          )}
          {startTime && timeState.min === 0 && (
            <Text style={styles.startTime}>
              Must be at least 1 minute to log practice.
            </Text>
          )}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              disabled={isControlDisabled}
              style={styles.actionButton}
              onPress={handleReset}>
              <Text
                style={[
                  styles.actionButtonText,
                  {opacity: isControlDisabled ? 0.6 : 1},
                ]}>
                discard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isControlDisabled || isRunning || timeState.min === 0}
              onPress={() => setIsModalVisible(true)}
              style={styles.actionButton}>
              <Text
                style={[
                  styles.actionButtonText,
                  {
                    opacity:
                      isControlDisabled || isRunning || timeState.min === 0
                        ? 0.6
                        : 1,
                  },
                ]}>
                save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleToggle}
              style={styles.toggleButtonContainer}>
              <Image
                source={isRunning ? pauseIcon : playIcon}
                style={styles.toggleButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.entriesContainer}>
          <SectionSpacer height={60} />
          <TimeEntries entries={dates} />
          <SectionSpacer height={60} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  dates: reverse(get(state, 'practice.dates')),
});

const mapDispatchToProps = {
  //
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PracticeTimer);
