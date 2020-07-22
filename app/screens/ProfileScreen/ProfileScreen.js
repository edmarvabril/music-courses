import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {capitalize, get} from 'lodash';

import styles from './ProfileScreen.style';
import Avatar from '../../components/Avatar';
import trophy from '../../assets/profile/trophy.png';
import gift from '../../assets/profile/gift.png';
import profile from '../../assets/profile/profile.png';
import logout from '../../assets/profile/logout.png';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import {palette} from '../../constants/colors';
import {logOut} from '../../store/actions';

const {width} = Dimensions.get('window');

// const sampleUser = {
//   avatar: require('../../assets/john.png'),
//   firstName: 'John',
//   lastName: 'Doe',
//   level: 1,
// };

const ProfileScreen = ({onLogOut, userInfo}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // to simulate a short loader before logging out for UX purposes
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      onLogOut();
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggingOut && <LoadingScreen />}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}>
        <View style={styles.userInfo}>
          <Avatar source={get(userInfo, 'avatar')} size={width / 2.5} />
          <Text style={styles.name}>
            {capitalize(get(userInfo, 'user_display_name'))}
          </Text>
          {/* <Text style={styles.level}>{`level 1`}</Text> */}
        </View>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuleft}>
              <Image source={trophy} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>My Achievements</Text>
            </View>
            <Ionicon name="ios-arrow-forward" size={20} color={palette.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuleft}>
              <Image source={gift} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>My Giveaway</Text>
            </View>
            <Ionicon name="ios-arrow-forward" size={20} color={palette.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuleft}>
              <Image source={profile} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>My Account</Text>
            </View>
            <Ionicon name="ios-arrow-forward" size={20} color={palette.gray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <View style={styles.menuleft}>
              <Image source={logout} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = {
  onLogOut: logOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
