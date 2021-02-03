import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function RetailerSelect({ value, onChange }) {
  const mockRetailers = ["Tesco", "Sainsbury's", "Waitrose"];

  return (
    <Autocomplete
      id="retailers"
      fullWidth
      disableClearable
      options={mockRetailers}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label="Retailer" />}
    />
  );
}
