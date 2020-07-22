import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// tab bar icons
import HomeIcon from './assets/bottomtab/home.png';
import CoursesIcon from './assets/bottomtab/courses.png';
import PracticeIcon from './assets/bottomtab/practice.png';
import ProfileIcon from './assets/bottomtab/profile.png';
import HomeIconFocused from './assets/bottomtab/homef.png';
import CoursesIconFocused from './assets/bottomtab/coursesf.png';
import PracticeIconFocused from './assets/bottomtab/practicef.png';
import ProfileIconFocused from './assets/bottomtab/profilef.png';

// screens
import HomeScreen from './screens/HomeScreen/HomeScreen';
import CoursesScreen from './screens/CoursesScreen/CoursesScreen';
import CourseContent from './screens/CourseContent/CourseContent';
import PracticeScreen from './screens/PracticeScreen/PracticeScreen';
import PracticeTimer from './screens/PracticeTimer/PracticeTimer';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';

const AppStack = createStackNavigator();
function AppStackScreen({isAuthenticated}) {
  return (
    <AppStack.Navigator headerMode="none">
      {isAuthenticated ? (
        <>
          <AppStack.Screen name="TabNavigator" component={TabNavigator} />
          <AppStack.Screen name="CourseContent" component={CourseContent} />
          <AppStack.Screen name="PracticeTimer" component={PracticeTimer} />
        </>
      ) : (
        <>
          <AppStack.Screen name="LoginScreen" component={LoginScreen} />
          <AppStack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          paddingHorizontal: 30,
          paddingTop: 15,
        },
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? HomeIconFocused : HomeIcon;
          } else if (route.name === 'Courses') {
            iconName = focused ? CoursesIconFocused : CoursesIcon;
          } else if (route.name === 'Practice') {
            iconName = focused ? PracticeIconFocused : PracticeIcon;
          } else if (route.name === 'Profile') {
            iconName = focused ? ProfileIconFocused : ProfileIcon;
          }

          return focused ? (
            <View style={styles.focusedTab}>
              <Image source={iconName} />
            </View>
          ) : (
            <Image source={iconName} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    backgroundColor: 'rgba(227, 36, 56, 0.1)',
    height: 40,
    width: 105,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  //
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppStackScreen);
