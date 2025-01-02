// src/components/Login.js
import * as React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TemplateFrame from "../sign-up/TemplateFrame";
import { CssBaseline } from "@mui/material";
import backgroundImage from "../images/Image19.jpg";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background

  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  backgroundImage: `url(${backgroundImage})`, // Add your image path here
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const StyledButton = styled(Button)({
  backgroundColor: "#4CAF50", // Custom button color
  color: "#fff",
  "&:hover": {
    backgroundColor: "#45a049", // Custom hover color
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("light"); // Define mode state
  const [showCustomTheme, setShowCustomTheme] = useState(true); // Define showCustomTheme state

  const navigate = useNavigate();

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const onButtonClick = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <TemplateFrame
      mode={mode}
      showCustomTheme={showCustomTheme}
      toggleColorMode={toggleColorMode}
      toggleCustomTheme={toggleCustomTheme}
    >
      <ThemeProvider theme={createTheme()}>
        <CssBaseline enableColorScheme />
        <LoginContainer>
          <Card variant="outlined">
            {/* Optional logo image */}
            {/* <img src="/images/image1.jpg" alt="Logo" /> */}

            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: "center",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
              }}
            >
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email"
                placeholder="Enter your email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error && "Invalid email or password"}
              />
              <TextField
                label="Password"
                placeholder="Enter your password"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
              />
              <StyledButton
                variant="contained"
                fullWidth
                onClick={onButtonClick}
              >
                Log in
              </StyledButton>
              <Typography sx={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        </LoginContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
};

export default Login;
