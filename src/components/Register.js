import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_BASE_URL}/register`;

        try {
            const response = await axios.post(url, formData);
            alert('Registration successful');
            setFormData({
                userName: '',
                password: '',
                email: ''
            });
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error registering';
            alert(errorMsg);
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <Link to="/">Already have an account? Login!</Link>
        </div>
    );
};

export default Register;
