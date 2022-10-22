import { Card, CardContent, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Modal = ({ onClose, children, width ,size='350px'}) => {
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
          sx={{ minWidth: size, px: "1rem", py: "0.8rem" }}
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
          <CardContent sx={{ p: 0, width }}>{children}</CardContent>
        </Card>
      </Box>
    </AnimatePresence>
  );
};

export default Modal;
