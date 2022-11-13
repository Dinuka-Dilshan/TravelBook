import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationIcon from "@mui/icons-material/Navigation";
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/places", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      width={"100%"}
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      color={"primary.main"}
    >
      <NavigationIcon sx={{ fontSize: "1.7rem", mr: "0.7rem" }} />
      <Typography
        fontSize="2rem"
        fontWeight="bold"
        letterSpacing={6}
        color={"primary.main"}
        fontFamily={"Poor Story, cursive"}
      >
        TravelMate
      </Typography>
    </Box>
  );
};

export default Landing;
