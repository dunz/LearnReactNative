import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeScreen} from './HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchScreen} from './SearchScreen';
import {NotificationScreen} from './NotificationScreen';
import {MessageScreen} from './MessageScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export const MainScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarShowLabel: true,
      swipeEnabled: true,
      lazy: true,
      lazyPreloadDistance: 0,
      lazyPlaceholder: () => (
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text>Loading</Text>
        </View>
      ),
      tabBarPosition: 'top',
      tabBarIndicatorStyle: {
        backgroundColor: 'blue',
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: '홈',
        tabBarIcon: ({color, size}) => (
          <Icon name="home" color={color} size={24} />
        ),
        tabBarLabel: '홈2',
        tabBarColor: 'black',
        tabBarBadge: 'new',
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        title: '검색',
        tabBarIcon: ({color, size}) => (
          <Icon name="search" color={color} size={24} />
        ),
        tabBarColor: 'gray',
      }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        title: '알림',
        tabBarIcon: ({color, size}) => (
          <Icon name="notifications" color={color} size={24} />
        ),
        tabBarColor: 'green',
        tabBarBadge: 30,
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        title: '메시지',
        tabBarIcon: ({color, size}) => (
          <Icon name="message" color={color} size={24} />
        ),
        tabBarColor: 'blue',
        tabBarBadge: true,
      }}
    />
  </Tab.Navigator>
);
