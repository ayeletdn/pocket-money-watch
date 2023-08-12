import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  uid: string,
  balance?: number;
}

export default function Child(props: Props) {
  const [balance, setBalance] = useState(props.balance);
  const db = getDatabase();

  const query = useMemo(() => ref(db, "users/"+props.uid), [props.uid, db]);

  useEffect(() => {
    if (balance !== undefined) {
      return;
    }

    console.log('no balance, calling backend');
    onValue(query, (userSnapshot) => {
      const snapshot = userSnapshot.val();
      console.log({snapshot});
      if (snapshot?.type === 'CHILD') {
        setBalance(snapshot?.balance);
      }
    });
  }, [query, balance]);


  return (<div><h1>I am a child</h1> {props.uid}<h2>My balance is {balance ?? 0}</h2></div>);
}
