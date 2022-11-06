import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  size?: string;
  image: string;
  userID: string;
  name: string;
}

const AvatarLink: React.FC<Props> = ({ name, image, size, userID }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${userID}`);
  };
  return (
    <Tooltip title={name}>
      <Avatar
        src={image}
        sx={
          size
            ? { width: size, height: size, cursor: "pointer" }
            : { cursor: "pointer" }
        }
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default AvatarLink;
