import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(title, description, image);
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title,
        description,
        image,
        user: id,
      });
      console.log(data);

      if (data.success) {
        console.log("Blog created successfully:", data);
        // Optionally, reset the form fields
        setTitle("");
        setDescription("");
        setImage("");
        navigate("/my-blogs");
        toast.success("Blog has been successfully Created");
      } else {
        setError("Failed to create the blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("An error occurred while creating the blog");
      toast.error("Failed to create a blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        marginTop="40px"
      >
        Create a New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={isSmallScreen ? 3 : 4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="imageUrl"
          label="Image URL"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
