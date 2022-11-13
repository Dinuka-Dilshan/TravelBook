import { Avatar, Box, Tooltip } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

interface Props {
  size?: string;
  image: string;
  userID: string;
  name: string;
}

const AvatarLink: React.FC<Props> = ({ name, image, size, userID }) => {
  const navigate = useNavigate();
  const { _id: loggedInUserID } = useAppSelector(selectUser);

  const handleClick = () => {
    if (loggedInUserID === userID) {
      navigate(`/profile`);
    } else {
      navigate(`/user/${userID}`);
    }
  };
  return (
    <Tooltip title={name}>
      <Box
        sx={{
          background: "linear-gradient(to right, red, purple)",
          p: "0.1rem",
          borderRadius: "100vh",
        }}
      >
        <Box
          sx={{
            p: "0.1rem",
            borderRadius: "100vh",
            background: "white",
          }}
        >
          <Avatar
            src={image}
            sx={
              size
                ? { width: size, height: size, cursor: "pointer" }
                : { cursor: "pointer" }
            }
            onClick={handleClick}
          />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default memo(AvatarLink);
