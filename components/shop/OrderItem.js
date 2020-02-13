import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import theme from '../../constants/theme';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  const { amount, date, items } = props;
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Button
        color={theme.colors.primary}
        title={showDetails ? 'Hide details' : 'Show Details'}
        onPress={() => setShowDetails(prevState => !prevState)}
      />

      {showDetails && (
        <View style={styles.detailedItems}>
          {items.map(cartItem => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.title}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    // ios
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // android
    elevation: 5,

    borderRadius: 5,
    backgroundColor: 'white',

    margin: 20,
    padding: 10,
    alignItems: 'center'
  },

  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },

  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },

  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },

  detailedItems: {
    width: '100%'
  }
});

export default OrderItem;
