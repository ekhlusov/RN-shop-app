import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import theme from '../constants/theme';

// Screens
import ProductsOverviewScreen from '../sceens/shop/ProductsOverview.screen';
import ProductDetailScreen from '../sceens/shop/ProductDetail.screen';
import CartScreen from '../sceens/shop/Cart.screen';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? theme.colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'open-sans'
      },
      // ios
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      //^^ios
      headerTintColor:
        Platform.OS === 'android' ? 'white' : theme.colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);
