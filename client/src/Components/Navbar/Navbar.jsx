import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

import "./Navbar.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");

  const history = useNavigate();
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const avatarForFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/validUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
        },
      }
    );

    try {
      if (data.ok) {
        // console.log("data is ok  ");
      } else {
        console.log("data is not ok   " + data.ok);
      }
    } catch (error) {
      console.log("Navbar Fetch error" + error);
    }

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

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/signOutToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      localStorage.removeItem("userDataToken");
      // history("/login");
      history("/login");
    } else {
      console.log("not removed token");
    }
  };

  return (
    <>
      <div className="navbar">
        <AppBar className="appbar">
          <Toolbar>
            <div className="containerNavbar">
              <div className="tab">
                <a href="/home">S</a>
              </div>
              <div
                className={`tab ${activeTab === "home" ? "active" : ""}`}
                onClick={() => setActiveTab("home")}
              >
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
              </div>
              <div
                className={`tab ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
              >
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
              </div>
              <div
                className={`tab ${activeTab === "service" ? "active" : ""}`}
                onClick={() => setActiveTab("service")}
              >
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
              </div>
              <div
                className={`tab ${activeTab === "portfolio" ? "active" : ""}`}
                onClick={() => setActiveTab("portfolio")}
              >
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
              </div>
              <div
                className={`tab ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => setActiveTab("contact")}
              >
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
              </div>
              <div
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
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
                    <div
                      id="manu"
                      className="loginAvatarManu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => history("/home")}
                        className="item"
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        onClick={() => history("/about")}
                        className="item"
                      >
                        About
                      </MenuItem>
                      <MenuItem
                        onClick={() => history("/service")}
                        className="item"
                      >
                        Service
                      </MenuItem>
                      <MenuItem
                        onClick={() => history("/portfolio")}
                        className="item"
                      >
                        Portfolio
                      </MenuItem>
                      <MenuItem
                        onClick={() => history("/contact")}
                        className="item"
                      >
                        Contact
                      </MenuItem>
                      <MenuItem onClick={handleSignOut} className="item">
                        Sign Out
                      </MenuItem>
                    </div>
                  )
                ) : (
                  <div
                    className="avatarManu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => history("/contact")}
                      className="item"
                    >
                      Contact
                    </MenuItem>
                  </div>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
