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
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using a single useState hook to manage the form state
  const [formData, setFormData] = useState({
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

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill up all the fields to Login");
      return;
    }

    try {
      const response = await axios.post("/api/v1/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.user._id);
        dispatch(authActions.login());
        toast.success("You have Logged in successfully");
        navigate("/blogs");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Invaid Credentials");
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
            LOGIN HERE
          </Typography>

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
            LOGIN
          </Button>
          <Button
            fullWidth
            onClick={() => navigate("/register")}
            color="primary"
            sx={{ borderRadius: "10px", marginTop: "10px" }}
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginPage;
