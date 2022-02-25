import { useState } from "react";
import { Input } from "../../components";



const Coins = () => {

  const [value, setValue] = useState<number | string>();
  const [date, setDate] = useState<string>("");

  const setMOneyValue = (value: any) => {
    setValue(value);
  }

  const search = () => {
    console.log("pesquisando valores");
  }

  return (
    <>
      <h1>coins</h1>
      value:
      <Input value={value} onChange={({ target }) => { setMOneyValue(target.value) }} />
      <br />
      date:
      <Input value={date} onChange={({ target }) => { setDate(target.value) }} />
      <button onClick={() => search()}>Pesquisar</button>
    </>
  );
}

export default Coins;
