import React, { useCallback, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../firebase";
import UserDetails from "../User/user";

export default function Main() {
  const [user, setUser] = useState<User>();
  const [isFetchingUser, setIsFetcingUser] = useState(true);
  const navigate = useNavigate();
  const {auth} = useFirebaseAuth();

  onAuthStateChanged(auth, (user) => {
    setIsFetcingUser(true);
    if (user) {
      setUser(user);
      setIsFetcingUser(false);
    } else {
      setUser(undefined);
      setIsFetcingUser(false);
    }
  });

  const onLogout = useCallback(() => {
    signOut(auth).then(() => {
      navigate('/');
    })
  }, [auth, navigate]);

  if (isFetchingUser) {
    return (<div>Loading data...</div>);
  }

  if (user === undefined) {
    navigate('/');
    return (<div >Redirecting to login page..</div>)
  }

  return (<div><p>Welcome to the app, {user.displayName ?? user.email}</p>
  <UserDetails uid={user.uid} />
  <p><button onClick={onLogout}>Logout</button></p></div>);
}
