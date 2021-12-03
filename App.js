import React from 'react';
import {DateHead} from './components/Todo/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AddTodo} from './components/Todo/AddTodo';
import {Empty} from './components/Todo/Empty';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

const App = () => {
  const today = new Date();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          <Empty />
          <AddTodo />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
