import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import theme from '../constants/theme';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth.actions';

const StartScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expityDate } = transformedData;
      const expirationDate = new Date(expityDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('Shop');
      dispatch(authenticate(userId, token));
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartScreen;
