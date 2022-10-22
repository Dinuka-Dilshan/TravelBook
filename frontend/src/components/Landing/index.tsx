import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/places");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      width={"100%"}
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      bgcolor={"primary.main"}
    >
      <Typography color="white" fontSize="2rem" letterSpacing={6}>
        TravelMate
      </Typography>
    </Box>
  );
};

export default Landing;
