/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {name as appName} from './app.json';
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true,
});

AppRegistry.registerComponent(appName, () => App);
