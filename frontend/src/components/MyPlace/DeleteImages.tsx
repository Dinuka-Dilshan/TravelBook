import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Modal from "../Modal/Modal";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  images: string[];
}

const DeleteImages: React.FC<Props> = ({ onClose, onSuccess, images }) => {
  const { fetchData, isLoading, data } = useFetch();
  const [updatedImages, setUpdatedImages] = useState(images);

  const handleSave = () => {
    fetchData("business/updatePhotos", {
      method: "POST",
      type: "authenticated",
      body: { photos: updatedImages },
    });
  };
  const handleDelete = (index: number) => {
    setUpdatedImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };
  const handleReset = () => {
    setUpdatedImages(images);
  };

  useEffect(() => {
    if (data && !isLoading) {
      onClose();
      onSuccess();
    }
  }, [data, isLoading]);

  return (
    <Modal onClose={onClose} width={"600px"}>
      <Typography fontWeight={500} fontSize="1.1rem" mb="1rem">
        Delete Photos{" "}
        <Typography fontSize={"0.8rem"}>*click on image to delete</Typography>
      </Typography>
      {isLoading && (
        <LinearProgress
          sx={{
            background: "linear-gradient(to right, red, purple)",
            height: "0.1rem",
          }}
        />
      )}
      <Grid container gap={1}>
        {updatedImages.map((image, index) => {
          return (
            <Grid item xs={5.9} key={index} onClick={() => handleDelete(index)}>
              <img
                src={image}
                alt="img"
                width={"100%"}
                height="120px"
                style={{ objectFit: "cover" }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box
        pt={"1rem"}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          onClick={handleReset}
          color="warning"
          sx={{ fontSize: "0.9rem" }}
        >
          Reset
        </Button>
        <Button
          disabled={isLoading}
          sx={{ fontSize: "0.9rem" }}
          onClick={handleSave}
        >
          Save
          {isLoading && (
            <CircularProgress
              color="inherit"
              size={"1.3rem"}
              sx={{ ml: "1rem" }}
            />
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteImages;
