import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const TodoItem = ({ todo, fetchTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateTitle = async () => {
        const updateTitleUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}/title`;
        try {
            await axios.patch(updateTitleUrl, { title: newTitle }, { withCredentials: true });
            await fetchTodos();
            setIsEditing(false);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error updating title';
            alert(errorMsg);
        }
    };

    const handleDelete = async () => {
        const deleteUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}`;
        try {
            await axios.delete(deleteUrl, { withCredentials: true });
            fetchTodos();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error deleting todo';
            alert(errorMsg);
        }
    };

    const handleComplete = async () => {
        const completeUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}/completed`;
        try {
            await axios.patch(completeUrl, {}, { withCredentials: true });
            fetchTodos();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error completing todo';
            alert(errorMsg);
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <DoneIcon onClick={handleUpdateTitle} cursor="pointer"/>
                </>
            ) : (
                <>
                    {todo.title}
                    <EditIcon onClick={handleEditClick} cursor="pointer" />
                </>
            )}
            <TaskIcon onClick={handleComplete} cursor="pointer"/>
            <DeleteIcon onClick={handleDelete} cursor="pointer"/>
        </div>
    );
};

export default TodoItem;
