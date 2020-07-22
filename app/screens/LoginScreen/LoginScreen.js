import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Input, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import styles from './LoginScreen.style';
import logo from '../../assets/logowithname.png';
import SectionSpacer from '../../components/SectionSpacer';
import RoundedButton from '../../components/RoundedButton';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import {palette} from '../../constants/colors';
import {logIn} from '../../store/actions';

const LoginScreen = ({onLogIn, isRequesting}) => {
  const navigation = useNavigation();
  const [revealPassword, setRevealPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleEmailChange = text => {
    setCredentials({
      ...credentials,
      username: text,
    });
  };

  const handlePasswordChange = text => {
    setCredentials({
      ...credentials,
      password: text,
    });
  };

  const handleLoginPress = () => {
    onLogIn(credentials);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      {isRequesting && <LoadingScreen />}
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}>
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text style={styles.login}>Log In</Text>
          <Input
            onChangeText={handleEmailChange}
            label="Email Address"
            placeholder="Email Address"
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: palette.gray,
              size: 18,
            }}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SectionSpacer height={20} />
          <Input
            onChangeText={handlePasswordChange}
            label="Password"
            placeholder="Password"
            leftIcon={{type: 'font-awesome', name: 'lock', color: palette.gray}}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
            secureTextEntry={!revealPassword}
            autoCapitalize="none"
            rightIcon={
              revealPassword ? (
                <Icon
                  onPress={() => setRevealPassword(false)}
                  type="font-awesome"
                  name="eye-slash"
                  color={palette.gray}
                  size={20}
                />
              ) : (
                <Icon
                  onPress={() => setRevealPassword(true)}
                  type="font-awesome"
                  name="eye"
                  color={palette.gray}
                  size={20}
                />
              )
            }
          />
          <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
          <SectionSpacer height={40} />
          <RoundedButton
            onPress={handleLoginPress}
            label="log in"
            fontSize={18}
          />
          <SectionSpacer height={20} />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>No account yet?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.signupLink}>Sign up!</Text>
            </TouchableOpacity>
          </View>
          <SectionSpacer height={60} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  isRequesting: state.auth.isRequesting,
});

const mapDispatchToProps = {
  onLogIn: logIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
