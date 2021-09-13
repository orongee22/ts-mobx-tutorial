import React from 'react';
import TodoList from './TodoList/TodoList';
import { TodoStore } from './TodoList/TodoListStore';

function App() {
  return (
    <TodoList todoStore={TodoStore}/>
  );
}

export default App;
