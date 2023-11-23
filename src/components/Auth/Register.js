import React from 'react';
import './register.css';
import welcomeImage from '../../assets/register_new_sneakerhead.png';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsAuthenticated }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill all required input fields');
      return;
    }

    localStorage.setItem('user', 'registered');
    setIsAuthenticated(true);
    navigate('/main');
  };

  return (
    <div className="registration-container">
      <div className="image-container">
        <img src={welcomeImage} alt="Your Image" />
      </div>
      <div className="registration-form">
        <h1>Register new sneakerhead</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label>Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Set password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
