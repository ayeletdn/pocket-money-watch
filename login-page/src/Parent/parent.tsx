import { ref, getDatabase, update } from "firebase/database";
import React, { useCallback, useState } from "react";
import Child from "../Child/child";
import GrantForm from "./grant";

type Props = {
  uid: string,
  dependents?: {[key: string]: boolean},
}

export default function Parent({uid, dependents}: Props) {
  const db = getDatabase();
  const [grantingChild, setGrantingChild] = useState<string | undefined>();
  const [childBalances, setChildBalance] = useState<{[childKey: string]: number}>();
  const [children, setChildren] = useState<Array<string>>(dependents === undefined ? [] : Object.keys(dependents));

  const onGrant = async (grantAmount: number) => {
    if (grantAmount === 0 || grantingChild === undefined || childBalances === undefined) {
      return;
    }

    const initialAmount = childBalances[grantingChild] ?? 0;
    const total = grantAmount + initialAmount;

    alert('will grant ' + grantAmount + ' over initial amount of ' + initialAmount + ' for a total of ' + total);

    const updates: {[key: string]: number} = {};
    updates['users/'+grantingChild+'/balance'] = total;
    await update(ref(db), updates);

    // clear the form
    setGrantingChild(undefined);
    // update the parent's blance sheet
    setChildBalance({
      ...childBalances,
      [grantingChild]: total
    });
  }

  const updateChildBalance = useCallback((uid: string, balance: number) => {
    setChildBalance({
      ...childBalances,
      [uid]: balance
    })
  }, [childBalances]);


  return (<div><h1>I am a parent </h1>{uid}
  <h2>I have {children.length} children</h2>
  {
    <ul>
      {children.map(dep =>
        <li key={dep}>
          <Child uid={dep} updateChildBalance={updateChildBalance} />
          <button onClick={() => setGrantingChild(dep)}>Grant?</button>
        </li>
      )}
    </ul>
  }
  {grantingChild && <GrantForm onGrant={onGrant} />}
  </div>);
}
