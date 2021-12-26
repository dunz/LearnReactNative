import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {FeedListItem} from './FeedListItem';

export const FeedList = ({logs, onScrolledToBottom}) => {
  const onScroll = e => {
    if (!onScrolledToBottom) {
      return;
    }
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distancefromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    onScrolledToBottom(
      contentSize.height > layoutMeasurement.height && distancefromBottom < 72,
    );
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {backgroundColor: '#e0e0e0', height: 1, width: '100%'},
});
