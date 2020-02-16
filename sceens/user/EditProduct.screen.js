import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  createProduct,
  updateProduct
} from '../../store/actions/products.actions';
import theme from '../../constants/theme';

// form reducer
const FORM_UPDATE = 'UPDATE';
const fromReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const { inputId, value, isValid } = action.payload;

    const updatedValues = {
      ...state.inputValues,
      [inputId]: value
    };

    const updateValidities = {
      ...state.inputValidities,
      [inputId]: isValid
    };

    let updatedFormIsValid = true;
    for (const key in updateValidities) {
      updatedFormIsValid = updatedFormIsValid && updateValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updateValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === prodId)
  );
  const dispatch = useDispatch();
  const [formState, dispatchFromState] = useReducer(fromReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : ''
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      price: !!editedProduct,
      description: !!editedProduct
    },
    formIsValid: !!editedProduct
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Check errors in form', [{ title: 'OK' }]);
      return;
    }
    // =======
    const { title, description, imageUrl, price } = formState.inputValues;

    setError(null);
    setIsLoading(true);
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, description, imageUrl))
        .then(() => setIsLoading(false))
        .catch(e => setError(e.message));
    } else {
      dispatch(createProduct(title, description, imageUrl, parseFloat(price)))
        .then(() => setIsLoading(false))
        .catch(e => setError(e.message));
    }

    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (text, inputId) => {
    let isValid = text.trim().length > 0;
    dispatchFromState({
      type: FORM_UPDATE,
      payload: { value: text, isValid: isValid, inputId: inputId }
    });
  };

  const { title, price, imageUrl, description } = formState.inputValues;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => textChangeHandler(text, 'title')}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
          />
          {!formState.inputValidities.title && <Text>Title is not valid</Text>}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => textChangeHandler(text, 'imageUrl')}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => textChangeHandler(text, 'price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => textChangeHandler(text, 'description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons title="Save" HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Cart" iconName="md-checkmark" onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },

  formControl: {
    width: '100%'
  },

  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProductScreen;
