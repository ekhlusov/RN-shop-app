import React from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart.actions';
import { addOrder } from '../../store/actions/orders.actions';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedItems = [];

    for (const key in state.cart.items) {
      transformedItems.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }

    return transformedItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round((cartTotalAmount / 100) * 100).toFixed(2)}
          </Text>
        </Text>

        <Button
          color={theme.colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>

      <FlatList
        data={cartItems}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            amount={itemData.item.sum}
            isDeletable
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.id));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    // ios
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // android
    elevation: 5,

    borderRadius: 5,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: theme.colors.primary
  }
});

export default CartScreen;
