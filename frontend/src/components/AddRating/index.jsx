import { Box, Rating, Typography } from "@mui/material";
import Modal from "../Modal/Modal";

const AddRating = ({ onClose }) => {
  return (
    <Box>
      <Modal onClose={onClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          <Typography fontSize="1.5rem">Add Your Ratings</Typography>
          <Rating size="large" sx={{color:'primary.main'}}/>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddRating;
