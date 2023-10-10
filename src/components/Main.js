import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TodoList from './TodoList';
import useApiCall from "../hooks/useApiCall.ts";

const Main = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [title, setTodo] = useState('');
    const [filter, setFilter] = useState('all');
    const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
    const { makeApiCall } = useApiCall();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const fetchTodos = useCallback(async (filter = 'all') => {
        let todosUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        if (filter !== 'all') {
            todosUrl += `?status=${filter}`;
        }
        const [data, error] = await makeApiCall({ url: todosUrl, method: 'GET' });
        if (data) {
            setTodos(data);
        } else if (error) {
            alert(error);
        }
    }, [makeApiCall]);

    useEffect(() => {
        (async () => {
            await fetchTodos(filter);
        })();
    }, [filter, fetchTodos]);

    const handleAddTodo = async () => {
        const todosUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        const [data, error] = await makeApiCall({
            url: todosUrl,
            method: 'POST',
            data: { title },
        });
        if (data) {
            setTodos([...todos, data]);
            setTodo('');
        } else if (error) {
            alert(error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleAddTodo();
    }

    const handleDeleteAllCompleted = async () => {
        const deleteAllCompletedUrl = `${process.env.REACT_APP_API_TASK_URL}`;
        const [data, error] = await makeApiCall({
            url: deleteAllCompletedUrl,
            method: 'DELETE',
        });
        if (data) {
            await fetchTodos();
        } else if (error) {
            alert(error);
        }
    };

    const handleLogout = async () => {
        const logoutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;
        const [data, error] = await makeApiCall({
            url: logoutUrl,
            method: 'GET',
        });
        if (data) {
            localStorage.removeItem('username');
            navigate('/');
        } else if (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h1>Welcome {username} to your Todo App</h1>
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
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Main;
