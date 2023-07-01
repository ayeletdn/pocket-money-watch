import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFirebaseAuth } from "./firebase";

export default function useOnAuthStateChange(setUser: (user?: User) => void): void {
    const auth = useFirebaseAuth();

    return useEffect(() => {
      console.log('this useEffect triggered from somewhere. Either auth or setUser changed');
      return onAuthStateChanged(auth, (user) => {
          console.log('testing user', {user});
          if (user) {
            setUser(user);
          } else {
            setUser();
          }
        });
    }, [auth, setUser]);

}
