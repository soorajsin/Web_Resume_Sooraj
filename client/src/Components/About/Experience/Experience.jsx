import React, { useState } from "react";
import "./Experience.css";
import { useNavigate } from "react-router-dom";

const Experience = () => {
  const history = useNavigate();

  const [experienceForms, setExperienceForm] = useState([
    {
      duration: "",
      department: "",
      describtion: "",
    },
  ]);

  const addExperienceForm = () => {
    const newForm = {
      duration: "",
      department: "",
      describtion: "",
    };
    setExperienceForm([...experienceForms, newForm]);
  };
  console.log(experienceForms);

  const saveExperienceData = async () => {
    const emptyField = experienceForms.some(
      (form) =>
        form.duration === "" ||
        form.department === "" ||
        form.description === ""
    );

    if (emptyField) {
      alert("Please fill all fields");
    } else {
      console.log("experience");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch("http://localhost:4000/editExperience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ experienceForms }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        history("/about");
      } else {
        console.log("not add experience");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="experience">
        <h1>Welcome to Experience </h1>
        <br />
        {experienceForms.map((subform, index) => (
          <div className="subform" key={index}>
            <div className="form">
              <label htmlFor="duration">Duration</label>
              <br />
              <input
                type="text"
                value={subform.duration}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].duration = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your duration experience"
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="department">Department</label>
              <br />
              <input
                type="text"
                value={subform.department}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].department = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your department"
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="describtion">Describtion</label>
              <br />
              <textarea
                value={subform.description}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].description = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your describtion"
                cols="50"
                rows="2"
              ></textarea>
            </div>
          </div>
        ))}
        <div className="form">
          <button onClick={addExperienceForm} className="btn btn-danger">
            Add Experience
          </button>
        </div>
      </div>
      <div className="saveExperinece">
        <button onClick={saveExperienceData} className="btn btn-success">
          Save
        </button>
      </div>
    </>
  );
};

export default Experience;
