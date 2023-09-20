import React, { useState } from "react";
import "./EditEducation.css";
import { useNavigate } from "react-router-dom";

const EditEducation = () => {
  const history = useNavigate();

  const [educationForms, setEducationForms] = useState([
    {
      duration: "",
      course: "",
      description: "",
    },
  ]);

  const addEducationForm = () => {
    // Create a new education form object and add it to the list
    const newForm = {
      duration: "",
      course: "",
      description: "",
    };
    setEducationForms([...educationForms, newForm]);
  };
  console.log(educationForms);

  const saveEducationData = async () => {
    const hasEmptyFields = educationForms.some(
      (form) =>
        form.duration === "" || form.course === "" || form.description === ""
    );

    if (hasEmptyFields) {
      alert("Please fill out all fields in the education forms.");
    } else {
      console.log("education");

      const token = await localStorage.getItem("userDataToken");

      const data = await fetch("http://localhost:4000/editEducation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ educationForms }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        alert("You have successfully updated your Education");
        history("/about");
      } else {
        console.log("Education not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="education">
        <h1 className="btn btn-danger">Welcome to Education </h1>
        <br />
        <div className="form">
          {educationForms.map((form, index) => (
            <div className="form" key={index}>
              <div className="sub-form">
                <label htmlFor="time">Duration</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your education duration"
                  value={form.duration}
                  onChange={(e) => {
                    // Update the duration field in the corresponding form
                    const updatedForms = [...educationForms];
                    updatedForms[index].duration = e.target.value;
                    setEducationForms(updatedForms);
                  }}
                />
              </div>
              <br />
              <div className="sub-form">
                <label htmlFor="course">Course</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your course"
                  value={form.course}
                  onChange={(e) => {
                    // Update the course field in the corresponding form
                    const updatedForms = [...educationForms];
                    updatedForms[index].course = e.target.value;
                    setEducationForms(updatedForms);
                  }}
                />
              </div>
              <br />
              <div className="sub-form">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  placeholder="Enter your education detail"
                  cols="50"
                  rows="2"
                  value={form.description}
                  onChange={(e) => {
                    // Update the description field in the corresponding form
                    const updatedForms = [...educationForms];
                    updatedForms[index].description = e.target.value;
                    setEducationForms(updatedForms);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        <div className="form">
          <button onClick={addEducationForm} className="btn btn-primary">
            Add Education Form
          </button>
        </div>
      </div>
      <div className="save">
        <button onClick={saveEducationData} className=" btn btn-success">
          Save
        </button>
      </div>
    </>
  );
};

export default EditEducation;
