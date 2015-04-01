'use strict';

var React = require('react-native');
var assign = require('object-assign');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Text,
    View,
    } = React;


var EditView = React.createClass({

    render: function() {
//        {"navigator":{},"route":{"title":"edit","todo":{"id":"i7yjmkka","complete":false,"text":"ewew"}}}
        console.log(this.props.route.todo.text);
        return (
            <View style={styles.container}>
                <View style={styles.flowRight}>
                    <Text>{this.props.route.todo.text}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text>
                    
                    </Text>
                </View>
            </View>
            );

    }

});

var styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    marginTop:60
    },
    centerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },

    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    doneButtonText: {
        fontSize: 11,
        color: 'white',
        alignSelf: 'center'
    },
    doneBtn : {
        height: 23,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,

    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    TodoItem : {
        flex: 1
    },
    TodoItemDone: {
        flex: 1,
        color : "red"
    },
});

module.exports = EditView;
