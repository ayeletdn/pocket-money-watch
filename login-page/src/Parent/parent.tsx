import React, { useMemo } from "react";
import Child from "../Child/child";

type Props = {
  uid: string,
  dependents?: {[key: string]: boolean},
}

export default function Parent({uid, dependents}: Props) {
  const children = useMemo(() => {
    return dependents === undefined ? [] : Object.keys(dependents);
  }, [dependents]);
  return (<div><h1>I am a parent </h1>{uid}
  <h2>I have {children.length} children</h2>
  {
    <ul>
      {/* {children.map(dep => <li key={dep}>{dep}</li>)} */}
      {children.map(dep => <li key={dep}><Child uid={dep} /></li>)}
    </ul>
  }</div>);
}
