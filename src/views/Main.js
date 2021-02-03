import React from "react";
import { Redirect } from "react-router-dom";

function Main() {
  const userType = "cashier";
  return userType === "cashier" ? <Redirect to="/cashier" /> : <Redirect to="/shop" />;
}

export default Main;
