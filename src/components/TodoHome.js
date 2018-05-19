import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class TodoHome extends Component {
  render() {
    return (
      <React.Fragment>
        <TodoInput />
        <TodoList />
      </React.Fragment>
    );
  }
}

TodoHome.propTypes = {};

export default TodoHome;
