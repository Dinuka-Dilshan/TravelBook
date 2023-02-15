import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

const Details = () => {
  const user = useAppSelector(selectUser);
  const { field, inputHandler, resetHandler, state, touchHandler } = useForm({
    isValid: false,
    fields: {
      name: {
        value: user.name || "",
        errorMessage: "Invalid Name",
        isValid: false,
        validators: [
          { validator: (val) => val.length > 3, errorMessage: "Invalid Name" },
        ],
        isTouched: false,
      },
    },
  });
  return (
    <Box p="2rem">
      <Typography fontSize="1.2rem" fontWeight="bold" mb="2rem">
        Your Details
      </Typography>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <TextField
           disabled
            size="small"
            fullWidth
            onBlur={() => {
              touchHandler("name");
            }}
            label="Username"
            value={field("name").value}
            onChange={(e) => {
              inputHandler("name", e.target.value);
            }}
          />
          {!field("name").isValid && field("name").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("name").errorMessage}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            size="small"
            fullWidth
            disabled
            value={user.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Joined Date"
            size="small"
            fullWidth
            disabled
            value={formatDistanceToNow(parseISO(user.joinedDate || ""), {
              addSuffix: true,
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Country"
            size="small"
            fullWidth
            disabled
            value={user.country}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="State"
            size="small"
            fullWidth
            disabled
            value={user.state}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            size="small"
            fullWidth
            disabled
            value={formatDistanceToNow(parseISO(user.birthDate || ""))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Gender"
            size="small"
            fullWidth
            disabled
            value={user.gender}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="NIC"
            size="small"
            fullWidth
            disabled
            value={user.nationalID}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
