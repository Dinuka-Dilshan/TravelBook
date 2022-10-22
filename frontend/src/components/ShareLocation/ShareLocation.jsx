import {
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const ShareLocation = ({ link, onClose }) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    navigator.clipboard.writeText(link);
    setIsClicked(true);
  };

  const closeHandler = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(182, 184, 187, 0.25)",
          zIndex: 2500,
        }}
      >
        <Card
          variant="outlined"
          sx={{ minWidth: "350px", px: "1.5rem", py: "0.8rem" }}
        >
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton
              onClick={closeHandler}
              size="small"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <CloseIcon sx={{ fontSize: "0.8rem" }} />
            </IconButton>
          </Box>
          <CardContent>
            <Typography textAlign="center" fontSize="1.5rem">
              Share Location
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1.5}
              mt="0.7rem"
            >
              <WhatsAppIcon sx={{ color: "#00E676" }} />
              <TelegramIcon sx={{ color: "#40B3E0" }} />
              <FacebookIcon sx={{ color: "blue" }} />
            </Box>
            <Box px="1rem" mt="2rem">
              <OutlinedInput
                onClick={clickHandler}
                size="small"
                value={link}
                fullWidth
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <ContentPasteIcon sx={{ fontSize: "1.2rem" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            {isClicked && (
              <Box
                mt="0.8rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Typography textAlign="center">
                  Link copied to clipboard
                </Typography>
                <DoneIcon />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </AnimatePresence>
  );
};

export default ShareLocation;
