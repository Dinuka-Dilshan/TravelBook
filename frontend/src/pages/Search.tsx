import { Box } from "@mui/system";
import useHelmet from "../hooks/useHelmet";

const Search = () => {
  useHelmet((title) => `${title} | Search`);
  return <Box></Box>;
};

export default Search;
