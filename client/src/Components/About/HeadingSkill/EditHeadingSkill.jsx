import React, { useState } from "react";
import "./EditHeadingSkill.css";
import { useNavigate } from "react-router-dom";

const EditHeadingSkill = () => {
  const history = useNavigate();

  const [heading, setHeading] = useState([
    {
      headingSkill: "",
    },
  ]);

  const addHeadingSkill = async () => {
    const newForm = {
      headingSkill: "",
    };
    setHeading([...heading, newForm]);
  };
  console.log(heading);

  const saveHeadingSkill = async () => {
    const emptyFileds = heading.some((form) => form.headingSkill === "");

    if (emptyFileds) {
      alert("Please Enter All Heading Fields....");
    } else {
      const token = await localStorage.getItem("userDataToken");

      const data = await fetch(
        "https://web-resume-sooraj-server.vercel.app/editHeadingSkill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ heading }),
        }
      );

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        //         console.log(res);
        history("/about");
      } else {
        console.log("not added heading");
      }
    }
  };

  return (
    <>
      <div className="heading">
        <div className="main">
          <h1>Welcome to Edit Heading</h1>
          <br />
          {heading.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="headingSkill">Heading Skill</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Heading skill here..."
                  value={subForm.headingSkill}
                  onChange={(e) => {
                    const updatedSkill = [...heading];
                    updatedSkill[index].headingSkill = e.target.value;
                    setHeading(updatedSkill);
                  }}
                />
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addHeadingSkill} className="btn btn-primary">
              Add Heading Skill
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveHeadingSkill} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditHeadingSkill;
