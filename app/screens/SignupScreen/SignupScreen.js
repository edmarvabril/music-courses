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
import {Input, CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import styles from './SignupScreen.style';
import logo from '../../assets/logowithname.png';
import SectionSpacer from '../../components/SectionSpacer';
import RoundedButton from '../../components/RoundedButton';
import {palette} from '../../constants/colors';

const SignupScreen = ({}) => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView contentContainerStyle={styles.container}>
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text style={styles.login}>Sign Up</Text>
          <Input
            label="First Name"
            placeholder="First Name"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: palette.gray,
              size: 22,
            }}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
          />
          <SectionSpacer height={20} />
          <Input
            label="Last Name"
            placeholder="Last Name"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: palette.gray,
              size: 22,
            }}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
          />
          <SectionSpacer height={20} />
          <Input
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
          />
          <SectionSpacer height={20} />
          <Input
            label="Password"
            placeholder="Password"
            leftIcon={{type: 'font-awesome', name: 'lock', color: palette.gray}}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
          />
          <SectionSpacer height={20} />
          <Input
            label="Confirm Password"
            placeholder="Re-type Password"
            leftIcon={{type: 'font-awesome', name: 'lock', color: palette.gray}}
            leftIconContainerStyle={styles.leftIcon}
            inputStyle={styles.inputText}
            labelStyle={styles.label}
          />
          <SectionSpacer height={10} />
          <View style={styles.terms}>
            <CheckBox
              onPress={() => setIsChecked(!isChecked)}
              checked={isChecked}
              containerStyle={{
                padding: 0,
              }}
              checkedColor={palette.steelblue}
            />
            <Text style={styles.termsText}>I agree to the </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Terms and Conditions.</Text>
            </TouchableOpacity>
          </View>
          <RoundedButton label="sign up" fontSize={18} />
          <SectionSpacer height={20} />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.signupLink}>Log in!</Text>
            </TouchableOpacity>
          </View>
          <SectionSpacer height={60} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen);
