import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import mockProducts from "../store/mockdata/MockSupermarketDataset.json";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

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
}));

export default function ProductCatalog({ addToBasket, searchQuery, retailer, limit, tableView }) {
  const classes = useStyles();

  const getProducts = () => {
    let products = mockProducts.filter((product) => product.retailer === retailer);
    if (searchQuery)
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.productId.toString() === searchQuery
      );
    if (limit) products = products.slice(0, Math.min(limit, products.length));
    return products;
  };

  return tableView ? (
    <TableContainer className={classes.root}>
      <Table size="small" aria-label="product catalog table">
        <TableBody>
          {getProducts().map((product) => (
            <TableRow key={product.productId}>
              <Tooltip title={<img alt="product" className={classes.media} src={product.image} />}>
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
      {getProducts().map((product) => (
        <Grid item md={4}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography className={classes.productText} gutterBottom variant="subtitle2">
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
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => addToBasket(product)}
                >
                  Add to basket
                </Button>
              </div>
            </div>
            <CardMedia className={classes.media} image={product.image} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
