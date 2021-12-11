import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {DetailScreen} from './screens/DetailScreen';
import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {HeaderLessScreen} from './screens/HeaderLessScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SettingScreen} from './screens/SettingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NotificationScreen} from './screens/NotificationScreen';
import {MessageScreen} from './screens/MessageScreen';
import {SearchScreen} from './screens/SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainScreen} from './screens/MainScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const getHeaderTitle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  const nameMap = {
    Home: '홈3',
    Search: '검색3',
    Notification: '알림3',
    Message: '메시지3',
  };
  return nameMap[routeName];
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*<Stack.Screen*/}
        {/*  name="Home"*/}
        {/*  component={HomeScreen}*/}
        {/*  options={{*/}
        {/*    headerShown: true,*/}
        {/*    title: '홈',*/}
        {/*    headerStyle: {backgroundColor: 'red'},*/}
        {/*    headerTintColor: 'white',*/}
        {/*    headerTitleStyle: {*/}
        {/*      fontWeight: 'bold',*/}
        {/*      fontSize: 20,*/}
        {/*    },*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Stack.Screen*/}
        {/*  name="Detail"*/}
        {/*  component={DetailScreen}*/}
        {/*  options={({route}) => ({*/}
        {/*    title: `상세 정보 - ${route.params.id}`,*/}
        {/*    headerStyle: {backgroundColor: 'red'},*/}
        {/*    headerTintColor: 'white',*/}
        {/*    headerTitleStyle: {*/}
        {/*      fontWeight: 'bold',*/}
        {/*      fontSize: 20,*/}
        {/*    },*/}
        {/*    headerLeft: ({onPress}) => (*/}
        {/*      <TouchableOpacity onPress={onPress}>*/}
        {/*        <Text>Left</Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*    ),*/}
        {/*    headerTitle: ({children}) => (*/}
        {/*      <View>*/}
        {/*        <Text>{children}</Text>*/}
        {/*      </View>*/}
        {/*    ),*/}
        {/*    headerRight: () => (*/}
        {/*      <View>*/}
        {/*        <Text>Right</Text>*/}
        {/*      </View>*/}
        {/*    ),*/}
        {/*    headerBackVisible: false,*/}
        {/*  })}*/}
        {/*/>*/}
        {/*<Stack.Screen*/}
        {/*  name="HeaderLess"*/}
        {/*  component={HeaderLessScreen}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}

        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={({route}) => ({
            headerShown: true,
            title: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>

      {/*<Drawer.Navigator*/}
      {/*  initialRouteName="Home"*/}
      {/*  drawerPosition="left"*/}
      {/*  backBehavior="history"*/}
      {/*  screenOptions={{*/}
      {/*    drawerActiveBackgroundColor: 'orange',*/}
      {/*    drawerActiveTintColor: 'white',*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*  drawerContent={({navigation}) => (*/}
      {/*    <SafeAreaView>*/}
      {/*      <Text>A Custom Drawer</Text>*/}
      {/*      <Button*/}
      {/*        title="Drawer 닫기"*/}
      {/*        onPress={() => navigation.closeDrawer()}*/}
      {/*      />*/}
      {/*    </SafeAreaView>*/}
      {/*  )}>*/}
      {/*  <Drawer.Screen*/}
      {/*    name="Home"*/}
      {/*    component={HomeScreen}*/}
      {/*    options={{*/}
      {/*      title: '홈',*/}
      {/*      headerLeft: () => <Text>Left</Text>,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Drawer.Screen*/}
      {/*    name="Setting"*/}
      {/*    component={SettingScreen}*/}
      {/*    options={{title: '설정'}}*/}
      {/*  />*/}
      {/*</Drawer.Navigator>*/}
    </NavigationContainer>
  );
};

export default App;
