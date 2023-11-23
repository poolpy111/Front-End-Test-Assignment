import React, { useState } from 'react';
import './login.css';
import welcomeImage from '../../assets/welcome.png';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!email || !password) {
      alert('Please fill all required input fields');
      return;
    }

    localStorage.setItem('user', 'loggedIn');
    setIsAuthenticated(true);
    navigate('/main');
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  return (
    <div className="login-container">
      <div className={`image-container ${showRegister ? 'hide' : ''}`}>
        <img src={welcomeImage} alt="Your Image" />
      </div>
      <div className={`form-container ${showRegister ? 'hide' : ''}`}>
        <div className='welcome-message'>
          <h1>Welcome</h1>
          <h1>to a sneaker</h1>
          <h1>collector</h1>
        </div>
        <p className="small-text">
          This tool not only lets you showcase your prized sneaker collection but also provides you
          with the tools to curate, organize, and catalogue your sneakers like never before.
        </p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button className="login-button" type="submit">
            Log in
          </button>
          <button
            className="register-button"
            type="button"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </form>
      </div>
      {showRegister && <Register setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
};

export default Login;
