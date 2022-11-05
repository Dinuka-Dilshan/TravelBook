import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import SelectedImage from "./SelectedImage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  onSelect: (file: File) => void;
  file: File | undefined;
}

const FilePicker: React.FC<Props> = ({ onSelect, file }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current?.files && event.target.files?.length === 1) {
      onSelect(inputRef.current.files[0]);
    }
  };

  return (
    <>
      <input
        onClick={handleInputClick}
        onChange={changeHandler}
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        accept="image/webp,image/jpg,image/jpeg,image/png"
      />
      <Box
        sx={{
          border: "1px dashed #9E9E9E",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        p={"1rem"}
        mt="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        onClick={handleClick}
      >
        {file ? (
          <SelectedImage name={file?.name.toString()} size={file?.size} />
        ) : (
          <>
            <Typography fontSize={"1rem"}>
              <CloudUploadIcon sx={{ fontSize: "1.5rem" }} />
            </Typography>
            <Typography fontSize={"1rem"}>Select file</Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default FilePicker;
