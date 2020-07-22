import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

import course from './course';
import lesson from './lesson';
import auth from './auth';
import practice from './practice';

const authPersistConfig = {key: 'auth', storage: AsyncStorage};
const coursePersistConfig = {key: 'course', storage: AsyncStorage};
const lessonPersistConfig = {key: 'lesson', storage: AsyncStorage};
const practicePersistConfig = {key: 'practice', storage: AsyncStorage};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  // course: persistReducer(coursePersistConfig, course),
  // lesson: persistReducer(lessonPersistConfig, lesson),
  course,
  lesson,
  practice,
});

export default rootReducer;
