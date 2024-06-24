import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Using a single useState hook to manage the form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Generic handleChange to update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("Please fill up all the fields to register");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (password.length > 12) {
      toast.error("Password must be lesser than 13 characters ");
      return;
    }
    try {
      const response = await axios.post("/api/v1/user/register", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("You have registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"auto"}
          maxWidth={"450px"}
          marginTop={"60px"}
          gap={"10px"}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={"30px"}
          padding={"50px"}
        >
          <Typography variant="h4" textAlign={"center"} padding={"10px"}>
            REGISTER HERE
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter the Username"
            name="username"
            margin={"dense"}
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            placeholder="Enter the Email"
            name="email"
            margin={"dense"}
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            placeholder="Enter the Password"
            name="password"
            margin={"dense"}
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ borderRadius: "10px", marginTop: "10px" }}
          >
            REGISTER
          </Button>
          <Button
            fullWidth
            onClick={() => navigate("/login")}
            color="primary"
            sx={{ borderRadius: "10px", marginTop: "10px" }}
          >
            Already a User? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterPage;
