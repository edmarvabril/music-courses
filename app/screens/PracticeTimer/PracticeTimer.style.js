import {StyleSheet, Dimensions} from 'react-native';

import {palette} from '../../constants/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // backgroundColor: palette.powderblue,
    backgroundColor: palette.midnightblue,

    flex: 1,
  },
  timerContainer: {
    height: 320,
    zIndex: 2,
  },
  digitsContainer: {
    alignItems: 'center',
    marginTop: 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  digits: {
    fontSize: 48,
    lineHeight: 65,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    width: 85,
  },
  colon: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  startTime: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: palette.fadedblue,
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  actionButtonText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  toggleButtonContainer: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 106,
    width: 106,
    borderRadius: 106 / 2,
    borderWidth: 20,
    borderColor: palette.powderblue,
    backgroundColor: palette.powderblue,
    position: 'absolute',
    left: width / 2.75,
    right: width / 2.75,
    bottom: -106 / 2,
  },
  entriesContainer: {
    backgroundColor: palette.powderblue,
    paddingHorizontal: 30,
    flex: 1,
  },
});

export default styles;
