import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import SoorajLogo from "./Sooraj-logo.png";

import "./Navbar.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Navbar = () => {
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
      history("/login");
      window.location.reload();
    } else {
      console.log("not removed token");
    }
  };

  const ifUserValid = () => {
    return (
      <>
        <div className="containerNavbar">
          <div className="tab">
            <a href="/home">
              <img src={SoorajLogo} alt="logo" />
            </a>
          </div>
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className="tab">
            <Avatar className="avatar-main">
              {userdata ? (
                userdata.getData.email.charAt(0).toUpperCase()
              ) : (
                <Avatar />
              )}
            </Avatar>
            <div className="avatar-manu">
              {userdata ? (
                userdata && (
                  <div className="avatarManu">
                    <div className="avatarEmail">
                      {userdata ? userdata.getData.email : ""}
                    </div>
                    <div className="avatarEmail">
                      <NavLink to={"/home"} className={"avatarDec"}>Home</NavLink>
                    </div>
                    <div className="avatarEmail">
                      <NavLink to={"/about"}>About</NavLink>
                    </div>
                    <div className="avatarEmail">
                      <NavLink to={"/service"}>Service</NavLink>
                    </div>
                    <div className="avatarEmail">
                      <NavLink to={"/portfolio"}>Portfolio</NavLink>
                    </div>
                    <div className="avatarEmail">
                      <NavLink to={"/contact"}>Contact</NavLink>
                    </div>
                    <div className="avatarEmail" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  </div>
                )
              ) : (
                <div className="avatarManu">
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
        </div>
      </>
    );
  };

  const elseUserValid = () => {
    return (
      <>
        <div className="containerNavbar">
          <div className="tab">
            <a href="/home">
              <img src={SoorajLogo} alt="logo" />
            </a>
          </div>
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
          <div className={"tab"}>
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
            <Avatar className="avatar-main">
              {userdata ? (
                userdata.getData.email.charAt(0).toUpperCase()
              ) : (
                <Avatar />
              )}
            </Avatar>
            <div className="avatar-manu">
              {userdata ? (
                userdata && (
                  <div className="avatarManu">
                    <MenuItem onClick={() => history("/home")} className="item">
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
                  </div>
                )
              ) : (
                <div className="avatarManu">
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
        </div>
      </>
    );
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="navbar">
            {userdata ? ifUserValid() : elseUserValid()}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
