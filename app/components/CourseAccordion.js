import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {map, get} from 'lodash';

import CourseCollapsible from './CourseCollapsible';
import {selectLesson} from '../store/actions';

const CourseAccordion = ({onLessonSelect, selectedModuleId, course}) => {
  const navigation = useNavigation();

  // map object from api into array
  const lessons = map(course.lessons, value => value);

  const [activeId, setActiveId] = useState(selectedModuleId);

  const handlePress = id => {
    setActiveId(id);
  };

  const handleLessonPress = (moduleId, lessonId) => {
    onLessonSelect({moduleId, lessonId});
    navigation.navigate('CourseContent');
  };

  return (
    <View>
      {lessons.map((item, index) => (
        <View key={index.toString()} style={styles.itemContainer}>
          <CourseCollapsible
            onPress={() => handlePress(item.id)}
            moduleContent={item}
            index={index}
            isActive={item.id === activeId}
            onLessonPress={handleLessonPress}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 15,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onLessonSelect: selectLesson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseAccordion);
