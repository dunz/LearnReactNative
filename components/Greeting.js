import React from 'react';
import {Text, View} from 'react-native';

const Greeting = ({name}) => {
  return (
    <View>
      <Text>안녕하세요 {name}</Text>
    </View>
  );
};

Greeting.defaultProps = {
  name: 'greeting',
};

export default Greeting;
