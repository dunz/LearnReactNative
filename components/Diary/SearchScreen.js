import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchContext} from './context/SearchContext';
import {LogContext} from './context/LogContext';
import {FeedList} from './FeedList';
import {EmptySearchResult} from './context/EmptySearchResult';

export const SearchScreen = () => {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(LogContext);

  if (keyword === '') {
    return <EmptySearchResult type="EMPTY_KEYWORD" />;
  }

  const filtered = keyword
    ? logs.filter(log =>
        [log.title, log.body].some(text => text.includes(keyword)),
      )
    : [];

  if (filtered.length < 1) {
    return <EmptySearchResult type="NOT_FOUND" />;
  }

  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
});
