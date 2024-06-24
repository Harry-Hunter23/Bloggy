import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogCard = ({
  title,
  description,
  image,
  time,
  username,
  id,
  isUser,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the blog");
    }
  };

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleShare = () => {
    const shareData = {
      title,
      text: description,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Blog shared successfully"))
        .catch((error) => console.log("Error sharing blog:", error));
    } else {
      toast.error("Share not supported in this browser");
    }
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          width: isSmallScreen ? "100%" : "90%",
          margin: "auto",
          mt: 3,
          padding: isSmallScreen ? 1 : 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          title={username}
          subheader={`By ${username} on ${new Date(time).toLocaleDateString()}`}
        />
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%", // 16:9 aspect ratio
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt="No image posted"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            marginTop={"10px"}
            sx={{ fontSize: isSmallScreen ? "0.8rem" : "1rem" }}
          >
            <b>Title :</b> {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            marginTop={"10px"}
            sx={{ fontSize: isSmallScreen ? "0.8rem" : "1rem" }}
          >
            Description: {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BlogCard;
