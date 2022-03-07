import React, { useState } from "react";
import useAxios from "axios-hooks";
import { ChartDataProps } from "types";
import { dateInDaysUntilToday, marketChartUrl, paserApiToChartData, coins, formatMoney } from "helpers";
import { Button, ChartSection, CoinSelect, Input } from "components";
import DatePickerSection from "components/DatePickerSection";
import styled from "styled-components";

const Container = styled.div`
  display:flex ;
  justify-content: space-between;
  flex-wrap:wrap ;
`;

const StyledSection = styled.section`
  flex:1;
  padding: 20px;
`;

const StyledForm = styled.section`
  display: flex ;
  flex-direction:  column;
  gap:20px ;

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
    <Container>
      <StyledForm>
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
        <Button onClick={fetch}> Calcular </Button>
      </StyledForm>
      <StyledSection>
        <ChartSection
          data={mappedData}
          loading={loading}
          title={coinCurrence}
        />
      </StyledSection>
    </Container>
  );
};

export default App;
