import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './components/Diary/RootStack';
import {LogContextProvider} from './components/Diary/context/LogContext';

const App = () => {
  return (
    <NavigationContainer>
      <LogContextProvider>
        <RootStack />
      </LogContextProvider>
    </NavigationContainer>
  );
};

export default App;
