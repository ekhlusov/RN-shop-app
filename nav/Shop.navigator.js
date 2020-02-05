import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import ProductsOverviewScreen from '../sceens/shop/ProductsOverview.screen';
import theme from '../constants/theme';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? theme.colors.primary : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : theme.colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);
