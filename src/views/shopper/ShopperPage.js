import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductCatalog from "../../components/ProductCatalog";
import ProductSearchBox from "../../components/ProductSearchBox";
import ArtificialCashier from "../../components/ArtificialCashier";
import Basket from "../../components/Basket";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  mt: {
    marginTop: theme.spacing(3),
  },
}));

function ShopperPage({ authUser }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography variant="subtitle1">Artificial Cashier</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Product Catalogue</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <ArtificialCashier />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProductSearchBox
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <ProductCatalog
            retailer="Mock Retailer"
            searchQuery={searchQuery}
            limit={9}
            shopperId={authUser.userId}
          />
          <hr className={classes.mt} />
          <Typography variant="subtitle1">Shopping Basket</Typography>
          <Basket shopperId={authUser.userId} />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
});

export default connect(mapStateToProps, null)(ShopperPage);
