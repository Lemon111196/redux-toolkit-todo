import { Button, TextField } from "@mui/material";
import { TodoContainer } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "../../redux/slice/todoSlice";
import EditIcon from '@mui/icons-material/Edit';
import { RootState } from "../../store/store";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "../../components/Modal";

export default function Todo() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const [editText, setEditText] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    //! Create todo
    const createTodo = () => {
        if (text.trim() !== '') {
            dispatch(addTodo(text))
            setText('');
        }
        console.log(text);
    }

    //! Update todo
    const handleUpdate = (id: number, text: string) => {
        setEditingId(id);
        setEditText(text);
        console.log(setEditingId(id));
    }
    const handleEditSubmit = (id: number) => {
        dispatch(updateTodo({ id, newText: editText }))
        setEditingId(id);
        setEditText('');
        setIsEditDialogOpen(false);
    }

    const handleEditCancel = () => {
        setEditingId(null);
        setEditText('');
    }

    //! Delete todo
    const handleDelete = (id: number) => {
        setEditingId(id);
        setIsDeleteDialogOpen(true);

    }

    const handleDeleteSubmit = () => {
        dispatch(deleteTodo(editingId!))
        setEditingId(null);
        setIsDeleteDialogOpen(false);
    }

    const handleDeleteCancel = () => {
        setEditingId(null);
        setIsDeleteDialogOpen(false);
    }

    return (
        <TodoContainer>
            <h1>Todo List</h1>
            <div className="addItem">
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Todo"
                    variant="outlined"
                    name="todo"

                    onChange={(e) => setText(e.target.value)} />
                <Button
                    variant="outlined"
                    onClick={createTodo}
                >Add
                </Button>
            </div>
            <ul className="listItem">
                {todos.map((todo, index) => (
                    <li className="singleTodo" key={todo.id} >
                        <div className="content">
                            <span className="todo-no">{index + 1}.</span>
                            <span>{todo.text}</span>
                        </div>
                        <div className="btn-group">
                            <EditIcon
                                className="edit"
                                onClick={() => handleUpdate(todo.id, todo.text)}
                            ></EditIcon>
                            <DeleteIcon
                                className="delete"
                                onClick={() => handleDelete(todo.id)}
                            ></DeleteIcon>
                        </div>
                    </li>
                ))}
            </ul>
            <Dialog
                open={isEditDialogOpen}
                title="Update"
                onCancel={handleEditCancel}
                onSubmit={() => handleEditSubmit(editingId!)}
            >
                <TextField
                    label="Update"
                    variant="outlined"
                    value={editText}
                    onChange={((e) => setEditText(e.target.value))}
                />
            </Dialog>
            <Dialog
                open={isDeleteDialogOpen}
                title="Delete"
                onCancel={handleDeleteCancel}
                onSubmit={handleDeleteSubmit}
            >
                <p>Are you sure?</p>
            </Dialog>
        </TodoContainer>

    )
}
