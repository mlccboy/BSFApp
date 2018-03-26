import React from 'react';
import { ScrollView, StyleSheet, View, Alert, WebView } from 'react-native';
import { getI18nText } from '../store/I18n';
import { getCurrentUser } from '../store/user';
import { KeepAwake } from 'expo';

export default class SermonAudioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: getI18nText('讲道录音')
    };
  };

  componentWillMount() {
    KeepAwake.activate();
  }

  componentWillUnmount() {
    KeepAwake.deactivate();
  }

  render() {
    let uri = 'http://mycbsf.org/audio.php?cellphone=' + getCurrentUser().getCellphone();
    if (this.props.navigation.state.params.id) {
      uri += '&lesson=' + this.props.navigation.state.params.id;
    }
    return (
      <WebView
        source={{ uri }}
      />
    );
  }
}
