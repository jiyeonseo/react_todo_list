'use strict';

var React = require('react-native');
var assign = require('object-assign');
var EditView = require('./EditView');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Text,
    View,
    } = React;

var _todos = {};

function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}
function destroy(id) {
    delete _todos[id];
}

var MyView = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            input : ""
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._genRows())
        });
    },
    render: function() {
        if(this._genRows().length == 0){
            return this.renderNothing();
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.flowRight}>
                        <TextInput
                        style={styles.searchInput}
                        value={this.state.input}
                        onChangeText={(text) => this.setState({input: text})}
                        placeholder='Do Something now'/>
                        <TouchableHighlight style={styles.button}
                        onPress={this._addTodo}
                        underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableHighlight>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderTodo}
                        onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                    />
                </View>
            );
        }

    },
    renderNothing : function(){
        return (
            <View style={styles.container}>
                <View style={styles.flowRight}>
                    <TextInput
                    style={styles.searchInput}
                    value={this.state.input}
                    onChangeText={(text) => this.setState({input: text})}
                    placeholder='Do Something now'/>
                    <TouchableHighlight style={styles.button}
                    onPress={this._addTodo}
                    underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.centerContainer}>
                    <Text>
                    Noting to do. Do Something
                    </Text>
                </View>
            </View>

            );
    },
    renderTodo : function(todo){ // 모듈을 떼어내자
        var todoItemStyle;
        todoItemStyle = (todo.complete) ? styles.TodoItemDone : styles.TodoItem;
        return (
                <View>
                    <View style={styles.row}>
                        <Text style={todoItemStyle}>
                            {todo.text}
                        </Text>
                        <TouchableHighlight style={styles.doneBtn}
                        onPress={() => this._pressDone(todo)}
                        underlayColor='#99d9f4'>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.doneBtn}
                        onPress={() => this._pressEdit(todo)}
                        underlayColor='#99d9f4'>
                            <Text style={styles.doneButtonText}>Edit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.doneBtn}
                        onPress={() => this._pressDel(todo)}
                        underlayColor='#99d9f4'>
                            <Text style={styles.doneButtonText}>Del</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.separator} />
                </View>

            );
    },

    _genRows: function() {
        var todos = [];
        for(var key in _todos) {
            todos.push(_todos[key]);
        }
        return todos;
    },

    _pressEdit : function(todo) {
        console.log(this.props);
        this.props.navigator.push({
            title: "edit",
            component: EditView,
            todo : todo
        });
    },
    _pressDone : function(todo) {
        update(todo.id, {complete: true});
        this.fetchData();
    },
    _pressDel : function(todo) {
        destroy(todo.id);
        this.fetchData();
    },
    _addTodo : function() {
        var text = this.state.input;
        if(text) create(text);
            this.setState({
                input: ''
            });
        this.fetchData();
    },


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

module.exports = MyView;
