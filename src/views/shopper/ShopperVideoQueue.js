import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    display: "flex",
    color: theme.palette.text.secondary,
    background: "#eeeeee",
    height: "50vh",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ShopperVideoQueue() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" className={classes.heading}>
        NextGenShop Cashier
      </Typography>
      <Paper className={classes.paper}>Waiting for customer...</Paper>
    </Container>
  );
}
