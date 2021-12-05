import React, {useEffect, useState} from 'react';
import {DateHead} from './components/Todo/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AddTodo} from './components/Todo/AddTodo';
import {Empty} from './components/Todo/Empty';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {TodoList} from './components/Todo/TodoList';
import todosStorage from './storages/todosStorage';

const App = () => {
  const today = new Date();
  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들어보기', done: false},
  ]);

  const onInsert = text => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    setTodos(
      todos.concat({
        id: nextId,
        text,
        done: false,
      }),
    );
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
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
