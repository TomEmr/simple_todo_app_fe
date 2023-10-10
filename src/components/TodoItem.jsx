import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import useApiCall from '../hooks/useApiCall.ts';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';

const TodoItem = ({todo, fetchTodos}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const {makeApiCall} = useApiCall();
    const iconStyle = {
        margin: '0 10px',
        color: '#0077cc'  // Default color
    };

    const editIconStyle = {...iconStyle, color: '#f39c12'};  // Orange
    const completeIconStyle = {...iconStyle, color: '#27ae60'};  // Green
    const deleteIconStyle = {...iconStyle, color: '#c0392b'};  // Red


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUpdateTitle();
    };

    const handleUpdateTitle = async () => {
        const updateTitleUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}/title`;
        const [data, error] = await makeApiCall(
            {
                url: updateTitleUrl,
                method: 'PATCH',
                data: {title: newTitle}
            });
        if (data) {
            await fetchTodos();
            setIsEditing(false);
        } else if (error) {
            alert(error)
        }
    };

    const handleDelete = async () => {
        const deleteUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}`;
        const [data, error] = await makeApiCall(
            {
                url: deleteUrl,
                method: 'DELETE',
            });
        if (data) {
            await fetchTodos();
        } else if (error) {
            alert(error)

        }
    };

    const handleComplete = async () => {
        const completeUrl = `${process.env.REACT_APP_API_TASK_URL}/${todo.id}/completed`;
        const [data, error] = await makeApiCall(
            {
                url: completeUrl,
                method: 'PATCH',
            });
        if (data) {
            await fetchTodos();
        } else if (error) {
            alert(error)
        }
    };

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <DoneIcon style={completeIconStyle} type="submit" onClick={handleSubmit} cursor="pointer"/>
                </form>
            ) : (
                <>
                    {todo.title}
                    <Tooltip title="Click here to change the title" arrow>
                        <EditIcon style={editIconStyle} onClick={handleEditClick} cursor="pointer"/>
                    </Tooltip>
                </>
            )}
            <Tooltip title={todo.completed ? "Click here for unfinished task" : "Click here to finish the task"} arrow>
                {todo.completed ? (
                    <CloseIcon style={deleteIconStyle} onClick={handleComplete} cursor="pointer" />
                ) : (
                    <TaskIcon style={completeIconStyle} onClick={handleComplete} cursor="pointer" />
                )}
            </Tooltip>
            <Tooltip title="Click here to delete the task" arrow>
                <DeleteIcon style={deleteIconStyle} onClick={handleDelete} cursor="pointer"/>
            </Tooltip>
        </div>
    );
};

export default TodoItem;
