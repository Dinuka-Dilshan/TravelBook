import CloseIcon from "@mui/icons-material/Close";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  width: string | number;
  size?: string;
  height?: string;
  title?: string;
}

const Modal: React.FC<Props> = ({
  onClose,
  title,
  children,
  width,
  size = "350px",
  height,
}) => {
  const closeHandler = () => {
    onClose();
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={"bold"} fontSize="1.2rem" sx={{ml:'1rem'}}>
              {title}
            </Typography>
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
          <CardContent sx={{ p: 0, width, height }}>{children}</CardContent>
        </Card>
      </Box>
    </AnimatePresence>
  );
};

export default Modal;
