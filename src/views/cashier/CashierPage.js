import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Basket from "../../components/Basket";
import VideoChat from "../../components/VideoChat";
import ProductCatalog from "../../components/ProductCatalog";
import ProductSearchBox from "../../components/ProductSearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  mt: {
    marginTop: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function CashierPage() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = React.useState("");
  const mockRetailer = "Mock Retailer";
  const mockConnectedShopperId = 0;

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography
            variant="subtitle1"
            display="inline"
            className={classes.mr}
          >
            Video Call
          </Typography>
          <Typography variant="subtitle2" display="inline">
            {" "}
            Customer Name
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Product Catalogue</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <VideoChat />
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
              <ProductCatalog
                tableView
                retailer={mockRetailer}
                searchQuery={searchQuery}
                shopperId={mockConnectedShopperId}
              />
              <hr className={classes.mt} />
              <Typography variant="subtitle1">Customer Basket</Typography>
              <Basket shopperId={mockConnectedShopperId} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
