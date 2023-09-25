import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TodoList from './TodoList';
import axios from "axios";

const Main = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [title, setTodo] = useState('');
    const [filter, setFilter] = useState('all');
    const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');

    useEffect(() => {
        // Fetch the username from local storage and set it
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const fetchTodos = async (filter = 'all') => {
        let todosUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        if (filter !== 'all') {
            todosUrl += `?status=${filter}`;
        }

        try {
            const response = await axios.get(todosUrl, {withCredentials: true});
            setTodos(response.data);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error fetching todos';
            alert(errorMsg);
        }
    };

    useEffect(() => {
        // Invoke the async function here
        (async () => {
            await fetchTodos(filter);
        })();
    }, [filter]);

    const handleAddTodo = async () => {
        const todosUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        try {
            const response = await axios.post(todosUrl, {title}, {withCredentials: true});
            setTodos([...todos, response.data]);
            setTodo('');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error adding todo';
            alert(errorMsg);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleAddTodo();
    }

    const handleDeleteAllCompleted = async () => {
        const deleteAllCompletedUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        try {
            await axios.delete(deleteAllCompletedUrl, {withCredentials: true});
            await fetchTodos();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error deleting all completed tasks';
            alert(errorMsg);
        }
    };

    const handleLogout = async () => {
        const logoutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;
        try {
            await axios.get(logoutUrl, {withCredentials: true});
            navigate('/');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error logging out';
            alert(errorMsg);
        }
    };

    return (
        <div>
            <h1>Welcome {username} to your Todo App</h1>
            <button onClick={handleLogout} style={{float: 'right'}}>Logout</button>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="New todo title..."
                />
                <button type="submit">Add Todo</button>
            </form>
            <TodoList todos={todos} fetchTodos={() => fetchTodos(filter)}/>
            <div>
                <button onClick={() => {
                    setFilter('all');
                }}>All
                </button>
                <button onClick={() => {
                    setFilter('active');
                }}>Active
                </button>
                <button onClick={() => {
                    setFilter('completed');
                }}>Completed
                </button>
            </div>
            <button onClick={handleDeleteAllCompleted}>Remove All Completed</button>
        </div>
    );
}

export default Main;
