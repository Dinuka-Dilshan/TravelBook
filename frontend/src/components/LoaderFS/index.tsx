import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./index.css";

const LoaderFS = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: "9%",
        left: 0,
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.56)",
        flexDirection: "column",
        zIndex: 2500,
      }}
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Typography
        color={"primary.main"}
        fontSize={"1.3rem"}
        fontWeight={"bold"}
        fontFamily={"Poor Story, cursive"}
        letterSpacing={1.2}
      >
        Hang On!
      </Typography>
    </Box>
  );
};

export default LoaderFS;
