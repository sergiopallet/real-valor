import { useState } from "react";
import { Input } from "../../components";

const Coins = () => {

  const [value, setValue] = useState(3);
  const [date, setDate] = useState(0);

  return (
    <>
      <h1>coins</h1>
      <Input />
    </>
  );
}

export default Coins;
