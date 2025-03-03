import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import Logo from '@assets/images/logo.jpeg';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {navigate} from '@utils/NavigationUtils';

const SplashScreen: FC = () => {
  useEffect(() => {
    const navigateUser = () => {
      try {
        navigate('CustomerLogin');
      } catch (err) {}
    };
    const timeoutId = setTimeout(navigateUser, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
