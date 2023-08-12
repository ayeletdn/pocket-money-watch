import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  uid: string,
  balance?: number;
  updateChildBalance?: (uid: string, balance: number) => void;
}

export default function Child(props: Props) {
  const {uid, updateChildBalance} = props;
  const [balance, setBalance] = useState(props.balance);
  const db = getDatabase();

  const query = useMemo(() => ref(db, "users/"+uid), [uid, db]);

  useEffect(() => {
    if (balance !== undefined) {
      return;
    }

    onValue(query, (userSnapshot) => {
      const snapshot = userSnapshot.val();
      console.log({snapshot});
      if (snapshot?.type === 'CHILD') {
        setBalance(snapshot?.balance);
        updateChildBalance && updateChildBalance(uid, snapshot?.balance);
      }
    });
  }, [query, balance, uid, updateChildBalance]);


  return (<div><h1>I am a child</h1> {uid}<h2>My balance is {balance ?? 0}</h2></div>);
}
