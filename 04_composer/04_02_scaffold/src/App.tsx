import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types';
import { getTodos, saveTodos } from './utils/localStorage';
import './App.css';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setTodos(getTodos());
    }, []);

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (text: string): void => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const toggleTodo = (id: number): void => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;