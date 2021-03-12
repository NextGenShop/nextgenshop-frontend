import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Checkout from "./views/shopper/CheckoutPage";
import CashierVideoQueue from "./views/cashier/CashierVideoQueue";
import ShopperVideoQueue from "./views/shopper/ShopperVideoQueue";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

function App() {
  return (
    <React.Fragment>
      <Router basename="/nextgenshop-frontend">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/shop/queue" component={CashierVideoQueue} />
          <Route path="/cashier/queue" component={ShopperVideoQueue} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Router>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={true}
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
        preventDuplicates
      />
    </React.Fragment>
  );
}

export default App;
