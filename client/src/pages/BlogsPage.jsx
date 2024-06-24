import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //getting all the blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs");
      if (data && data.success) {
        console.log("Blogs Data:", data.blogs); // Log the blogs data
        setBlogs(data.blogs);
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id} // assuming _id is the unique identifier
            id={blog._id} // pass the id prop here
            isUser={
              blog.user && blog.user._id
                ? localStorage.getItem("userId") === blog.user._id
                : false
            }
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username || "Anonymous"}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div>No blogs available.</div>
      )}
    </>
  );
};

export default BlogsPage;
