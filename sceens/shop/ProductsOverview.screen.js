import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';

// new redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cart.actions';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() =>
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            })
          }
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

// nav
ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons title="Cart" HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
