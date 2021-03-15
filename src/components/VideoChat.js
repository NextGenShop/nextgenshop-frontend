import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    background: '#eeeeee',
    height: '75vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function VideoChat() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <AccountCircleIcon />
      <Typography variant='subtitle1'>
        The video chat component is under development.
      </Typography>
    </Paper>
  );
}
