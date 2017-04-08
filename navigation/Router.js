import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ClassScreen from '../screens/ClassScreen'
import BibleScreen from '../screens/BibleScreen'
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  class: () => ClassScreen,
  bible: () => BibleScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
