import React, {useContext, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {WriteHeader} from './WriteHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WriteEditor} from './WriteEditor';
import {useNavigation} from '@react-navigation/native';
import {LogContext} from './context/LogContext';

export const WriteScreen = ({route}) => {
  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const navigation = useNavigation();
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const {onCreate, onModified, onRemove} = useContext(LogContext);
  const onSave = () => {
    log
      ? onModified({
          id: log.id,
          date: date.toISOString(),
          title,
          body,
        })
      : onCreate({title, body, date: date.toISOString()});

    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});
