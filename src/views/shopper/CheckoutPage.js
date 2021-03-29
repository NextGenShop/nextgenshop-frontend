import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import StepForm from "../../components/StepForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    color: "primary",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export function Checkout() {
  const classes = useStyles();

  // TODO:
  // map through basket.items and render the product name, price, quantity etc.
  //console.log(basket); // REMOVE THIS (for testing purposes)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/login" style={{ textDecoration: "none", color: "#FFF" }}>
              NextGenShop
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <StepForm />
        </Paper>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, null)(Checkout);
