import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const OrdersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>OrdersScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default OrdersScreen;
