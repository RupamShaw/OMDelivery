/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {name as appName} from './app.json';
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

AppRegistry.registerComponent(appName, () => App);
