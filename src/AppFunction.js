import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import "./App.css";

const AppFunction = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [inputEditValue, setInputEditValue] = useState("");
    const [editingTodoId, setEditingTodoId] = useState("");

    const addTodo = (e) => {
        e.preventDefault();

        if (inputValue.length <= 1) {
            setInputError(true);
            return;
        }
        const newTodo = {
            id: uuid(),
            text: inputValue,
            isDone: false
        };

        setTodos((prevState) => [...prevState, newTodo]);
        setInputValue("");
    };

    const updateTodo = (isDone, todoId) => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === todoId ? { ...todo, isDone: isDone } : todo
            )
        );
    };

    const handleOnChange = (e) => {
        const { value } = e.target;
        setInputValue(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const deleteTodo = (todoId) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== todoId));
    };

    const editTodo = (todoId) => {
        setShowEditModal(true);
        const todo = todos.find((todo) => todo.id === todoId);

        setInputEditValue(todo.text);
        setEditingTodoId(todoId);
    };

    const handleInputEdit = (e) => {
        setInputEditValue(e.target.value);
    };

    const submitEdit = () => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === editingTodoId
                    ? { ...todo, text: inputEditValue }
                    : todo
            )
        );
        setShowEditModal(false);
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    return (
        <main>
            <form onSubmit={addTodo}>
                <div className="form-control">
                    <input
                        onChange={handleOnChange}
                        value={inputValue}
                        type="text"
                        placeholder="What is on your mind"
                    />
                    {inputError && <span>Invalid Todo</span>}
                </div>
                <input type="submit" value="Add Todo" />
            </form>
            <ul>
                {todos.length >= 1 &&
                    todos.map((todo) => (
                        <li key={todo.id} className="todo">
                            <span
                                className={
                                    todo.isDone ? "todo__text--done" : ""
                                }
                            >
                                {todo.text}
                            </span>
                            <input
                                type="checkbox"
                                defaultChecked={todo.isDone}
                                onChange={(e) => {
                                    updateTodo(e.target.checked, todo.id);
                                }}
                            />
                            <button onClick={() => deleteTodo(todo.id)}>
                                X
                            </button>
                            <button onClick={() => editTodo(todo.id)}>
                                Edit
                            </button>
                        </li>
                    ))}
            </ul>

            <Dialog open={showEditModal} onClose={closeModal}>
                <div className="edit-form">
                    <DialogTitle id="alert-dialog-title">Edit Todo</DialogTitle>
                    <input value={inputEditValue} onChange={handleInputEdit} />
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={submitEdit}>Update Todo</button>
                </div>
            </Dialog>
        </main>
    );
};

export default AppFunction;
