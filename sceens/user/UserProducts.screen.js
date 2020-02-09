import React from 'react';
import { View, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';

import ProductItem from '../../components/shop/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';
import { addToCart } from '../../store/actions/cart.actions';
import { deleteProduct } from '../../store/actions/products.actions';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id =>
    props.navigation.navigate('EditProduct', { productId: id });

  const deleteHandler = id => {
    Alert.alert('Вы уверены?', 'Удалить этот продукт?', [
      { text: 'Нет', style: 'default' },
      {
        text: 'Да',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        }
      }
    ]); // test russian
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={theme.colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={theme.colors.primary}
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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
      <HeaderButtons title="Add" HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="md-add"
          onPress={() => navData.navigation.navigate('EditProduct')}
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

export default UserProductsScreen;
