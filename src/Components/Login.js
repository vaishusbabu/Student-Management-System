import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const defaultAdminEmail = 'admin@gmail.com';
    const defaultAdminPassword = 'admin@123';

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const studentData = JSON.parse(localStorage.getItem('studentFormData'));
    const managerData = JSON.parse(localStorage.getItem('managerFormData'));
    console.log('Student data:', studentData);
    console.log('Manager data:', managerData);

    const Change = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = values;

        if (email === defaultAdminEmail && password === defaultAdminPassword) {
            localStorage.setItem('loggedInUserEmail', email);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            alert('Admin Login Success');
            console.log('Login Success');
            navigate('/AdminHome');
            return;
        }


        // Check if student
        if (studentData) {
            const student = studentData.find((student) => student.email === email && student.password === password);
            if (student) {
                alert('Student Login Success');
                localStorage.setItem('loggedInUserEmail', email);
                console.log('Login Success');
                navigate('/StudentHome');
                return;
            }
        }

        // Check if manager
        if (managerData) {
            const manager = managerData.find((manager) => manager.email === email && manager.password === password);
            if (manager) {
                alert('Manager Login Success');
                localStorage.setItem('loggedInUserEmail', email);
                localStorage.setItem('loggedInUserName', manager.name);
                console.log('Login Success');
                navigate('/ManagerHome');
                return;
            }

        }
        alert("Invalid Credentials")
        console.log('Invalid Credentials');
    };


    return (
        <div>
            <div className='formContainer'>
                <div className='formWrapper'>
                    <span className='title' logo>Login</span>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <input type="email" className="form-control" id="email" name="email" placeholder='Email' onChange={Change} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <input type="password" className="form-control" id="password" name="password" placeholder='Enter Password' onChange={Change} />
                            </div>
                        </div>
                        <button type="submit" className='button'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
