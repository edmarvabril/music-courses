/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

import SectionSpacer from './SectionSpacer';
import PracticeEntryCard from './PracticeEntryCard';
import UpdateEntryModal from './UpdateEntryModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {palette} from '../constants/colors';

import {getMonthEntries} from '../store/actions';

const monthSelection = [
  {label: 'January', value: '01'},
  {label: 'February', value: '02'},
  {label: 'March', value: '03'},
  {label: 'April', value: '04'},
  {label: 'May', value: '05'},
  {label: 'June', value: '06'},
  {label: 'July', value: '07'},
  {label: 'August', value: '08'},
  {label: 'September', value: '09'},
  {label: 'October', value: '10'},
  {label: 'November', value: '11'},
  {label: 'December', value: '12'},
];

const PracticeEntries = ({
  entries,
  token,
  fetchEntries,
  isFetching,
  requestSuccessful,
  requesting,
  deleteEntry,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MM'));
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({});

  const filteredSelection = monthSelection.filter(
    m => m.value <= moment().format('MM'),
  );

  useEffect(() => {
    // fetch entries when month changed from dropdown
    fetchEntries({
      token,
      date: `${moment().format('YYYY')}-${selectedMonth}-01`,
    });
  }, [selectedMonth]);

  useEffect(() => {
    // fetch entries when an entry is successfully updated
    if (!requesting && requestSuccessful) {
      fetchEntries({
        token,
        date: `${moment().format('YYYY')}-${selectedMonth}-01`,
      });
    }
  }, [requesting, requestSuccessful]);

  const renderEntries = () => {
    if (isFetching) {
      return <ActivityIndicator size="large" style={styles.spinner} />;
    }

    if (isEmpty(entries)) {
      return <Text style={styles.emptyStateText}>No Entries</Text>;
    }

    return entries.map((item, i) => (
      <View key={i.toString()} style={styles.cardContainer}>
        <PracticeEntryCard
          entry={item}
          onEditPress={() => handleEditPress(item)}
          onDeletePress={() => handleDeletePress(item)}
        />
      </View>
    ));
  };

  const handleEditPress = entry => {
    setShowUpdateModal(true);
    setSelectedEntry(entry);
  };

  const handleDeletePress = entry => {
    setShowDeleteModal(true);
    setSelectedEntry(entry);
  };

  return (
    <View>
      <UpdateEntryModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        entry={selectedEntry}
      />
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        entry={selectedEntry}
      />
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Your Practice Entries</Text>
        <RNPickerSelect
          value={selectedMonth}
          onValueChange={value => setSelectedMonth(value)}
          items={filteredSelection}
          Icon={() => (
            <Ionicon name="ios-arrow-down" size={16} color={palette.gray} />
          )}
          style={{
            inputIOS: {
              fontSize: 14,
              fontWeight: '600',
              color: palette.gray,
              paddingRight: 20, // to ensure the text is never behind the icon
            },
          }}
        />
      </View>
      <SectionSpacer height={30} />
      {renderEntries()}
      <SectionSpacer height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: palette.midnightblue,
  },
  cardContainer: {
    marginBottom: 15,
  },
  spinner: {
    marginTop: 20,
  },
  emptyStateText: {
    marginTop: 20,
    fontSize: 17,
    color: palette.gray,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  token: state.auth.accessToken,
  isFetching: state.practice.isFetching,
  requestSuccessful: state.practice.requestSuccessful,
  requesting: state.practice.requesting,
});

const mapDispatchToProps = {
  fetchEntries: getMonthEntries,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PracticeEntries);
