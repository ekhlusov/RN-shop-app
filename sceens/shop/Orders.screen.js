import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
    />
  );

  return (
    <View style={styles.screen}>
      <Text>OrdersScreen component</Text>
    </View>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons title="Cart" HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons title="Cart" HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default OrdersScreen;
