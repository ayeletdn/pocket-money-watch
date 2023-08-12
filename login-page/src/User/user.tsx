import {getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";

import Parent from "../Parent/parent";
import Child from "../Child/child";
import React from "react";

export default function UserDetails({uid}: {uid: string}): React.JSX.Element {
  const [user, setUser] = useState<{uid: string, type: string}>();
  const [dependants, setDependants] = useState<{[key: string]: boolean} | undefined>();
  const [balance, setBalance] = useState<number | undefined>();
  const db = getDatabase();

  const query = useMemo(() => ref(db, "users/"+uid), [uid, db]);
  const cancelCallback = (error: Error) => {
    console.log({error});
  }
  useEffect(() => {
    onValue(query, (userSnapshot) => {
      if (userSnapshot.exists()) {
        const snapshot = userSnapshot.val();
        const type = snapshot?.type;
        setUser({uid, type});
        setDependants(snapshot.dependants);
        setBalance(snapshot.balance);
      }
  }, cancelCallback)}, [query, uid]);


  switch (user?.type) {
    case 'PARENT':
      return <Parent uid={uid} dependents={dependants} />
    case 'CHILD':
      return <Child uid={uid} balance={balance} />
    default:
      return <div>No user or unidentified type</div>;
  }
}
