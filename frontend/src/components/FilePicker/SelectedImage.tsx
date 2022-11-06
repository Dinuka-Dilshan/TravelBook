import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, Typography } from "@mui/material";
import { truncate } from "../../utils/string";
interface Props {
  name?: string;
  size?: number;
}

const SelectedImage: React.FC<Props> = ({ name, size }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      gap={0.8}
      bgcolor="#E0EFFF"
      p="0.5rem"
      px="1rem"
      borderRadius="0.5rem"
    >
      <Box
        fontSize={"35px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
      >
        <InsertDriveFileIcon fontSize="inherit" color="primary" />
      </Box>
      <Box display={"flex"} flexDirection="column" justifyContent={"center"}>
        {name && (
          <Typography color="primary" fontSize="0.9rem">
            {truncate(name, 25)}
          </Typography>
        )}
        <Typography color="primary" fontSize="0.7rem">
          {size && Math.round(size / 1024)} KB
        </Typography>
      </Box>
    </Box>
  );
};

export default SelectedImage;
