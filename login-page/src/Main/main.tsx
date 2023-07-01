import React, { useCallback, useState } from "react";
import { User, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useOnAuthStateChange from "../useOnAuthStateChange";
import { useFirebaseAuth } from "../firebase";
import UserDetails from "../User/user";

export default function Main() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  useOnAuthStateChange(setUser);
  const {auth} = useFirebaseAuth();

  const onLogout = useCallback(() => {
    signOut(auth).then(() => {
      navigate('/');
    })
  }, [auth, navigate]);

  const goToLogin = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!user) {
    return (<div>You must login<br/><button onClick={goToLogin}>Go To Login</button></div>);
  }

  return (<div><p>Welcome to the app, {user.displayName ?? user.email}</p>
  <UserDetails uid={user.uid} />
  <p><button onClick={onLogout}>Logout</button></p></div>);
}
