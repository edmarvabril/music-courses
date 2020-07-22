import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {isEmpty, trim} from 'lodash';

import {palette, shadow} from '../constants/colors';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/bin.png';

const PracticeEntryCard = ({entry, onEditPress, onDeletePress}) => {
  const renderNote = () => {
    if (isEmpty(trim(entry.duration_note))) {
      return '(No practice notes)';
    }
    return entry.duration_note;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLabel}>
          <Text style={styles.date}>{moment(entry.date).format('MMM DD')}</Text>
          <Text style={styles.bar}>|</Text>
          <Text style={styles.duration}>{`${entry.mins} mins`}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={onEditPress}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>{renderNote()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 20,
    minHeight: 120,
    ...shadow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLabel: {
    flexDirection: 'row',
    width: 144,
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    color: palette.steelblue,
  },
  bar: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    color: palette.gray,
  },
  duration: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    color: palette.red,
  },
  editIcon: {
    height: 19,
    width: 19,
  },
  deleteIcon: {
    marginLeft: 10,
    height: 18,
    width: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 16,
    color: palette.gray,
    marginTop: 15,
  },
});

export default PracticeEntryCard;
