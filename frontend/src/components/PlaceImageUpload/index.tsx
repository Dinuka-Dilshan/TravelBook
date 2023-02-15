import {
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { capitalizeEachFirst } from "../../utils/string";
import FilePicker from "../FilePicker";
import Modal from "../Modal/Modal";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  placeName: string;
  placeID: string;
  isBusiness?: boolean;
}

const ImageUpload: React.FC<Props> = ({
  onClose,
  placeName,
  placeID,
  onSuccess,
  isBusiness,
}) => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>();
  const { fetchData, isLoading, data } = useFetch();

  const handleClear = () => {
    setFile(undefined);
    setImage(undefined);
  };

  const handleSelect = (file: File) => {
    setFile(file);
  };

  const handleSave = () => {
    if (!file) return;
    if (isBusiness) {
      const formData = new FormData();
      formData.append("placeImage", file);
      fetchData("business/addPhoto", {
        method: "POST",
        type: "file",
        body: formData,
        autoErrorNotify: true,
      });
    } else {
      const formData = new FormData();
      formData.append("placeImage", file);
      formData.append("placeID", placeID);
      fetchData("place/addPhoto", {
        method: "POST",
        type: "file",
        body: formData,
        autoErrorNotify: true,
      });
    }
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage(fileReader.result as string);
    };

    return () => fileReader.abort();
  }, [file]);

  useEffect(() => {
    if (data && !isLoading) {
      onClose();
      onSuccess();
    }
  }, [data, isLoading]);

  return (
    <Modal onClose={onClose} width={"100%"}>
      <Typography fontWeight={500} fontSize="1.1rem" mb="1rem">
        Add a Photo of {capitalizeEachFirst(placeName)}
      </Typography>
      {isLoading && (
        <LinearProgress
          sx={{
            background: "linear-gradient(to right, red, purple)",
            height: "0.1rem",
          }}
        />
      )}
      {image && (
        <img
          src={image}
          alt=""
          width={"100%"}
          height="250px"
          style={{
            objectFit: "cover",
            borderRadius: "0.2rem",
          }}
        />
      )}
      <FilePicker onSelect={handleSelect} file={file} />
      <Box
        pt={"1rem"}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          onClick={handleClear}
          color="warning"
          sx={{ fontSize: "0.9rem" }}
        >
          Clear
        </Button>
        <Button
          disabled={isLoading || !image}
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

export default ImageUpload;
