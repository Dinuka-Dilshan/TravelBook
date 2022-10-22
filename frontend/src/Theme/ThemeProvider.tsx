import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

interface Props {
  children: React.ReactNode;
}

const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
