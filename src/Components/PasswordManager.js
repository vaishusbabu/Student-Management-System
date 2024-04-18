import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
function PasswordManager() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    const allManagerData = JSON.parse(localStorage.getItem('managerFormData')) || [];

    console.log("loggedInUserEmail", loggedInUserEmail);
    console.log("allManagerData", allManagerData);

    const user = allManagerData.find(manager => manager.email === loggedInUserEmail);

    if (user) {
      setUserData(user);
    } else {
      console.log('User not found');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const allManagerData = JSON.parse(localStorage.getItem('managerFormData')) || [];
    const newPassword = userData.newPassword;
    const confirmPassword = userData.confirmPassword;

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (newPassword === userData.password) {
      alert('New password should be different from the current password');
      return;
    }

    const updatedManagerData = allManagerData.map(manager => {
      if (manager.email === userData.email) {
        return { ...manager, password: newPassword };
      }
      return manager;
    });

    localStorage.setItem('managerFormData', JSON.stringify(updatedManagerData));
    console.log('Password updated successfully', updatedManagerData);
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
                  <Link className="nav-link active" aria-current="page" to="/ManagerHome">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/editmanager">Update Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/passwordmanager">Password Change</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/studundermanager">Batch Student Details </Link>
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

export default PasswordManager