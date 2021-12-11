import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

const IDText = () => {
  const route = useRoute();
  return <Text style={styles.text}>id: {route.params.id}</Text>;
};

export const DetailScreen = ({navigation, route}) => {
  console.log('route', route);

  useEffect(() => {
    return () => {
      console.log('detail destructive');
    };
  }, []);

  return (
    <View style={styles.block}>
      <IDText />
      <View style={styles.buttons}>
        <Button
          title="다음"
          onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
        />
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  },
  buttons: {
    flexDirection: 'row',
  },
});
