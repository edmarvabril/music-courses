import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';

import {connect} from 'react-redux';

import styles from './PracticeScreen.style';
import ButtonGroup from '../../components/ButtonGroup';
import SectionSpacer from '../../components/SectionSpacer';
import PracticeTracker from '../../components/PracticeTracker';
import PracticeStats from '../../components/PracticeStats';

const PracticeScreen = ({dates, fetchMonthEntries}) => {
  const [buttonIndex, setButtonIndex] = useState(0);

  const renderContent = () => {
    if (buttonIndex === 0) {
      return <PracticeTracker entries={dates} />;
    } else {
      return <PracticeStats />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionSpacer height={20} />
        <ButtonGroup
          buttons={['tracker', 'stats']}
          onPress={i => setButtonIndex(i)}
          buttonIndex={buttonIndex}
        />
        <SectionSpacer height={30} />
        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  //
});

const mapDispatchToProps = {
  //
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PracticeScreen);
