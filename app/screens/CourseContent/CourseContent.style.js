import {StyleSheet, Dimensions} from 'react-native';

import {palette} from '../../constants/colors';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  modules: {
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: palette.powderblue,
    paddingTop: 30,
    // marginTop: 250,
    // zIndex: -3,
  },
  video: {
    height: 280,
    backgroundColor: 'black',
    // position: 'absolute',
    // top: 40,
    // left: 0,
    // right: 0,
    // zIndex: -2,
  },
  moduleTitle: {
    fontSize: 14,
    lineHeight: 19,
    textTransform: 'capitalize',
    color: palette.red,
  },
  lessonTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
  },
  lessonSubtitle: {
    fontSize: 14,
    lineHeight: 19,
    color: palette.gray,
    marginTop: 20,
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    color: palette.midnightblue,
    marginVertical: 30,
  },
});

export default styles;
