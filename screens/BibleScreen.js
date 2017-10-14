import React from 'react';
import { connect } from 'react-redux'
import { WebView } from 'react-native';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SharedStyles from '../constants/SharedStyles';
import { loadPassage } from '../store/passage';
import { getI18nText, getI18nBibleBook } from '../store/I18n';

class BibleScreen extends React.Component {
  static route = {
    navigationBar: {
      ...SharedStyles.navigationBarStyle,
      title: (route) => {
        return getI18nBibleBook(route.book) + route.verse
      },
    },
  };

  componentWillMount() {
    if (!this.props.passage) {
      this.props.loadPassage();
    }
  }

  getVerseText(verseText) {
    // Check to see if the first line is part of the bible
    const firstLinePos = verseText.indexOf('\n');
    if (firstLinePos != -1) {
      const firstLine = verseText.substring(0, firstLinePos);
      var annotation = true;
      if (verseText.length > firstLinePos) {
        // We have more than one lines
        var words = firstLine.split(' ');
        // It has to be more than one words
        if (words.length > 1) {
          // Check each word starts with upper case
          for (var w in words) {
            if (words[w][0] != words[w][0].toUpperCase()) {
              // Not upper case, not an annotation
              annotation = false;
              break;
            }
          }

          // Use "()" for annotation if found
          if (annotation) {
            verseText = '(' + firstLine + ') ' + verseText.substring(firstLinePos + 1);
          }
        }
      }
    }

    return verseText;
  }

  render() {
    if (this.props.passage) {
      // TODO: [turbozv] We should list all applicable languages here, so that user don't need to go back to settings
      const paragraphs = this.props.passage.paragraphs;
      let html = '<style> body { font-size: 110%;} </style>';
      for (var i in paragraphs) {
        for (var j in paragraphs[i].verses) {
          const verse = paragraphs[i].verses[j];
          const verseText = this.getVerseText(verse.text);
          html += verse.verse + " " + verseText + "<br>";
        }
      }
      return (
        <WebView
          source={{ html }}
        />
      );
    } else {
      // Display loading screen
      return (
        <View style={styles.BSFQuestionContainer}>
          <Text style={{ marginVertical: 12, color: 'black' }}>Loading</Text>
        </View>
      )
    }
  }
}

const bookid = require('../assets/bookid.json');

// Build the web service url
function getId(book, verse) {
  // Parse the book name to id
  let bookId = 1;
  for (var i in bookid) {
    if (bookid[i].name == book) {
      bookId = bookid[i].id;
      break;
    }
  }
  return bookId + "/" + verse;
}

const mapStateToProps = (state, ownProps) => {
  const id = getId(ownProps.route.params.book, ownProps.route.params.verse);
  return {
    passage: state.passages[id],
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = getId(ownProps.route.params.book, ownProps.route.params.verse);
  return {
    loadPassage: () => dispatch(loadPassage(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BibleScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'whitesmoke',
  },
  paragraphContainer: {
    flex: 1,
    marginTop: 15,
  },
  verseText: {
    color: 'grey',
    fontSize: 18,
    lineHeight: 30,
  }
});
