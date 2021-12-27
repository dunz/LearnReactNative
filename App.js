import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './components/Diary/RootStack';
import {LogContextProvider} from './components/Diary/context/LogContext';
import {SearchContextProvider} from './components/Diary/context/SearchContext';

const App = () => {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
};

export default App;
