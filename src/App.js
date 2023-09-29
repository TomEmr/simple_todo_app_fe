import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import './global.css';

function App() {
    return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/main" element={<Main/>}/>
                    </Routes>
                </div>
            </Router>
    );
}

export default App;
