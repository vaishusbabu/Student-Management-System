import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudentHome() {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const allStudentData = JSON.parse(localStorage.getItem('studentFormData')) || [];

        console.log("loggedInUserEmail", loggedInUserEmail);
        console.log("allStudentData", allStudentData);

        const user = allStudentData.find(student => student.email === loggedInUserEmail);

        if (user) {
            setUserData(user);
        } else {
            console.log('User not found');
        }
    }, []);


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
                                    <Link className="nav-link active" aria-current="page" to="/studenthome">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/editstd">Update Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/passwordstd">Password Change</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={'/'}>Logout</Link >
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='formContainer'>
                <div className='formWrapper'>
                    <h6>View Profile</h6>
                    {userData && (
                        <div>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Mobile Number: {userData.mobileNumber}</p>
                            <p>Manager:{userData.manager}</p>
                            <button type="button" className="btn btn-dark">
                                <Link to="/editstd" className="nav-link">Edit Profile</Link>
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentHome;
