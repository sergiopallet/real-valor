import Market from "containers/Market";
import PoweredBy from "components/PoweredBy";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div style={{ height: "90vh" }}>
        <Switch>
          <Route exact path="/">
            <Market />
          </Route>
        </Switch>
      </div>
      <PoweredBy />
    </div>
  );
};

export default App;
