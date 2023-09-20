import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./LoginRegister.css";

const Register = () => {
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpVal;

    if (name === "") {
      alert("Please enter your Name");
    } else if (email === "") {
      alert("please Enter Email");
    } else if (!email.includes("@")) {
      alert("Invalid Eamil Address");
    } else if (password === "") {
      alert("Password is required");
    } else if (password.length < 6) {
      alert("Minimum 6 characters are allowed for Password.");
    } else if (cpassword === "") {
      alert("Confirm Your Password.");
    } else if (cpassword.length < 6) {
      alert("Minimum 6 Characters Allowed For Confirmation of Password");
    } else if (password !== cpassword) {
      alert("Passwords do not match!");
    } else {
      console.log("register");

      const data = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cpassword }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        alert("User Already Exist");
      }

      if (res.status === 202) {
        alert("Registered Successfully");
        setInpVal({
          ...inpVal,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1 className="btn btn-danger">Welcome to Register</h1>
        <br />
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={inpVal.name}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={inpVal.email}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={inpVal.password}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="cpassword"
            value={inpVal.cpassword}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <button onClick={registerUser} className="btn btn-primary">
            Register
          </button>
        </div>
        <br />
        <div className="form">
          <p>
            Your Already Account? <NavLink to={"/login"}>Login</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
