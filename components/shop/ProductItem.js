import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableNativeFeedback
} from 'react-native';
import theme from '../../constants/theme';

const ProductItem = props => {
  return (
    <TouchableNativeFeedback onPress={props.onViewDetail}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>
          <Button
            color={theme.colors.primary}
            title="View Details"
            onPress={props.onViewDetail}
          />
          <Button
            color={theme.colors.primary}
            title="To Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  product: {
    // ios
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // android
    elevation: 5,

    borderRadius: 5,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },

  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
