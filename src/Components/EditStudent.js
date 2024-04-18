import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { isValidPhoneNumber } from 'react-phone-number-input';

function EditStudent() {
    const [errors, setErrors] = useState({});
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
    const validate = () => {
        const newErrors = {};

        if (!userData || isEmpty(userData.name)) {
            newErrors.name = 'Please enter your name.';
        }

        if (!userData || isEmpty(userData.mobileNumber)) {
            newErrors.mobileNumber = 'Please enter your mobile number.';
        } else if (!isValidPhoneNumber(userData.mobileNumber.toString())) {
            newErrors.mobileNumber = 'Please enter a valid phone number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const allStudentData = JSON.parse(localStorage.getItem('studentFormData')) || [];
            const updatedUserData = allStudentData.map(student => {
                if (student.email === userData.email) {
                    return { ...student, ...userData };
                }
                return student;
            });

            localStorage.setItem('studentFormData', JSON.stringify(updatedUserData));
            console.log('Data saved successfully');
            console.log(updatedUserData);
            alert('Updated Successfully');

        }
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
                    <h6>Edit Profile</h6>
                    <form onSubmit={handleSubmit}>
                        {userData && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        readOnly
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobileNumber"
                                        value={userData.mobileNumber}
                                        onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })}
                                    />
                                    {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="manager" className="form-label">Manager:</label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="form-control"
                                        id="manager"
                                        value={userData.manager}
                                        onChange={(e) => setUserData({ ...userData, manager: e.target.value })}
                                    />

                                </div>

                                <button type="submits" className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStudent