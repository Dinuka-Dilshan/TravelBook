import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import message from "../../assets/music";

interface Props {
  onConfirmOk: () => void;
  onConfirmNotOk: () => void;
}

const Confirm: React.FC<Props> = ({ onConfirmNotOk, onConfirmOk }) => {
  useEffect(() => {
    new Audio(message).play();
  }, []);

  return (
    <Box
      zIndex={1000}
      position={"fixed"}
      top={"10%"}
      left="50%"
      sx={{ transform: "translateX(-50%)" }}
      width="25rem"
      height={"3rem"}
      bgcolor="red"
      borderRadius="0.8rem"
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      p="0.2rem"
      px="1rem"
      boxShadow={
        "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px"
      }
    >
      <Typography fontSize={"1.2rem"} color={"white"}>
        Are you sure?
      </Typography>
      <Box>
        <Button onClick={onConfirmOk} sx={{ color: "white" }}>
          Yes
        </Button>
        <Button onClick={onConfirmNotOk} sx={{ color: "white" }}>
          No
        </Button>
      </Box>
    </Box>
  );
};

export default Confirm;
