import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductCatalog from "../../components/ProductCatalog";
import ProductSearchBox from "../../components/ProductSearchBox";
import RetailerSelect from "../../components/RetailerSelect";
import mockBasketItems from "../../store/mock/MockBasketItems.json";
import ArtificialCashier from "../../components/ArtificialCashier";
import Basket from "../../components/Basket";
import { addBasketItem, removeBasketItem } from "../../utils/basketUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  mt: {
    marginTop: theme.spacing(3),
  },
}));

export default function ShopperPage() {
  const classes = useStyles();

  const [items, setItems] = React.useState(mockBasketItems);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [retailer, setRetailer] = React.useState("Tesco");

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
            <Grid item xs={6}>
              <ProductSearchBox
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <RetailerSelect
                value={retailer}
                onChange={(event, newValue) => {
                  setRetailer(newValue);
                }}
              />
            </Grid>
          </Grid>
          <ProductCatalog
            retailer={retailer}
            addToBasket={(product) => {
              addBasketItem(product, items, setItems);
            }}
            searchQuery={searchQuery}
            limit={9}
          />
          <hr className={classes.mt} />
          <Typography variant="subtitle1">Shopping Basket</Typography>
          <Basket
            items={items}
            removeItem={(basketItemId) => removeBasketItem(basketItemId, items, setItems)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
