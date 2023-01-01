import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
        <Typography fontSize="32px" fontWeight="bold" color="primary">
          SocialPedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}>
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem",
          }}>
          Welcome to Socialpedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
