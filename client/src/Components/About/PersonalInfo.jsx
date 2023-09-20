import React, { useState } from "react";
import "./PersonalInfo.css";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const history = useNavigate();

  const [inpVal, setInpVal] = useState({
    birthday: "",
    age: "",
    email: "",
    course: "",
    phone: "",
    city: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const personalInfoValue = async (e) => {
    e.preventDefault();

    const { birthday, age, email, course, phone, city } = inpVal;

    if (birthday === "") {
      alert("Please enter your Birthday");
    } else if (age === "") {
      alert("please enter your Age");
    } else if (email === "") {
      alert("please enter your Email");
    } else if (!email.includes("@")) {
      alert("Invalid E-mail Address");
    } else if (course === "") {
      alert("please select Course");
    } else if (phone === "") {
      alert("please Enter Phone Number");
    } else if (phone.length < 10) {
      alert("Phone number should be 10 digits long.");
    } else if (city === "") {
      alert("Enter City Name.");
    } else {
      console.log("personal");

      const token = await localStorage.getItem("userDataToken");

      const data = await fetch("http://localhost:4000/personalInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          birthday,
          age,
          email,
          course,
          phone,
          city,
        }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        alert("Personal Info Updated Successfully");
        history("/about");
      } else {
        console.log("Personal Info not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="personalInfo" style={{ marginTop: "100px" }}>
        <h1 className="btn btn-danger">Welcome to Personal Information</h1>
        <br />
        <div className="form">
          <label htmlFor="birthday">Brithday</label>
          <br />
          <input
            type="date"
            name="birthday"
            value={inpVal.birthday}
            onChange={setVal}
            placeholder="Enter your Birthday"
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="age">Age</label>
          <br />
          <input
            type="age"
            name="age"
            value={inpVal.age}
            onChange={setVal}
            placeholder="Enter your Age"
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
            placeholder="Enter your email"
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="course">Course</label>
          <br />
          <input
            type="text"
            name="course"
            value={inpVal.course}
            onChange={setVal}
            placeholder="Enter your Course"
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="phone">Phone No.</label>
          <br />
          <input
            type="phone"
            name="phone"
            value={inpVal.phone}
            onChange={setVal}
            placeholder="Enter your phone number"
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="city">City</label>
          <br />
          <input
            type="text"
            name="city"
            value={inpVal.city}
            onChange={setVal}
            placeholder="Enter your city"
          />
        </div>
        <br />
        <div className="form">
          <button onClick={personalInfoValue} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
