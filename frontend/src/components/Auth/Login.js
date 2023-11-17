// // Login.js
// // Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState();
//   const navigate = useNavigate();

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add your login logic here, e.g., make an API request, validate credentials, etc.
//     console.log('Login clicked with username:', username, 'and password:', password);
//     // Redirect to the quiz page
//     navigate('/quiz');
//   };

//   const handleRegisterClick = () => {
//     // Redirect to the register page
//     navigate('/register');
//   };

//   return (
//     <div className="login-container">
//       <h1 className="app-heading">Neeraj's Brain Teasers</h1>
     
//       <form className="login-form" onSubmit={handleSubmit}>
//         <label className="login-label">
//           Username <span>&nbsp;&nbsp;</span>
//           <input className="login-input" type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <br />
//         <label className="login-label">
//           Password <span>&nbsp;&nbsp;</span> 
//           <input className="login-input" type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//         <br />
//         <button className="login-button" type="submit">Login </button>
//         <br />
//         <h6 className="login-register-text">Don't have an account?</h6>
//         <button className="login-register-btn" onClick={handleRegisterClick}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Make an API request to check login credentials
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      // Log the entire response for debugging
      console.log('Server response:', response);
  
      // Attempt to parse the response as JSON
      const data = await response.json();
  
      if (response.ok) {
        // Login successful, redirect to the quiz page
        navigate('/quiz');
      } else {
        // Login failed, display an error message
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };
  
  const handleRegisterClick = () => {
    // Redirect to the register page
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1 className="app-heading">Neeraj's Brain Teasers</h1>
     
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username <span>&nbsp;&nbsp;</span>
          <input className="login-input" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label className="login-label">
          Password <span>&nbsp;&nbsp;</span> 
          <input className="login-input" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="login-button" type="submit">Login </button>
        <br />
        {error && <p className="login-error">{error}</p>}
        <h6 className="login-register-text">Don't have an account?</h6>
        <button className="login-register-btn" onClick={handleRegisterClick}>Register</button>
      </form>
    </div>
  );
};

export default Login;

