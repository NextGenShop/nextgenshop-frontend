import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  mr: {
    marginRight: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" className={classes.heading}>
        NextGenShop Cashier Login
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography variant="subtitle1">Login</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
