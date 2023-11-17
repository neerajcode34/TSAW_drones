// // Register.js
// import React, { useState } from 'react';
// import './register.css';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Add your registration logic here, e.g., make an API request, store user data, etc.
//     console.log('Registration submitted with username:', username, 'email:', email, 'and password:', password);

//     // Simulate a delay for demonstration purposes (replace with actual registration logic)
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Redirect the user to the quiz page
//     navigate('/quiz');
//   };

//   return (
//     <div className="register-container">
//     <h1 className="app-heading">Neeraj's Brain Teasers</h1>
      
//       <form className="register-form" onSubmit={handleSubmit}>
//         <label className="register-label">
//           Username
//           <input className="register-input" type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <br />
//         <label className="register-label">
//           Email
//           <input className="register-input" type="email" value={email} onChange={handleEmailChange} />
//         </label>
//         <br />
//         <label className="register-label">
//           Password
//           <input className="register-input" type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//         <br />
//         <button className="register-button" type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;



// Register.js
import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API request to your backend to register the user
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Registration successful, redirect to the quiz page
        navigate('/quiz');
      } else {
        // Registration failed, handle the error (e.g., display an error message)
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set the error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="app-heading">Neeraj's Brain Teasers</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        <label className="register-label">
          Username
          <input className="register-input" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label className="register-label">
          Email
          <input className="register-input" type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label className="register-label">
          Password
          <input className="register-input" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

