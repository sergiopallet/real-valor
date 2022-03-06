import React, { useState } from "react";
import useAxios from "axios-hooks";
import { ChartDataProps } from "types";
import { dateInDaysUntilToday, marketChartUrl, paserApiToChartData, coins } from "helpers";
import { ChartSection, CoinSelect, Input } from "components";
import DatePickerSection from "components/DatePickerSection";


const App = () => {
  const [coinCurrence, setCoinCurrence] = useState("bitcoin");
  const [initialAmmount, setInitialAmmount] = useState("1000");
  const [initialDate, setInitialDate] = useState(new Date());
  const [{ data, loading }, fetch] = useAxios(
    {
      url: marketChartUrl(coinCurrence, dateInDaysUntilToday(initialDate) || 1)
    },
    { manual: true }
  );

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const mappedData: ChartDataProps[] = React.useMemo(() => data ? paserApiToChartData(data, initialAmmount) : [], [data]);

  return (
    <section>
      <ChartSection
        data={mappedData}
        loading={loading}
        title={coinCurrence}
      />
      valor:
      <Input
        onChange={(e) => { setInitialAmmount(e.target.value) }}
        value={initialAmmount}
      />

      <DatePickerSection
        setValue={setInitialDate}
        value={initialDate}
        label="Data Inicial"
      />
      <button onClick={() => { fetch() }}> Calcular</button>
      <CoinSelect
        value={coinCurrence}
        handleChange={setCoinCurrence}
        options={coins}

      />
    </section>
  );
};

export default App;
