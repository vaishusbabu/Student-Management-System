import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ViewAllUsers() {
    const [studentData, setStudentData] = useState([]);
    const [managerData, setManagerData] = useState([]);

    useEffect(() => {
        const storedStudentData = JSON.parse(localStorage.getItem('studentFormData')) || [];
        setStudentData(storedStudentData);

        const storedManagerData = JSON.parse(localStorage.getItem('managerFormData')) || [];
        setManagerData(storedManagerData);
    }, []);

    const handleDelete = (index, userType) => {
        let localStorageKey = '';
        let updatedData = [];

        if (userType === 'student') {
            localStorageKey = 'studentFormData';
            updatedData = [...studentData];
        } else if (userType === 'manager') {
            localStorageKey = 'managerFormData';
            updatedData = [...managerData];
        }

        updatedData.splice(index, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedData));

        if (userType === 'student') {
            setStudentData(updatedData);
        } else if (userType === 'manager') {
            setManagerData(updatedData);
        }

        console.log(`User deleted from localStorage (${userType}) at index ${index}`);
    };

    return (
        <div>
            <div className='navbar'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/adminhome">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/viewalluser">View All Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registration</Link>


                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className='formContainer'>
                <div className='formWrapper'>
                    <h6>View all Students </h6>
                    <hr />
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sl.no</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Manager</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((student, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.mobileNumber}</td>
                                        <td>{student.manager}</td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(index, 'student')}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='formWrapper'>
                    <h6>View all Managers </h6>
                    <hr />
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sl.no</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {managerData.map((manager, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{manager.name}</td>
                                        <td>{manager.email}</td>
                                        <td>{manager.mobileNumber}</td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(index, 'manager')}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAllUsers;
