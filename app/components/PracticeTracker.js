/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import moment from 'moment';
import {get, times, isEqual, includes, capitalize, isEmpty} from 'lodash';

import {shadow, palette} from '../constants/colors';
import BarStringsImage from '../assets/stringbar.png';
import CongratsTrophy from '../assets/congrats.png';
import Confetti from '../assets/confetti.png';
import RoundedButton from './RoundedButton';
import SectionSpacer from './SectionSpacer';
import ChangeGoalModal from './ChangeGoalModal';
import LogPracticeModal from './LogPracticeModal';

import {getMonthEntries, getDays} from '../store/actions';

const PracticeTracker = ({
  dates,
  fetchEntries,
  token,
  fetchDays,
  days,
  requesting,
  minuteGoal,
  requestSuccessful,
}) => {
  const navigation = useNavigation();

  const [goal, setGoal] = useState(minuteGoal);
  const [showChangeGoalModal, setShowChangeGoalModal] = useState(false);
  const [showLogPracticeModal, setShowLogPracticeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState({});
  const [currentDateShown, setCurrentDateShown] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [datesWithEntry, setDatesWithEntry] = useState([]);

  const handleDayPress = day => {
    setSelectedEntry(
      dates.find(d =>
        isEqual(moment(d.date).format('YYYY-MM-DD'), day.dateString),
      ),
    );
    setSelectedDate(day.dateString);
    setShowLogPracticeModal(true);
  };

  useEffect(() => {
    fetchEntries({token, date: currentDateShown});
  }, [currentDateShown, requesting]);

  useEffect(() => {
    fetchDays({token});
    // if (isEmpty(days)) {
    //   setShowChangeGoalModal(true);
    // }
  }, []);

  useEffect(() => {
    if (!requesting && requestSuccessful) {
      fetchDays({token});
    }
  }, [requesting, requestSuccessful]);

  useEffect(() => {
    setGoal(minuteGoal);
  }, [minuteGoal]);

  useEffect(() => {
    setDatesWithEntry(dates.map(d => moment(d.date).format('YYYY-MM-DD')));
  }, [dates]);

  const handleMonthChange = month => {
    setCurrentDateShown(month.dateString);
  };

  // {
  //   '2020-04-20': {
  //     selected: true,
  //     startingDay: true,
  //     endingDay: false,
  //     color: palette.steelblue,
  //   }
  // }

  const accomplished = {};
  datesWithEntry.forEach(d => {
    Object.assign(accomplished, {
      [moment(d).format('YYYY-MM-DD')]: {
        selected: true,
        startingDay: true,
        endingDay: true,
        color: palette.steelblue,
      },
    });
  });

  const daysInMonth = [];
  const monthDate = moment(currentDateShown).startOf('month');

  times(monthDate.daysInMonth(), function() {
    if (
      !isEqual(
        monthDate.format('YYYY-MM-DD'),
        moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
      )
    ) {
      daysInMonth.push(moment(monthDate));
      monthDate.add(1, 'days');
    }
  });

  const missedDays = {};
  daysInMonth.forEach(d => {
    if (currentDateShown <= moment().format('YYYY-DD-MM')) {
      if (includes(days, moment(d).format('ddd'))) {
        Object.assign(missedDays, {
          [moment(d).format('YYYY-MM-DD')]: {
            selected: true,
            startingDay: true,
            endingDay: true,
            color: palette.red,
          },
        });
      }
    }
  });

  const allMarked = {
    ...missedDays,
    ...accomplished,
  };

  const today = dates.find(d =>
    isEqual(moment(d.date).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')),
  );

  const progress = get(today, 'mins', 0) / goal;
  const remaining = minuteGoal - get(today, 'mins', 0);
  return (
    <View>
      <ChangeGoalModal
        minuteGoal={minuteGoal}
        visible={showChangeGoalModal}
        onClose={() => setShowChangeGoalModal(false)}
      />
      <LogPracticeModal
        entry={selectedEntry}
        selectedDate={selectedDate}
        visible={showLogPracticeModal}
        onClose={() => setShowLogPracticeModal(false)}
      />
      <View style={styles.container}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.headingText}>Daily Practice Goal:</Text>
            <Text style={styles.time}>{`${goal} mins`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowChangeGoalModal(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.trackerContainer}>
          {remaining <= 0 ? (
            <ImageBackground
              resizeMode="contain"
              source={Confetti}
              style={styles.confetti}>
              <Image
                resizeMode="contain"
                source={CongratsTrophy}
                style={{
                  height: 160,
                  width: 160,
                }}
              />
            </ImageBackground>
          ) : (
            <ImageBackground source={BarStringsImage} style={styles.bars}>
              <Progress.Circle
                progress={progress}
                size={160}
                unfilledColor={palette.fadedblue}
                borderWidth={0}
                color={palette.red}
                // fill="white"
                thickness={10}
                textStyle={{
                  fontSize: 9,
                  fontWeight: '600',
                }}
              />
              {remaining <= 0 || (
                <View style={styles.timerContainer}>
                  <Text style={styles.timer}>{`${get(today, 'mins') ||
                    0}/${minuteGoal}`}</Text>
                  <Text style={styles.minsText}>
                    {get(today, 'mins') == 1 ? 'min' : 'mins'}
                  </Text>
                </View>
              )}
            </ImageBackground>
          )}
        </View>
        <View style={styles.btnTextContainer}>
          {remaining <= 0 ? (
            <>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.goalReached}>
                {`You have reached your daily\npractice goal of ${minuteGoal} ${
                  minuteGoal == 1 ? 'minute' : 'minutes'
                }.`}
              </Text>
            </>
          ) : (
            <Text style={styles.goalReminderText}>
              {`Only ${remaining} ${
                remaining == 1 ? 'min' : 'mins'
              } to hit today's\npractice goal. You can do it!`}
            </Text>
          )}
          <RoundedButton
            fontSize={14}
            label="practice now"
            onPress={() => navigation.navigate('PracticeTimer')}
          />
        </View>
      </View>
      <SectionSpacer height={30} />
      <Calendar
        current={currentDateShown}
        maxDate={moment().format('YYYY-MM-DD')}
        onDayPress={handleDayPress}
        markingType={'period'}
        markedDates={allMarked}
        monthFormat={'MMMM yyyy'}
        hideExtraDays
        theme={{
          textDisabledColor: palette.lightgray,
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: palette.steelblue,
          todayTextColor: palette.steelblue,
          dayTextColor: palette.midnightblue,
          arrowColor: palette.midnightblue,
          disabledArrowColor: palette.gray,
          monthTextColor: palette.midnightblue,
          textMonthFontWeight: 'bold',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontWeight: 'bold',
          'stylesheet.calendar.header': {
            dayHeader: {
              textTransform: 'uppercase',
              fontSize: 13,
              fontWeight: '600',
              marginTop: 2,
              marginBottom: 7,
              color: palette.midnightblue,
            },
          },
        }}
        onMonthChange={handleMonthChange}
      />
      <SectionSpacer height={60} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    ...shadow,
    // height: 440,
    borderRadius: 15,
    alignItems: 'center',
  },
  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  headingText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: palette.midnightblue,
  },
  time: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: palette.red,
  },
  button: {
    borderWidth: 2,
    borderColor: palette.red,
    borderRadius: 100,
    height: 32,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: palette.red,
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  trackerContainer: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
  },
  bars: {
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confetti: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  timerContainer: {
    height: 122,
    width: 122,
    borderRadius: 122 / 2,
    backgroundColor: palette.powderblue,
    position: 'absolute',
    justifyContent: 'center',
  },
  timer: {
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 41,
    textAlign: 'center',
    letterSpacing: 0.5,
    color: palette.gray,
  },
  minsText: {
    color: palette.gray,
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
  },
  btnTextContainer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  congrats: {
    textAlign: 'center',
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '600',
    color: palette.red,
    marginTop: 30,
  },
  goalReminderText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: palette.midnightblue,
    marginVertical: 30,
  },
  goalReached: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: palette.midnightblue,
    marginBottom: 30,
  },
});

const mapStateToProps = state => ({
  dates: get(state, 'practice.dates', []),
  days: get(state, 'practice.days').map(d => capitalize(d.day)),
  minuteGoal: get(state, 'practice.days[0].minutes', 15),
  token: state.auth.accessToken,
  requesting: state.practice.requesting,
  requestSuccessful: state.practice.requestSuccessful,
});

const mapDispatchToProps = {
  fetchEntries: getMonthEntries,
  fetchDays: getDays,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PracticeTracker);
