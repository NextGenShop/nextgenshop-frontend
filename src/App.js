import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import CashierMain from "./views/cashier/CashierPage";
import ShopperMain from "./views/shopper/ShopperPage";
import CashierVideoQueue from "./views/cashier/CashierVideoQueue";
import ShopperVideoQueue from "./views/shopper/ShopperVideoQueue";

function App() {
  return (
    <Router basename="/nextgenshop-frontend">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/shop" component={ShopperMain} />
        <Route path="/shop/queue" component={CashierVideoQueue} />
        <Route path="/cashier" component={CashierMain} />
        <Route path="/cashier/queue" component={ShopperVideoQueue} />
      </Switch>
    </Router>
  );
}

export default App;