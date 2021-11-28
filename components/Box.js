import React from 'react';
import {StyleSheet, View} from 'react-native';

const Box = ({rounded, size = 'medium', color = 'red'}) => (
  <View
    style={[
      styles.box,
      rounded && styles.rounded,
      sizes[size],
      {backgroundColor: color},
    ]}
  />
);

const styles = StyleSheet.create({
  box: {},
  rounded: {
    borderRadius: 16,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 64,
    height: 64,
  },
  large: {
    width: 128,
    height: 128,
  },
});

const sizes = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export default Box;
