import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const EditProductScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>EditProductScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default EditProductScreen;
