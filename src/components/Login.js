import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_BASE_URL}/login`;

        try {
            const response = await axios.post(url, formData, { withCredentials: true });
            const authenticationResponse = response.data;
            localStorage.setItem('username', authenticationResponse.userName);
            navigate('/main');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error logging in';
            alert(errorMsg);
        }
    };

    return (
        <div>
            <h1>TomEmr Simple to-do app</h1>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register new user!</Link>
        </div>
    );
};

export default Login;
