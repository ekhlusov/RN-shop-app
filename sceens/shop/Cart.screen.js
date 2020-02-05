import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const CartScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>CartScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default CartScreen;
