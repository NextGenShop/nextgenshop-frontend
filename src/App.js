import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import CashierVideoQueue from "./views/cashier/CashierVideoQueue";
import ShopperVideoQueue from "./views/shopper/ShopperVideoQueue";
import ReduxToastr from "react-redux-toastr";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak'
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const initOptions = {
  onLoad: 'login-required'
}

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
      <React.Fragment>
        <Router basename="/nextgenshop-frontend">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/shop/queue" component={CashierVideoQueue} />
            <Route path="/cashier/queue" component={ShopperVideoQueue} />
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
    </ReactKeycloakProvider>
  );
}

export default App;
