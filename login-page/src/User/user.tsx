import {getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";

import Parent from "../Parent/parent";
import Child from "../Child/child";
import React from "react";

export default function UserDetails({uid}: {uid: string}): React.JSX.Element {
  const [user, setUser] = useState<{uid: string, type: string}>();
  const db = getDatabase();

  const query = useMemo(() => ref(db, "users/"+uid), [uid, db]);
  // const query = ref(db, "users");
  const cancelCallback = (error: Error) => {
    console.log({error});
  }
  useEffect(() => {
    console.log(query);
    onValue(query, (userSnapshot) => {
      console.log({userSnapshot});
      if (userSnapshot.exists()) {
        const type = userSnapshot.val()?.type;
        setUser({uid, type});
      }
  }, cancelCallback)}, [query, uid]);


  switch (user?.type) {
    case 'PARENT':
      return <Parent uid={uid} />
    case 'CHILD':
      return <Child uid={uid} />
    default:
      return <div>No user or unidentified type</div>;
  }
}
