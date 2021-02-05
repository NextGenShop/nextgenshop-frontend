import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import mockRetailers from "../store/mock/MockRetailers.json";

export default function RetailerSelect({ value, onChange }) {
  const retailers = mockRetailers.map((mockRetailer) => mockRetailer.name);

  return (
    <Autocomplete
      id="retailers"
      fullWidth
      disableClearable
      options={retailers}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label="Retailer" />}
    />
  );
}
