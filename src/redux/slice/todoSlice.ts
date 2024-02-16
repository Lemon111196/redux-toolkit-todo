import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo, ITodoState } from "./interface";

const initialState: ITodoState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: ITodo = {
                id: state.todos.length + 1,
                text: action.payload,
            };
            state.todos.push(newTodo);
        },
        updateTodo: (state, action: PayloadAction<{ id: number; newText: string }>) => {
            const { id, newText } = action.payload;
            const todoToEdit = state.todos.find((todo) => todo.id === id);
            if (todoToEdit) {
                todoToEdit.text = newText;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    }
})
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
