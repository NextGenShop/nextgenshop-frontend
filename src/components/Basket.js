import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "29vh",
    overflowY: "scroll",
  },
  price: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    marginRight: theme.spacing(2),
  },
  total: {
    fontWeight: "bold",
  },
}));

export default function Basket({ items, removeItem }) {
  const classes = useStyles();

  const calcTotalPrice = () => {
    let total = 0;
    for (let item of items) {
      total += item.product.price * item.quantity;
    }
    return total;
  };

  return (
    <React.Fragment>
      <List className={classes.list}>
        {items.map((item) => (
          <ListItem key={item.basketItemId}>
            <ListItemAvatar>
              <Avatar src={item.product.image} />
            </ListItemAvatar>
            <ListItemText primary={item.product.name} secondary={"Qty: " + item.quantity} />
            <ListItemSecondaryAction>
              <Typography className={classes.price} display="inline">
                £{(item.product.price * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeItem(item.basketItemId)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography className={classes.total} variant="h6" component="div">
        Total:{" "}
        <Typography variant="h6" display="inline">
          £ {calcTotalPrice().toFixed(2)}
        </Typography>
      </Typography>
    </React.Fragment>
  );
}
