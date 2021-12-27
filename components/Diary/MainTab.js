import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FeedsScreen} from './FeedsScreen';
import {CalendarScreen} from './CalendarScreen';
import {SearchScreen} from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchHeader} from './SearchHeader';

const Tab = createBottomTabNavigator();

export const MainTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'red',
    }}>
    <Tab.Screen
      name={'Feeds'}
      component={FeedsScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon size={size} color={color} name={'view-stream'} />
        ),
      }}
    />
    <Tab.Screen
      name={'Calendar'}
      component={CalendarScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon size={size} color={color} name={'event'} />
        ),
      }}
    />
    <Tab.Screen
      name={'Search'}
      component={SearchScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon size={size} color={color} name={'search'} />
        ),
        headerTitle: () => <SearchHeader />,
      }}
    />
  </Tab.Navigator>
);
