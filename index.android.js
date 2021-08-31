import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from "react-native-track-player";
import TrackPlayerServices from './src/services/TrackPlayerServices';

TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
AppRegistry.registerComponent(appName, () => App);