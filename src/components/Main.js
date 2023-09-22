import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

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
            <h1>Welcome to your Todo App</h1>
            <button onClick={handleLogout} style={{float: 'right'}}>Logout</button>
        </div>
    );
};

export default Main;
