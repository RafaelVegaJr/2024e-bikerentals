import * as React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
// import ToggleColorMode from "./ToggleColorMode";
import getSignUpTheme from "./theme/getSignUpTheme";

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  // const handleChange = (event) => {
  //   toggleCustomTheme(event.target.value === "custom");
  // };
  const signUpTheme = createTheme(getSignUpTheme(mode));

  return (
    <ThemeProvider theme={signUpTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        {/* <Box sx={{ display: "flex", gap: 1 }}>
          <FormControl variant="outlined" sx={{ minWidth: 180 }}>
            <Select
              size="small"
              labelId="theme-select-label"
              id="theme-select"
              value={showCustomTheme ? "custom" : "material"}
              onChange={handleChange}
              label="Design Language"
            >
              <MenuItem value="custom">Custom Theme</MenuItem>
              <MenuItem value="material">Material Design 2</MenuItem>
            </Select>
          </FormControl>
          <ToggleColorMode
            data-screenshot="toggle-mode"
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        </Box> */}

        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
