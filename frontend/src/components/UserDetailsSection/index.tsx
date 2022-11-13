import BoyIcon from "@mui/icons-material/Boy";
import CakeIcon from "@mui/icons-material/Cake";
import GirlIcon from "@mui/icons-material/Girl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import UpdateIcon from "@mui/icons-material/Update";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";
import { User } from "../../models/User";
import { capitalizeEachFirst } from "../../utils/string";

const UserDetailsSection = ({
  bio,
  birthDate,
  country,
  email,
  gender,
  joinedDate,
  name,
  profilePicture,
  state,
}: Omit<User, "viewRecords">) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={"3rem"}
      gap={2}
      flexDirection="column"
      height="100%"
    >
      <Box
        sx={{
          background: "linear-gradient(to right, red, purple)",
          p: "0.25rem",
          borderRadius: "100vh",
        }}
      >
        <Box
          sx={{
            p: "0.2rem",
            borderRadius: "100vh",
            background: "white",
          }}
        >
          <Avatar sx={{ width: "8rem", height: "8rem" }} src={profilePicture} />
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="flex-start"
        mt={"1.5rem"}
        gap={0.5}
        justifyContent="center"
        flexDirection="column"
        minWidth={'85%'}
      >
        <Typography
          color="#3F3F3F"
          letterSpacing={1.2}
          fontSize={"0.9rem"}
          textAlign="center"
        >
          {bio}
        </Typography>
        <Typography
          mt={"1.2rem"}
          fontWeight="bold"
          color="#3F3F3F"
          letterSpacing={1.2}
          fontSize={"1rem"}
        >
          {capitalizeEachFirst(name || "")}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          mt={"0.7rem"}
          justifyContent="center"
        >
          <Typography color="#3F3F3F" fontSize={"0.8rem"} letterSpacing={1.2}>
            From {capitalizeEachFirst(country || "")}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          justifyContent="center"
        >
          <Typography color="#3F3F3F" fontSize={"0.8rem"} letterSpacing={1.2}>
            {email}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          justifyContent="center"
        >
          <Typography color="#3F3F3F" fontSize={"0.8rem"} letterSpacing={1.2}>
            {capitalizeEachFirst(
              birthDate && formatDistance(parseISO(birthDate), new Date())
            )}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          justifyContent="center"
        >
          <Typography fontSize={"0.8rem"} color="#3F3F3F" letterSpacing={1.2}>
            Joined{" "}
            {birthDate &&
              capitalizeEachFirst(
                formatDistanceToNow(parseISO(joinedDate), { addSuffix: true })
              )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailsSection;
