import { Box, TextField, Typography } from "@mui/material";
import Modal from "../Modal/Modal";

const AddPlace = () => {
  return (
    <Modal size="600px">
      <Box px="1rem">
        <Typography fontSize="1.5rem">Add New Place</Typography>
        <Box mt="1rem">
          <TextField fullWidth size="small" />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlace;
