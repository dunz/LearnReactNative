import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TodoItem} from './TodoItem';

export const TodoList = ({todos, onToggle, onRemove}) => {
  return (
    <FlatList
      style={styles.list}
      data={todos}
      renderItem={({item: {id, text, done}}) => (
        <TodoItem
          id={id}
          text={text}
          done={done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});
