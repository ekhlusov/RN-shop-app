import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProductDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>ProductDetailScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default ProductDetailScreen;
