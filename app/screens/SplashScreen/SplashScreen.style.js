import {StyleSheet, Dimensions} from 'react-native';

import {palette} from '../../constants/colors';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.midnightblue,
    position: 'absolute',
    zIndex: 100,
  },
  logo: {
    height: 140,
    marginBottom: 60,
    position: 'absolute',
  },
});

export default styles;
