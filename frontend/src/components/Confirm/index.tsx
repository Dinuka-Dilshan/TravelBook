import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  onConfirmOk: () => void;
  onConfirmNotOk: () => void;
}

const Confirm: React.FC<Props> = ({ onConfirmNotOk, onConfirmOk }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.1)",
        flexDirection: "column",
        zIndex: 2500,
      }}
    >
      <Box
        zIndex={1000}
        position={"fixed"}
        top={"10%"}
        left="50%"
        sx={{ transform: "translateX(-50%)" }}
        width="25rem"
        height={"3rem"}
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        p="0.2rem"
        px="1rem"
        bgcolor="white"
        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
      >
        <Typography
          fontSize={"1.2rem"}
          color="#333333"
          letterSpacing={2}
          fontFamily={"Poor Story, cursive"}
        >
          Are you sure?
        </Typography>
        <Box>
          <Button onClick={onConfirmOk}>Yes</Button>
          <Button onClick={onConfirmNotOk}>No</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirm;
