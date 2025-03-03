import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Navigation from '@navigation/Navigation';

const App = () => {
  console.log('hello');
  return (
    <View style={styles.container}>
      <Text>Appfvfdfdv</Text>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
