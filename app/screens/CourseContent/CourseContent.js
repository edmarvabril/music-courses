/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {get, map} from 'lodash';
import Video from 'react-native-video';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './CourseContent.style';
import CourseAccordion from '../../components/CourseAccordion';
import CourseSelectionTitle from '../../components/CourseSelectionTitle';
import Header from '../../components/Header';
import RoundedButton from '../../components/RoundedButton';

import {palette} from '../../constants/colors';
import {markAsComplete, getCourseDetails} from '../../store/actions';

const CourseContent = ({
  moduleId,
  selectedLessonId,
  courseInfo,
  onMarkAsComplete,
  token,
  fetchCourseDetails,
  requesting,
  selectedCourse,
  isFetching,
}) => {
  const [showControls, setShowControls] = useState(true);
  // const [selectedLesson, setSelectedLesson] = useState({})

  // map object from api into array
  const modules = map(courseInfo.lessons, value => value);

  const selectedModule = modules.find(m => m.id === moduleId);
  const selectedLesson = selectedModule.topics.find(
    t => t.id === selectedLessonId,
  );
  const isCompleted = get(selectedLesson, 'completed');

  useEffect(
    function() {
      setShowControls(false);
      setTimeout(function() {
        setShowControls(true);
      }, 100);
    },
    [selectedLesson.video_url],
  );

  useEffect(() => {
    if (!requesting) {
      fetchCourseDetails({token, id: get(courseInfo, 'id')});
    }
  }, [requesting]);

  const handleButtonPress = () => {
    onMarkAsComplete({
      token,
      lessonId: get(selectedLesson, 'id'),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header headerTitle={get(courseInfo, 'title')} color="white" />
      <Video
        source={{uri: get(selectedLesson, 'video_url')}}
        resizeMode="cover"
        controls={showControls}
        // ref={ref => {
        // onBuffer={onBuffer} // Callback when remote video is buffering
        // onError={videoError} // Callback when video cannot be loaded
        style={styles.video}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.modules}>
          <View>
            <Text style={styles.moduleTitle}>
              {get(selectedModule, 'title')}
            </Text>
            <Text style={styles.lessonTitle}>
              {get(selectedLesson, 'title')}
            </Text>
            <Text style={styles.lessonSubtitle}>
              {get(selectedLesson, 'subtitle')}
            </Text>
          </View>
          <RoundedButton
            loading={isFetching || requesting}
            onPress={handleButtonPress}
            fontSize={14}
            label={isCompleted ? 'marked as completed' : 'mark as complete'}
            buttonColor={isCompleted && palette.steelblue}
            iconComponent={
              isCompleted && (
                <Ionicon
                  name="ios-checkmark-circle-outline"
                  color="white"
                  size={22}
                />
              )
            }
          />
          <Text style={styles.sectionLabel}>Course Content</Text>
          <CourseSelectionTitle title={get(courseInfo, 'title')} />
          <CourseAccordion selectedModuleId={moduleId} course={courseInfo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  moduleId: state.lesson.moduleId,
  selectedLessonId: state.lesson.selectedLessonId,
  courseInfo: state.course.courseInfo,
  token: state.auth.accessToken,
  requesting: state.lesson.requesting,
  selectedCourse: state.course.selectedCourse,
  isFetching: state.course.isFetching,
});

const mapDispatchToProps = {
  onMarkAsComplete: markAsComplete,
  fetchCourseDetails: getCourseDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseContent);
