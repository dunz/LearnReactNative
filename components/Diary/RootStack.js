import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab} from './MainTab';
import {WriteScreen} from './WriteScreen';

const Stack = createNativeStackNavigator();

export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'Main'}
      component={MainTab}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={'Write'}
      component={WriteScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
