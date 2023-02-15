import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

const Picture = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <img
        src={user.profilePicture || ""}
        width="300px"
        height="300px"
        style={{ borderRadius: "300px" }}
      />
    </Box>
  );
};

export default Picture;
