import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: { [key: string]: string };
  }
  interface PaletteOptions {
    custom: { [key: string]: string };
  }
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "0.3rem",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1877F2",
      light: "#F3F9FF",
    },
    custom: {
      gray: "#E8E9EB",
      lightGray: "#F6F6F6",
      fontGray: "#545454",
      darkBlue: "#104CBE",
      red: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-seri",
    fontSize: 12,
  },
});

export default theme;
