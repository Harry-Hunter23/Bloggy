import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserBlogs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No userId found in local storage");
        return;
      }

      const response = await axios.get(`/api/v1/blog/user-blog/${userId}`);

      if (response.data.success) {
        setBlogs(response.data.userBlog.blogs);
      } else {
        console.error("No blogs found for this user");
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            // assuming _id is the unique identifier
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username || "Anonymous"}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          You have not created any Posts
        </h1>
      )}
    </div>
  );
};

export default MyBlogs;
