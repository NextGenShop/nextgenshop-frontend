import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Divider, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { actions, types } from '../store/api/auth';
import { Redirect } from 'react-router-dom';
import { createErrorSelector } from '../store/error';
import { displayToast } from '../utils/displayToast';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: '80vh',
  },
  heading: {
    paddingBottom: theme.spacing(2),
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  mt: {
    marginTop: theme.spacing(1),
  },
}));

export function Login({ auth, error, dispatchLogin, dispatchClearErrors }) {
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (error) {
      displayToast('', error, 'danger', dispatchClearErrors);
    }
  }, [error, dispatchClearErrors]);

  const loginShopper = () => {
    dispatchLogin({ email: 'mockuser1@gmail.com', password: 'password' });
  };

  const loginCashier = () => {
    dispatchLogin({ email: 'mockcashieruser@gmail.com', password: 'password' });
  };

  const handleLogin = () => {
    if (email.trim() && password) {
      const data = { email, password };
      dispatchLogin(data);
    }
    setPassword('');
  };

  return auth && auth.isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <Container className={classes.root} maxWidth='md'>
      <Typography variant='h4' className={classes.heading}>
        NextGenShop Login
      </Typography>
      <TextField
        id='emailTextField'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id='passwordTextField'
        type='password'
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        id='loginButton'
        className={classes.mt}
        color='primary'
        variant='contained'
        onClick={handleLogin}
      >
        Login
      </Button>
      <Divider className={classes.mt} />
      <div className={classes.mt}>
        <Button
          id='loginShopperButton'
          className={classes.mr}
          variant='contained'
          onClick={loginShopper}
        >
          Login as shopper
        </Button>
        <Button
          id='loginCashierButton'
          variant='contained'
          onClick={loginCashier}
        >
          Login as cashier
        </Button>
      </div>
      <Typography className={classes.mt} variant='caption'>
        These buttons are for testing purposes.
      </Typography>
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
