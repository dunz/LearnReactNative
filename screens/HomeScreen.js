import React, {useCallback, useEffect} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const OpenDetailButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Detail 1 열기"
      onPress={() => navigation.push('Detail', {id: 1})}
    />
  );
};

export const HomeScreen = ({navigation}) => {
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: '홈 by setOptions',
  //   });
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      console.log('home focus');
      return () => {
        console.log('home unfocus ');
      };
    }, []),
  );

  return (
    <SafeAreaView>
      <View>
        <OpenDetailButton />
        <Button
          title="Detail 2 열기"
          onPress={() => navigation.push('Detail', {id: 2})}
        />
        <Button
          title="Detail 3 열기"
          onPress={() => navigation.push('Detail', {id: 3})}
        />
        <Button
          title="HeaderLess 열기"
          onPress={() => navigation.push('HeaderLess')}
        />

        {/*<Text>Home</Text>*/}
        {/*<Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />*/}
        {/*<Button*/}
        {/*  title="Setting 열기"*/}
        {/*  onPress={() => navigation.navigate('Setting')}*/}
        {/*/>*/}
      </View>
    </SafeAreaView>
  );
};
