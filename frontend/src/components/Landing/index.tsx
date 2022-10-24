import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const str = localStorage.getItem("user");
    if (str) {
      const user = JSON.parse(str);
      dispatch(login(user));
      navigate("/places");
    } else {
      navigate("/login");
    }
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
