import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFirebaseAuth } from "./firebase";

export default function useOnAuthStateChange(setUser: (user?: User) => void): void {
    const {auth} = useFirebaseAuth();

    return useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser();
          }
        });
    }, [auth, setUser]);

}
