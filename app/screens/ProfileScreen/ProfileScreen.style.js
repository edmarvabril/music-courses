import {StyleSheet} from 'react-native';

import {palette, shadow} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.powderblue,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  userInfo: {
    alignSelf: 'center',
    marginBottom: 60,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.midnightblue,
    textAlign: 'center',
  },
  level: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: palette.gray,
    textTransform: 'uppercase',
  },
  menu: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    ...shadow,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  menuleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    height: 50,
    width: 50,
  },
  menuLabel: {
    marginLeft: 33,
    color: palette.gray,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
