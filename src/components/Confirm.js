import React from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

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
// Destructure props
export function Confirm({ handleNext, handleBack, values, basket }) {
  const {
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    postcode,
    country,
  } = values;
  const classes = useStyles();

  const handleSubmit = () => {
    // Do whatever with the values
    console.log(values);
    // Show last compinent or success message
    handleNext();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket &&
          basket.items &&
          basket.items.map((item) => (
            <ListItem className={classes.list} key={item.product.name}>
              <ListItemText
                primary={item.product.name}
                secondary={"Quantity: " + item.quantity}
              />
              <Typography variant="body2">
                £{(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
        <ListItem className={classes.list}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            £{basket ? basket.totalPrice : 0}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                Address:
                <Typography gutterBottom>{address1}</Typography>
              </Grid>
              <Grid item xs={6}>
                Number:
                <Typography gutterBottom>{address2}</Typography>
              </Grid>
              <Grid item xs={6}>
                City:
                <Typography gutterBottom>{city}</Typography>
              </Grid>
              <Grid item xs={6}>
                State/Region:
                <Typography gutterBottom>{state}</Typography>
              </Grid>
              <Grid item xs={6}>
                Postcode:
                <Typography gutterBottom>{postcode}</Typography>
              </Grid>
              <Grid item xs={6}>
                Country:
                <Typography gutterBottom>{country}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contact details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                First Name:
                <Typography gutterBottom>{firstName}</Typography>
              </Grid>
              <Grid item xs={6}>
                Last Name:
                <Typography gutterBottom>{lastName}</Typography>
              </Grid>
              <Grid item xs={6}>
                Email:
                <Typography gutterBottom>{email}</Typography>
              </Grid>
              <Grid item xs={6}>
                Phone Number:
                <Typography gutterBottom>{phone}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Confirm & Continue
        </Button>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, null)(Confirm);
