import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Package as PackageDetails } from "../../models/BusinessPlace";

export interface Package {
  dailyPrice?: number;
  guestSize?: number;
  isPetsAllowed?: boolean;
  numberOfRooms?: number;
  numberOfBeds?: number;
  name?: string;
}

interface Props {
  onClick: (pkg: PackageDetails) => void;
  onEdit: (index: number, pkg: PackageDetails) => void;
  type: "EDIT" | "ADD";
  index: number;
}

const PackageInput: React.FC<Package & Props> = ({
  dailyPrice,
  guestSize,
  isPetsAllowed,
  name,
  numberOfBeds,
  numberOfRooms,
  onClick,
  type,
  onEdit,
  index,
}) => {
  const [packageDetails, setPackageDetails] = useState({
    dailyPrice,
    guestSize,
    isPetsAllowed,
    name,
    numberOfBeds,
    numberOfRooms,
  });

  const handleChange = (key: keyof Package, value: string | boolean) => {
    setPackageDetails((p) => ({
      ...p,
      [key]: value,
    }));
  };

  return (
    <Grid container gap={1} my="1rem">
      <Grid item xs={3.7}>
        <TextField
          label="Daily Price"
          size="small"
          fullWidth
          type="number"
          value={packageDetails.dailyPrice}
          onChange={(e) => handleChange("dailyPrice", e.target.value)}
        />
      </Grid>
      <Grid item xs={3.7}>
        <TextField
          label="Guest Size"
          size="small"
          fullWidth
          type="number"
          value={packageDetails.guestSize}
          onChange={(e) => handleChange("guestSize", e.target.value)}
        />
      </Grid>
      <Grid item xs={3.7}>
        {" "}
        <TextField
          label="Name"
          size="small"
          fullWidth
          value={packageDetails.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </Grid>
      <Grid item xs={3.7}>
        <TextField
          label="Number of Beds"
          size="small"
          fullWidth
          type="number"
          value={packageDetails.numberOfBeds}
          onChange={(e) => handleChange("numberOfBeds", e.target.value)}
        />
      </Grid>
      <Grid item xs={3.7}>
        <TextField
          label="Number of Rooms"
          size="small"
          fullWidth
          type="number"
          value={packageDetails.numberOfRooms}
          onChange={(e) => handleChange("numberOfRooms", e.target.value)}
        />
      </Grid>
      <Grid item xs={3.7}>
        <FormControlLabel
          control={
            <Checkbox
              checked={packageDetails.isPetsAllowed}
              onChange={(e) => handleChange("isPetsAllowed", e.target.checked)}
              size="small"
            />
          }
          label={"Are Pets Allowed?"}
        />
      </Grid>
      <Grid item xs={3.7}>
        <Button
          variant="contained"
          onClick={() =>
            type === "ADD"
              ? onClick(packageDetails as PackageDetails)
              : onEdit(index, packageDetails as PackageDetails)
          }
        >
          {type} Package
        </Button>
      </Grid>
    </Grid>
  );
};

export default PackageInput;
