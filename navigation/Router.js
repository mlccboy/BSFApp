import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LessonScreen from '../screens/LessonScreen'
import BibleScreen from '../screens/BibleScreen'
import RootNavigation from './RootNavigation';
import AudioBibleScreen from '../screens/AudioBibleScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  lesson: () => LessonScreen,
  bible: () => BibleScreen,
  settings: () => SettingsScreen,
  audioBible: () => AudioBibleScreen,
  rootNavigation: () => RootNavigation,
}));
