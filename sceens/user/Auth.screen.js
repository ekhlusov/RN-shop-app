import React, { useState, useReducer, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import theme from '../../constants/theme';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../../store/actions/auth.actions';
import { Alert } from 'react-native-web';

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

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFromState] = useReducer(fromReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    try {
      setError(null);
      setIsLoading(true);
      if (isSignUp) {
        await dispatch(
          signUp(formState.inputValues.email, formState.inputValues.password)
        );
      } else {
        await dispatch(
          login(formState.inputValues.email, formState.inputValues.password)
        );
      }

      props.navigation.navigate('Shop');
    } catch (e) {
      setError(e.message);
      Alert.alert(e.message);
      setIsLoading(false);
    }
  };

  const textChangeHandler = useCallback(
    (inputIdentifier, text) => {
      let isValid = text.trim().length > 0;
      dispatchFromState({
        type: FORM_UPDATE,
        payload: { value: text, isValid: true, inputId: inputIdentifier }
      });
    },
    [dispatchFromState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.container}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email"
              initialValue=""
              onInputChange={textChangeHandler}
            />

            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              initialValue=""
              onInputChange={textChangeHandler}
            />

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  color={theme.colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                color={theme.colors.accent}
                onPress={() => setIsSignUp(prevState => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
