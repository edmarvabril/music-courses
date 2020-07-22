import {StyleSheet, Dimensions} from 'react-native';

import {palette, shadow} from '../../constants/colors';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: palette.powderblue,
  },
  logo: {
    width: width - 100,
    height: 100,
    marginBottom: 60,
  },
  inputContainer: {
    width,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...shadow,
    padding: 20,
  },
  inputText: {
    color: palette.midnightblue,
  },
  label: {
    color: palette.midnightblue,
    fontSize: 17,
  },
  login: {
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.midnightblue,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  leftIcon: {
    width: 30,
    marginRight: 7,
    marginLeft: 0,
  },
  forgotPass: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 14,
    color: palette.red,
  },
  bottomTextContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  bottomText: {
    fontSize: 14,
    color: palette.gray,
  },
  signupLink: {
    marginLeft: 5,
    fontSize: 14,
    color: palette.red,
    fontWeight: 'bold',
  },
});

export default styles;
