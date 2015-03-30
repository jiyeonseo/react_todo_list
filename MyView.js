
/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Text,
    View,
    } = React;

var TodoList = [];

var MyView = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            todoList : [],
            index : 0,
            input : ""
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function(){

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.todoList)
        });
    },
    render: function() {
        if(this.state.todoList.length == 0){
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
                        onPress={this.addTodo}
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
                    onPress={this.addTodo}
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
    renderTodo : function(todo){
        return (

                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {todo.input} : {todo.status}
                        </Text>
                        <TouchableHighlight style={styles.doneBtn}
                        onPress={() => this._pressRow(todo)}
                        underlayColor='#99d9f4'>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.separator} />
                </View>

            );
    },

    _genRows: function(todo) {
        var dataBlob = [];
        for (var ii = 0; ii < this.state.todoList.length; ii++) {
            var todoItem = this.state.todoList[ii];
            if(todoItem==todo){
                todoItem.status = "done";
                this.state.todoList[ii].status = "done";
            }
            dataBlob.push({"index":todoItem.index, "input":todoItem.input, "status":todoItem.status});
        }
        return dataBlob;
    },

    _pressRow : function(todo) {
        console.log("todo", todo);
//        var selectedIndx = this.state.todoList.indexOf(todo);
//        this.state.todoList[selectedIndx].status = "done";
//        this.setState({
//            dataSource: this.state.dataSource.cloneWithRows(this.state.todoList)
//        });
        this.setState({dataSource: this.state.dataSource.cloneWithRows(
            this._genRows(todo)
        )});
//        console.log(this.state.todoList);
//        this.fetchData();
    },
    addTodo : function() {
//        console.log(this.state.input);
        this.state.todoList.push({"index":this.state.index,"input":this.state.input, "status": "todo"});
        this.state.index++;
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
        fontSize: 13,
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
    text: {
        flex: 1,
    },
});


module.exports = MyView;
