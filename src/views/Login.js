import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { actions, types } from "../store/api/auth";
import { Redirect } from "react-router-dom";
import { createErrorSelector } from "../store/error";
import { displayToast } from "../utils/displayToast";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "80vh",
  },
  heading: {
    paddingBottom: theme.spacing(2),
  },
  mt: {
    marginTop: theme.spacing(1),
  },
}));

function Login({ auth, error, dispatchLogin, dispatchClearErrors }) {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (error) {
      displayToast("", error, "danger", dispatchClearErrors);
    }
  }, [error, dispatchClearErrors]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password) {
      const data = { email, password };
      dispatchLogin(data);
    }
    setPassword("");
  };

  return auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4" className={classes.heading}>
        NextGenShop Login
      </Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className={classes.mt} variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

const errorSelector = createErrorSelector([types.LOGIN]);

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: errorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (data) => dispatch(actions.login(data)),
  dispatchClearErrors: () => dispatch(actions.clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
