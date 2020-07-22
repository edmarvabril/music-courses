/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import moment from 'moment';
import {isEmpty, trim} from 'lodash';

import RoundedButton from './RoundedButton';
import {palette} from '../constants/colors';

import {deleteLogTime} from '../store/actions';

const {height, width} = Dimensions.get('window');

const DeleteConfirmationModal = ({
  visible,
  onClose,
  token,
  requesting,
  requestSuccessful,
  entry,
  deleteEntry,
}) => {
  const handleDeletePress = () => {
    deleteEntry({
      token,
      data: {
        id: entry.id,
      },
    });
  };

  useEffect(() => {
    if (!requesting && requestSuccessful) {
      onClose();
    }
  }, [requesting, requestSuccessful]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <SafeAreaView style={styles.subContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicon name="ios-close" size={28} color={palette.gray} />
          </TouchableOpacity>
          <View style={styles.parent}>
            <Text style={styles.label}>Delete Entry</Text>
            <Text style={styles.desc}>
              {moment(entry.date).format('MMMM DD, YYYY')}
            </Text>
            <Text style={styles.desc}>{`${entry.mins} mins`}</Text>
            <Text style={styles.desc}>
              {isEmpty(trim(entry.duration_note))
                ? '(No practice notes)'
                : `"${entry.duration_note}"`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <RoundedButton
              loading={requesting}
              onPress={handleDeletePress}
              label="delete"
              fontSize={16}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: palette.translucentBlue,
    justifyContent: 'flex-end',
  },
  subContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  parent: {
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    fontWeight: '600',
    color: palette.midnightblue,
    marginVertical: 20,
  },
  desc: {
    fontSize: 17,
    lineHeight: 22,
    color: palette.gray,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginVertical: 40,
  },
});

const mapStateToProps = state => ({
  token: state.auth.accessToken,
  requesting: state.practice.requesting,
  requestSuccessful: state.practice.requestSuccessful,
});

const mapDispatchToProps = {
  deleteEntry: deleteLogTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteConfirmationModal);
