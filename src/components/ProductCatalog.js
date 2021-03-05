import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import PlaceholderImage from "../assets/images/placeholder_image.png";
import { connect } from "react-redux";
import { actions as productActions } from "../store/api/product";
import { actions as basketActions } from "../store/api/basket";
import { addBasketItem } from "../utils/basketUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "29vh",
    overflowY: "scroll",
  },
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    border: "1px solid #dadde9",
  },
  card: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  media: {
    width: 80,
  },
  productText: {
    fontWeight: "bold",
    fontSize: "13px",
  },
  smallText: {
    fontSize: "12px",
  },
  mb: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    width: 20,
  },
}));

function ProductCatalog({
  searchQuery,
  retailer,
  limit,
  tableView,
  products,
  shopperId,
  dispatchGetProducts,
  dispatchUpdateBasket,
  basket,
}) {
  const classes = useStyles();

  React.useEffect(() => {
    dispatchGetProducts(searchQuery, retailer, limit);
  }, [dispatchGetProducts, limit, retailer, searchQuery]);

  const addToBasket = (product) => {
    const newBasket = addBasketItem(product, basket);
    dispatchUpdateBasket(shopperId, newBasket);
  };

  return tableView ? (
    <TableContainer className={classes.root}>
      <Table size="small" aria-label="product catalog table">
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productId}>
              <Tooltip
                title={
                  <img
                    alt="product"
                    className={classes.media}
                    src={
                      product.image === "mockImageUrl"
                        ? PlaceholderImage
                        : product.image
                    }
                  />
                }
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
              </Tooltip>
              <TableCell align="right">£ {product.price.toFixed(2)}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => addToBasket(product)}
                >
                  Add to basket
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Grid container spacing={2} className={classes.root}>
      {products.map((product) => (
        <Grid item md={4} key={product.productId}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.productText}
                  gutterBottom
                  variant="subtitle2"
                >
                  {product.name}
                </Typography>
                <Typography
                  className={classes.smallText}
                  display="inline"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Price:{" "}
                </Typography>
                <Typography
                  className={classes.smallText}
                  display="inline"
                  variant="body2"
                  color="primary"
                  component="p"
                >
                  £ {product.price.toFixed(2)}
                </Typography>
                <br />
                <Typography
                  className={classes.smallText}
                  display="inline"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Retailer:{" "}
                </Typography>
                <Typography
                  className={classes.smallText}
                  display="inline"
                  variant="body2"
                  color="primary"
                  component="p"
                >
                  {product.retailer}
                </Typography>
              </CardContent>
              <div className={classes.buttons}>
                <Button
                  className={classes.addButton}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => addToBasket(product)}
                >
                  Add
                </Button>
              </div>
            </div>
            <CardMedia
              className={classes.media}
              image={
                product.image === "mockImageUrl"
                  ? PlaceholderImage
                  : product.image
              }
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  basket: state.basket,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetProducts: (query, retailer, limit) =>
    dispatch(productActions.getProducts(query, retailer, limit)),
  dispatchUpdateBasket: (shopperId, basketData) =>
    dispatch(basketActions.updateBasket(shopperId, basketData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalog);
