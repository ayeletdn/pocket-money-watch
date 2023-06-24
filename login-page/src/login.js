import React, { useState } from 'react';
// import {app} from '.firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Source: https://firebase.google.com/docs/auth/web/start

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('login scceuss!');
        console.log(user);
      })
      .catch((error) => {
        alert('login failed');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage});
        setError(errorMessage);
      });


    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
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
