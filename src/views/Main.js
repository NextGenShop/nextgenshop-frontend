import React from "react";
import CashierMain from "./cashier/CashierPage";
import ShopperMain from "./shopper/ShopperPage";
import Navbar from "../components/Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web';
import jwt_decode from "jwt-decode";

function Main({ auth }) {
  const { keycloak, initialized } = useKeycloak();

  console.log(initialized);
  console.log(keycloak);

  if (initialized) {
    // preferred_username: user's login (can be used as an unique id)
    // realm_access.roles: list of roles [ shopper | cashier ] assigned to current user
    let token = jwt_decode(keycloak.token);
    console.log(token);

    let isShopper = token.realm_access.roles.includes("shopper");
    let isCashier = token.realm_access.roles.includes("cashier");

    const RenderComponent = isCashier ? <CashierMain /> : <ShopperMain />;

    return (
      <React.Fragment>
        <Navbar />
        {RenderComponent}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <CashierMain />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Main);
