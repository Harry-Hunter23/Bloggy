import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";

const BlogDetailEdit = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams(); // use destructuring to get the id from useParams
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // get blog detail
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data.success) {
        setBlog(data?.blog);
        setTitle(data?.blog.title);
        setDescription(data?.blog.description);
        setImage(data?.blog.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(title, description, image);
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title,
        description,
        image,
        user: id,
      });
      console.log(data);

      if (data.success) {
        console.log("Blog updated successsfully:", data);
        // Optionally, reset the form fields
        setTitle("");
        setDescription("");
        setImage("");
        toast.success("Blog has beem Updated");
        navigate("/my-blogs");
      } else {
        setError("Failed to Update the blog");
        toast.success("failed to update the blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("An error occurred while creating the blog");
      toast.success("failed to update the blog");
    } finally {
      setLoading(false);
    }
  };

  console.log(blog);

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={"center"}
          marginTop={"40px"}
        >
          Update the Created Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
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
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="imageUrl"
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
            color="warning"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Updating" : "Update the  Blog"}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BlogDetailEdit;
