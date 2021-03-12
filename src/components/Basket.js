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
import PlaceholderImage from "../assets/images/placeholder_image.png";
import { connect } from "react-redux";
import { actions } from "../store/api/basket";
import { removeBasketItem } from "../utils/basketUtils";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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

export function Basket({
  shopperId,
  dispatchUpdateBasket,
  dispatchGetBasket,
  basket,
}) {
  const classes = useStyles();

  React.useEffect(() => {
    dispatchGetBasket(shopperId);
  }, [dispatchGetBasket, shopperId]);

  const removeItem = (productId) => {
    const newBasket = removeBasketItem(productId, basket);
    dispatchUpdateBasket(shopperId, newBasket);
  };

  return (
    <React.Fragment>
      <List className={classes.list}>
        {basket && basket.items && basket.items.length > 0 ? (
          basket.items.map((item) => (
            <ListItem key={item.product.productId}>
              <ListItemAvatar>
                <Avatar
                  src={
                    item.product.image === "mockImageUrl"
                      ? PlaceholderImage
                      : item.product.image
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.product.name}
                secondary={"Qty: " + item.quantity}
              />
              <ListItemSecondaryAction>
                <Typography className={classes.price} display="inline">
                  £{(item.product.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeItem(item.product.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography variant="subtitle2">
            Your shopping basket is empty.
          </Typography>
        )}
      </List>
      <Typography className={classes.total} variant="h6" component="div">
        Total:{" "}
        <Typography variant="h6" display="inline">
          £ {basket && basket.totalPrice ? basket.totalPrice.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Link to="/checkout"> Checkout </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  basket: state.basket,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBasket: (shopperId) => dispatch(actions.getBasket(shopperId)),
  dispatchUpdateBasket: (shopperId, basketData) =>
    dispatch(actions.updateBasket(shopperId, basketData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
