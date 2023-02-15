import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./index.css";

interface Props {
  styles?: React.CSSProperties;
}
const Loader: React.FC<Props> = ({ styles }) => {
  return (
    <Box style={styles}>
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

export default Loader;
