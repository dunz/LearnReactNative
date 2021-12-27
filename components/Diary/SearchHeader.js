import React, {useContext} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchContext} from './context/SearchContext';

export const SearchHeader = () => {
  const {width} = useWindowDimensions();
  const {keyword, onChangeKeyword} = useContext(SearchContext);
  return (
    // 양 옆 여백이 16이 기본적으로 들어가있기 때문에 32를 빼준다
    <View style={[styles.block, {width: width - 32}]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChangeText={onChangeKeyword}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeKeyword('')}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});
