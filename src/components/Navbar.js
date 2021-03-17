import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import config from '../config';
import { connect } from 'react-redux';
import { actions } from '../store/api/auth';
import { displayToast } from '../utils/displayToast';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export function Navbar({ auth, dispatchLogout }) {
  const classes = useStyles();

  const handleLogout = () => {
    dispatchLogout();
    displayToast('', 'You have been logged out!', 'info');
  };

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {config.APP_NAME}
          </Typography>
          {auth && auth.isAuthenticated ? (
            <Button id='logoutButton' color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <React.Fragment>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/register'>
                Register
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
