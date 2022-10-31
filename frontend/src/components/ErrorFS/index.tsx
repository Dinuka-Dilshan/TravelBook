import { Box, Typography } from "@mui/material";

interface Props {
  error: string;
}

const ErrorFS: React.FC<Props> = ({ error }) => {
  return (
    <Box
      height={"90vh"}
      width={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography fontSize={"1.3rem"}>😢</Typography>
      <Typography fontSize={"1.3rem"}>{error}!</Typography>
    </Box>
  );
};

export default ErrorFS;
