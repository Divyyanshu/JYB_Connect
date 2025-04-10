import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import {Appearance} from 'react-native';

Appearance.setColorScheme('light');
AppRegistry.registerComponent(appName, () => App);
