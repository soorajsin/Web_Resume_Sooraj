import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./Navbar.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Navbar = () => {
  const history = useNavigate();
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const avatarForFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
    }
  };

  useEffect(() => {
    avatarForFetchData();
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/signOutToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      localStorage.removeItem("userDataToken");
      history("/login");
    } else {
      console.log("not removed token");
    }
  };

  return (
    <>
      <div className="navbar">
        <AppBar>
          <Toolbar>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/home"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Home
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/about"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  About
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/service"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Service
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/portfolio"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Portfolio
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/contact"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Contact
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/login"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Login
                </NavLink>
              </button>
            </div>
            <div className="avatar">
              <Avatar className="avatar-main" onClick={handleAvatarClick}>
                {userdata ? (
                  userdata.getData.email.charAt(0).toUpperCase()
                ) : (
                  <Avatar />
                )}
              </Avatar>
              {userdata ? (
                userdata && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => history("/home")}>Home</MenuItem>
                    <MenuItem onClick={() => history("/about")}>About</MenuItem>
                    <MenuItem onClick={() => history("/service")}>
                      Service
                    </MenuItem>
                    <MenuItem onClick={() => history("/portfolio")}>
                      Portfolio
                    </MenuItem>
                    <MenuItem onClick={() => history("/contact")}>
                      Contact
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  </Menu>
                )
              ) : (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history("/home")}>Home</MenuItem>
                  <MenuItem onClick={() => history("/contact")}>
                    Contact
                  </MenuItem>
                </Menu>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
