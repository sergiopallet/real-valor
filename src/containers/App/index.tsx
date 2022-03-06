import React, { useState } from "react";
import useAxios from "axios-hooks";
import { ChartDataProps } from "types";
import { dateInDaysUntilToday, marketChartUrl, paserApiToChartData, coins, formatMoney } from "helpers";
import { Button, ChartSection, CoinSelect, Input } from "components";
import DatePickerSection from "components/DatePickerSection";
import styled from "styled-components";

const StyledContainer = styled.div`
`;

const App = () => {
  const [coinCurrence, setCoinCurrence] = useState("bitcoin");
  const [initialAmmount, setInitialAmmount] = useState(1000);
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
      <Input
        onChange={(e) => { setInitialAmmount(e.target.value) }}
        value={formatMoney(initialAmmount)}
        label={"Valor"}
      />

      <DatePickerSection
        setValue={setInitialDate}
        value={initialDate}
        label="Data Inicial"
      />

      <CoinSelect
        value={coinCurrence}
        handleChange={setCoinCurrence}
        options={coins}
      />

      <Button
        onClick={fetch}
        title={"Calcular"}
      />
    </section>
  );
};

export default App;
