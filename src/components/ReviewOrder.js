import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import basket from "../components/Basket";
import { connect } from "react-redux";

// const products = [
//   { name: "Product 1", desc: "2 Raw Lobster Tails", price: "£ 20.00" },
//   {
//     name: "Product 2",
//     desc: "British Semi Skimmed Milk 2.27L (4 pint)",
//     price: "£ 1.10",
//   },
//   { name: "Product 3", desc: "Chicken Breast Fillets 640g", price: "£ 3.60" },
//   { name: "Product 4", desc: "Dairy Milk Chocolate Bar 110G", price: "£ 0.98" },
//   { name: "Shipping", desc: "", price: "Free" },
// ];
const addresses = ["Gower Street", "No 167", "London", "WCE 6AP", "UK"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export function Review({ basket }) {
  const classes = useStyles();

  console.log(basket);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket.items.map((item) => (
          <ListItem className={classes.list} key={item.product.name}>
            <ListItemText primary={item.product.name} />
            <Typography variant="body2">
              £{(item.product.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.list}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            £{basket.totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  products: state.product.products,
  basket: state.basket,
});

export default connect(mapStateToProps, null)(Review);
