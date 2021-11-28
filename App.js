import React, {useState} from 'react';
import {Button, SafeAreaView} from 'react-native';
import Greeting from './components/Greeting';
import Box from './components/Box';

const App = () => {
  const [visible, setVisible] = useState(true);

  const onPress = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <Button title="토글" onPress={onPress} />
      {visible && <Box rounded size="large" color="blue" />}
      <Greeting
        name={'하하하'} // ㅁㄴㅇㄹ
      />
    </SafeAreaView>
  );
};

export default App;
