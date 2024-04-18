import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function PasswordStd() {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const allStudentData = JSON.parse(localStorage.getItem('studentFormData')) || [];
        const newPassword = userData.newPassword;
        const confirmPassword = userData.confirmPassword;

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }

        const updatedStudentData = allStudentData.map(student => {
            if (student.email === userData.email) {
                return { ...student, password: newPassword };
            }
            return student;
        });

        localStorage.setItem('studentFormData', JSON.stringify(updatedStudentData));
        console.log('Password updated successfully', updatedStudentData);
        alert('Password updated successfully');
    }
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className='formContainer'>
                <div className='formWrapper'>
                    <h6>Password Change</h6>
                    <form onSubmit={handleSubmit}>
                        {userData && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Password :</label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">New Password :</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        value={userData.newPassword}
                                        onChange={(e) => setUserData(prevState => ({ ...prevState, newPassword: e.target.value }))}
                                    />


                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Confirm  Password :</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={userData.confirmPassword}
                                        onChange={(e) => setUserData(prevState => ({ ...prevState, confirmPassword: e.target.value }))}
                                    />
                                </div>


                                <button type="submit" className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordStd