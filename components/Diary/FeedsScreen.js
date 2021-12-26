import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LogContext} from './context/LogContext';
import {FloatingWriteButton} from './FloatingWriteButton';
import {FeedList} from './FeedList';

export const FeedsScreen = () => {
  const {logs} = useContext(LogContext);
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    hidden !== isBottom && setHidden(isBottom);
  };
  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
});
