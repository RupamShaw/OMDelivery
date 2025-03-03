import {Text} from 'react-native';
import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="CustomerLogin"
        options={{animation: 'fade'}}
        component={CustomerLogin}
      />
      <Stack.Screen
        name="DeliveryLogin"
        options={{animation: 'fade'}}
        component={DeliveryLogin}
      />
    </Stack.Navigator>
  );
}

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
