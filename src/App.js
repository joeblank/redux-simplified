import React, { Component } from 'react';
import store from './store';
import { ADD_TODO, TOGGLE_STATUS, CLEAR_COMPLETED } from './store';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: store.getState(),
      userInput: ''
    }
  }

  componentDidMount() {
    store.subscribe(() => this.setState({ store: store.getState() }))
  }

  handleSubmit(e) {
    e.preventDefault()
    const newTodo = { text: this.state.userInput, completed: false };

    store.dispatch({
      type: ADD_TODO,
      payload: newTodo
    })

    this.setState({ userInput: '' })
  }

  handleChange(val) {
    this.setState({ userInput: val })
  }

  toggleStatus(index) {
    store.dispatch({
      type: TOGGLE_STATUS,
      payload: index
    })
  }

  clearCompleted() {
    store.dispatch({
      type: CLEAR_COMPLETED
    })
  }

  render() {
    let { userInput, store } = this.state;
    let todoList = store.todos.map((todo, i) => (
      <div>
        <p>
          <span style={todo.completed ? { textDecoration: 'line-through', color: 'lightgray' } : null}>{todo.text}</span>
          <button
            onClick={() => this.toggleStatus(i)}
            style={{ marginLeft: '12px' }}
          >
            {todo.completed ? 'incomplete' : 'complete'}
          </button>
        </p>
      </div>
    ))
    return (
      <div className="App">
        <h1>To-do w/ Redux</h1>
        <button onClick={this.clearCompleted}>Clear Completed</button><br /><br />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>New to-do:</label>
          <input onChange={(e) => this.handleChange(e.target.value)} value={userInput} type="text" />
          <button>Add</button>
        </form>
        <br /><br />
        {todoList}
      </div>
    );
  }
}

export default App;
