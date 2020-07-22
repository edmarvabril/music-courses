/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';

import styles from './CoursesScreen.style';
import ButtonGroup from '../../components/ButtonGroup';
import SectionSpacer from '../../components/SectionSpacer';
import CourseSelection from '../../components/CourseSelection';
import StudyingCourses from '../../components/StudyingCourses';
import EmptyCourseState from '../../components/EmptyCourseState';
import CompletedCourses from '../../components/CompletedCourses';

import {getAllCourses, getInProgress, getCompleted} from '../../store/actions';

const CoursesScreen = ({
  fetchAllCourses,
  token,
  allCourses,
  fetchInProgress,
  fetchCompleted,
  inProgress,
  completed,
}) => {
  const [buttonIndex, setButtonIndex] = useState(0);

  useEffect(() => {
    fetchAllCourses({token});
    fetchInProgress({token});
    fetchCompleted({token});
  }, []);

  const renderContent = () => {
    switch (buttonIndex) {
      case 0:
        return <CourseSelection courses={allCourses} />;
      case 1:
        return isEmpty(inProgress) ? (
          <EmptyCourseState onPlusPress={() => setButtonIndex(0)} />
        ) : (
          <StudyingCourses courses={inProgress} />
        );
      case 2:
        return isEmpty(completed) ? (
          <EmptyCourseState onPlusPress={() => setButtonIndex(0)} />
        ) : (
          <CompletedCourses courses={completed} />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionSpacer height={20} />
        <ButtonGroup
          buttons={['all', 'studying', 'completed']}
          onPress={i => setButtonIndex(i)}
          buttonIndex={buttonIndex}
        />
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  allCourses: state.course.allCourses,
  inProgress: state.course.inProgress,
  completed: state.course.completed,
  token: state.auth.accessToken,
});

const mapDispatchToProps = {
  fetchAllCourses: getAllCourses,
  fetchInProgress: getInProgress,
  fetchCompleted: getCompleted,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursesScreen);
