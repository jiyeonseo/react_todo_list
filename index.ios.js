/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var MyView = require('./MyView');

var React_Todo_List = React.createClass({
  render: function() {
    return (
        <NavigatorIOS
        style={styles.container}
        initialRoute={{
            component: MyView,
            title: 'React_Todo_List',
        }}
        tintColor='#008888'
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    itemWrapper: {
        backgroundColor: '#eaeaea',
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

AppRegistry.registerComponent('React_Todo_List', () => React_Todo_List);
