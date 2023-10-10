import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useApiCall from "../hooks/useApiCall.ts";

const Login = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });

        const navigate = useNavigate();
        const {makeApiCall} = useApiCall();

        const handleChange = (e) => {
            const {name, value} = e.target;
            setFormData({...formData, [name]: value});
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/login`;
            const [data, error] = await makeApiCall({
                url: loginUrl,
                method: 'POST',
                data: formData,
            });
            if (data) {
                localStorage.setItem('username', data.userName);
                navigate('/main');
            } else if (error) {
                alert(error)
            }
        };

        return (
            <div>
                <h1>Easy to-do app</h1>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                           placeholder="Password"/>
                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Register new user!</Link>
            </div>
        );
    }
;

export default Login;
