import React, { useState } from "react";
import "./Skill.css";
import { useNavigate } from "react-router-dom";

const Skill = () => {
  const history = useNavigate();

  const [skills, setSkills] = useState([""]);

  const addSkillInput = () => {
    setSkills([...skills, ""]);
  };
  console.log(skills);

  const handleSkillChange = (index, value) => {
    const updatedSKill = [...skills];
    updatedSKill[index] = value;
    setSkills(updatedSKill);
  };

  //getToken
  const token = localStorage.getItem("userDataToken");
  //       console.log(token);

  const saveAllSkillInDatabase = async () => {
    if (skills.some((skill) => skill.trim() === "")) {
      alert("Plz Skill is required");
    } else {
      console.log("done");

      const removeEmpty = {
        skills: skills.filter((skill) => skill.trim() !== ""), // Remove empty skills
      };

      const data = await fetch("http://localhost:4000/skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(removeEmpty),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 202) {
        //         console.log(res);
        history("/about");
        // alert("Your Skill Successfully in Database...");
      } else {
        console.log("data not found");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="skill">
        <h1 className="text-center text-danger">Welcome to Skill</h1>
        <div className="form">
          {skills.map((skill, index) => (
            <div className="inp" key={index}>
              <input
                style={{
                  borderRadius: "10px",
                  height: "45px",
                  paddingLeft: "10px",
                  width: "300px",
                  fontSize: "26px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="Enter Skill here..."
              />
            </div>
          ))}
          <div className="add">
            <button
              onClick={addSkillInput}
              className="btn btn-primary"
              style={{ width: "300px", fontSize: "26px" }}
            >
              Add Skill
            </button>
          </div>
        </div>
        <div className="saveSkill ">
          <div className="text-center">
            <button
              onClick={saveAllSkillInDatabase}
              className="btn btn-success"
            >
              Save Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
