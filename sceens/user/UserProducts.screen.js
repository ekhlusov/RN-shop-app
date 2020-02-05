import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const UserProductsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>UserProductsScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default UserProductsScreen;
