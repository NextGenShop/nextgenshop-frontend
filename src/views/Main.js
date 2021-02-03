import React from "react";
import CashierMain from "./cashier/CashierPage";
import ShopperMain from "./shopper/ShopperPage";
import Navbar from "../components/Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Main({ auth }) {
  if (auth && auth.isAuthenticated && auth.user) {
    const RenderComponent = auth.user.type === "cashier" ? <CashierMain /> : <ShopperMain />;
    return (
      <React.Fragment>
        <Navbar />
        {RenderComponent}
      </React.Fragment>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Main);
