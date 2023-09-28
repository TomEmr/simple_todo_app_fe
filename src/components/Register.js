import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useApiCall from '../hooks/useApiCall.ts';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: ''
    });
    const { makeApiCall } = useApiCall();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerUrl = `${process.env.REACT_APP_API_BASE_URL}/register`;

        const [data, error] = await makeApiCall({
            url: registerUrl,
            method: 'POST',
            data: formData,
        });
        if (data) {
            alert('Registration successful');
            setFormData({
                userName: '',
                password: '',
                email: ''
            });
        } else if (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h2>Register Page</h2>
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
