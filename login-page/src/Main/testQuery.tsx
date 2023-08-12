import { getDatabase, ref, query, onValue, orderByChild, equalTo } from "firebase/database";
import React from "react";
import { useEffect, useMemo, useState } from "react";

type Child = {[childUID: string]: number};

type Parent = {
  type: string,
  dependants: Child
}

export function TestQuery() {
  const [children, setChildren] = useState<Child>({});
  const db = getDatabase();
  const q = useMemo(() => query(ref(db, "/users"), orderByChild('type'), equalTo('PARENT')), [db]);

  useEffect(() => {
    onValue(q, (snapshot) => {
      if (snapshot && snapshot.val) {
        const parents: {[uid: string]: Parent} = snapshot.val();

        // Create a dictionary of children
        let childs = {};
        Object.keys(parents).forEach(pUID => {
          const dependants = parents[pUID].dependants;
          childs = Object.assign(childs, dependants);
        });


        setChildren(childs);
      }
    });
  }, []);

  return (<div>Snapshot returned {JSON.stringify(children)} parents</div>);
}
