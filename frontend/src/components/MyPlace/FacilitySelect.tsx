import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

 const facilities = [
  "Kitchen",
  "Dedicated workspace",
  "Washer",
  "Refrigerator",
  "Wifi",
  "Free street parking",
  "Air conditioning",
  "TV",
];

interface Props {
  addFacility: (facility: string) => void;
}

const FacilitySelect: React.FC<Props> = ({ addFacility }) => {
  const [facility, setFacility] = useState("Kitchen");
  return (
    <FormControl fullWidth>
      <Select
        value={facility}
        onChange={(e) => addFacility(e.target.value)}
        size="small"
      >
        <MenuItem value={""} sx={{ width: "100%" }}>
          {" "}
        </MenuItem>
        {facilities.map((facility, index) => (
          <MenuItem key={index} value={facility} sx={{ width: "100%" }}>
            {facility}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FacilitySelect
