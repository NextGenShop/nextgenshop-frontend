import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Destructuring props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { address1, address2, city, state, postcode, country },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    address1.length > 0 &&
    !formErrors.address1 &&
    address2.length > 0 &&
    !formErrors.address2 &&
    city.length > 0 &&
    !formErrors.city &&
    state.length > 0 &&
    !formErrors.state &&
    postcode.length > 0 &&
    !formErrors.postcode &&
    country.length > 0 &&
    !formErrors.country;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address1"
            name="address1"
            placeholder="Enter your address"
            value={address1 || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.address1}
            helperText={formErrors.address1}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number"
            name="address2"
            placeholder="Enter your address number"
            value={address2 || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.address2}
            helperText={formErrors.address2}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            placeholder="Enter your City"
            value={city || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.city}
            helperText={formErrors.city}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            placeholder="Enter your State/Region"
            value={state || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.state}
            helperText={formErrors.state}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postcode"
            name="postcode"
            placeholder="Enter your postcode"
            value={postcode || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.postcode}
            helperText={formErrors.postcode}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            placeholder="Enter your country"
            value={country || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.country}
            helperText={formErrors.country}
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default SecondStep;
