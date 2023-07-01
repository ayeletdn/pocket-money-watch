import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";

import './login.css';
import { useFirebaseAuth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

// Source: https://firebase.google.com/docs/auth/web/start

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {auth} = useFirebaseAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        alert('login scceuss!');
        navigate('/main');
      })
      .catch((error) => {
        alert('login failed');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage});
        setError(errorMessage);
      });


    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === 'string') {
        setError(error)
      } else {
        setError('Unexpected error, see console for error');
        console.log({error});
      }
    }
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
