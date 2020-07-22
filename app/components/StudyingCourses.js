/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {get, map} from 'lodash';
import {connect} from 'react-redux';

import CourseSelectionCarousel from './CourseSelectionCarousel';
import SectionSpacer from './SectionSpacer';
import CourseAccordion from './CourseAccordion';
import CourseSelectionTitle from './CourseSelectionTitle';
import LockedCourseState from './LockedCourseState';

import {getCourseDetails, selectCourse} from '../store/actions';

const StudyingCourses = ({
  courses,
  selectedModuleId,
  fetchCourseDetails,
  token,
  courseInfo,
  onSelectCourse,
  isFetching,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const selectedCourse = courses.find(item => item.id === selectedCourseId);
  // const isCourseLocked = selectedCourse.isLocked;

  const handleSelectionChange = id => {
    setSelectedCourseId(id);
    onSelectCourse(selectedCourse);
  };

  useEffect(() => {
    setSelectedCourseId(get(courses, '[0].id'));
  }, []);

  useEffect(() => {
    fetchCourseDetails({token, id: selectedCourseId});
  }, [selectedCourseId]);

  const lessons = map(courseInfo.lessons, value => value); // convert object to array
  const moduleCount = lessons.length;
  const completedModuleCount = lessons.filter(l => l.completed).length;

  return (
    <View>
      <CourseSelectionCarousel
        courses={courses}
        onSelectionChange={handleSelectionChange}
      />
      <SectionSpacer height={30} />
      <View style={styles.courseContent}>
        <CourseSelectionTitle
          title={get(selectedCourse, 'title')}
          moduleCount={moduleCount}
          completedModuleCount={completedModuleCount}
          // isLocked={isCourseLocked}
        />
        {/* {isCourseLocked ? (
          <LockedCourseState />
        ) : ( */}
        {isFetching ? (
          <ActivityIndicator size="large" style={{marginTop: 20}} />
        ) : (
          <CourseAccordion
            selectedModuleId={selectedModuleId}
            course={courseInfo}
          />
        )}
        {/* )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseContent: {
    marginHorizontal: 30,
  },
});

const mapStateToProps = state => ({
  selectedModuleId: get(state, 'lesson.moduleContent.id'),
  token: state.auth.accessToken,
  courseInfo: state.course.courseInfo,
  isFetching: state.course.isFetching,
});

const mapDispatchToProps = {
  fetchCourseDetails: getCourseDetails,
  onSelectCourse: selectCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudyingCourses);
