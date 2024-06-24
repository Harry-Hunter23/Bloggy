import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme, useMediaQuery } from "@mui/material";

const Header = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success("Logout Successfully");
    navigate("/blogs");
    localStorage.clear();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blogger
      </Typography>
      <List>
        {isLogin ? (
          <>
            <ListItem button component={Link} to="/blogs">
              <ListItemText primary="Blogs" />
            </ListItem>
            <ListItem button component={Link} to="/my-blogs">
              <ListItemText primary="My Blogs" />
            </ListItem>
            <ListItem button component={Link} to="/create-blogs">
              <ListItemText primary="Create Blogs" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/blogs">
              <ListItemText primary="See Blogs" />
            </ListItem>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Blogger
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            {isLogin ? (
              <>
                <Box display="flex" marginLeft="auto" marginRight="auto">
                  <Tabs
                    textColor="inherit"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                  >
                    <Tab label="Blogs" component={Link} to="/blogs" />
                    <Tab label="My Blogs" component={Link} to="/my-blogs" />
                    <Tab
                      label="Create Blogs"
                      component={Link}
                      to="/create-blogs"
                    />
                  </Tabs>
                </Box>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Box marginLeft="auto">
                <Tab label="See Blogs" component={Link} to="/blogs" />
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
