import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import { addToCart } from '../../store/actions/cart.actions';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />

      <View style={styles.actions}>
        <Button
          color={theme.colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return { headerTitle: navData.navigation.getParam('productTitle') };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },

  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },

  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },

  actions: {
    marginVertical: 10,
    alignItems: 'center'
  }
});

export default ProductDetailScreen;
