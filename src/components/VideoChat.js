import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    color: theme.palette.text.secondary,
    background: "#eeeeee",
    height: "75vh",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function VideoChat({ items }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <AccountCircleIcon />
    </Paper>
  );
}
