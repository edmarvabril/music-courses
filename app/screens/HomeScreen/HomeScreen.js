/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {isEmpty, get} from 'lodash';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './HomeScreen.style';
import StepsCarousel from '../../components/StepsCarousel';
import WelcomeHeader from '../../components/WelcomeHeader';
import CourseThumbSection from '../../components/CourseThumbSection';
import SectionSpacer from '../../components/SectionSpacer';
import StayTunedModal from '../../components/StayTunedModal';

import {getHome} from '../../store/actions';
import {palette} from '../../constants/colors';

const HomeScreen = ({
  recommended,
  fetchHome,
  userInfo,
  isFetching,
  token,
  continueLearning,
}) => {
  const steps = [
    {
      title: 'Set Practice Goal',
      desc: 'Set your daily practice goal',
      image: require('../../assets/goals/goal1.png'),
      checked: true,
    },
    {
      title: 'Start A Course',
      desc: 'Start your first course',
      image: require('../../assets/goals/goal2.png'),
      checked: false,
    },
    {
      title: 'Upload To Guitar Gallery',
      desc: 'Upload a photo of your guitar',
      image: require('../../assets/goals/goal3.png'),
      checked: false,
    },
  ];

  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHome({token});
  }, []);

  const handleStepPress = stepIndex => {
    switch (stepIndex) {
      case 0:
        navigation.navigate('Practice');
        break;
      case 1:
        navigation.navigate('Courses');
        break;
      case 2:
        setShowModal(true);
        break;
      default:
        return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StayTunedModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        text="The Gallery Feature Is Coming Soon"
        icon={<Ionicon name="ios-images" size={80} color={palette.steelblue} />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionSpacer height={20} />
        <WelcomeHeader
          name={get(userInfo, 'user_display_name', '')}
          avatar={get(userInfo, 'avatar')}
        />
        <SectionSpacer height={30} />
        <StepsCarousel steps={steps} onStepPress={handleStepPress} />
        <SectionSpacer height={30} />
        <CourseThumbSection
          title="Continue Learning"
          courses={continueLearning}
        />
        <SectionSpacer height={30} />
        <CourseThumbSection title="Recommended Courses" courses={recommended} />
        <SectionSpacer height={40} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  recommended: state.course.recommended,
  continueLearning: state.course.continueLearning,
  isFetching: state.course.isFetching,
  userInfo: state.auth.userInfo,
  token: state.auth.accessToken,
});

const mapDispatchToProps = {
  fetchHome: getHome,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
