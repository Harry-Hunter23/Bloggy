import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogsPage from "./pages/BlogsPage";
import MyBlogs from "./pages/MyBlogs";
// import NotFoundPage from "./pages/NotFoundPage";
import CreateBlogsPage from "./pages/CreateBlogsPage";
import BlogDetailEdit from "./pages/BlogDetailEdit";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<BlogsPage />} /> {/* Default Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetailEdit />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> 404 Route */}
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/create-blogs" element={<CreateBlogsPage />} />
      </Routes>
    </>
  );
}

export default App;
