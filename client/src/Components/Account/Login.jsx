import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginRegister.css";

const Register = () => {

  const history=useNavigate();



  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
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

    const { email, password } = inpVal;

    if (email === "") {
      alert("please Enter Email");
    } else if (!email.includes("@")) {
      alert("Invalid Eamil Address");
    } else if (password === "") {
      alert("Password is required");
    } else if (password.length < 6) {
      alert("Minimum 6 characters are allowed for Password.");
    } else {
      console.log("login");

      const data = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 204) {
        alert("Email not found");
      }

      if (res.status === 205) {
        alert("Password not matched");
      }

      if (res.status === 203) {
        localStorage.setItem("userDataToken", res.result.token);
        history("/home");
        // alert("Login Successfully");
        setInpVal({
          ...inpVal,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1 className="btn btn-danger"> Welcome to Login</h1>
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
          <button onClick={registerUser} className="btn btn-primary">
            Login
          </button>
        </div>
        <br />
        <div className="form">
          <p>
            Your Already Account? <NavLink to={"/"}>Register</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
