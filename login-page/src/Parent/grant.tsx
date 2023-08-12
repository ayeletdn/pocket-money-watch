import React, { useState } from "react";

type Props = {
  onGrant: (grantAmount: number) => void
}

export default function GrantForm({onGrant}: Props) {
  const [grant, setGrant] = useState<number>(0);

  function onInputChange(value: string) {
    const number = parseFloat(value);
    if (!isNaN(number)) {
      setGrant(number);
    } else {
      setGrant(0);
    }
  }

  return (
    <div>
      <input type="number" value={grant} placeholder="Amount to grant child" onChange={event => onInputChange(event.target.value)} />
      <input type="submit" onClick={() => onGrant(grant)} value="Grant!"/>
    </div>
  );
}
