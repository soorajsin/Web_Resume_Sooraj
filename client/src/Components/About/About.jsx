import React, { useContext, useEffect } from "react";
import "./About.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const About = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const history = useNavigate();

  const aboutFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/validUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (data.ok) {
      console.log("fetch request failed: ", data.status, data.statusText);
    }

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
      // history("/about");
    } else {
      console.log("user not found with data");
      history("*");
    }
  };

  useEffect(() => {
    aboutFetchData();
  });

  const deleteEducation = async (educationId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteEducationOne",
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ educationId }),
      }
    );

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      alert("Are you sure ");
      console.log(res);
    } else {
      console.log("education detail not delete");
    }
  };

  //delete experience
  const deleteExperience = async (experienceId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteExperience",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ experienceId }),
      }
    );

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
      alert("Are you Sure");
    } else {
      console.log("Experience not deleted");
    }
  };

  const deleteHeading = async (headingId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteHeading",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ headingId }),
      }
    );

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      console.log("done");
    } else {
      console.log("not delete");
    }
  };

  const deleteParagraph = async (editParagraphId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteParagraphAbout",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ editParagraphId }),
      }
    );

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("not delete pargraph");
    }
  };

  const deleteSkillData = async (skillId) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteskill",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ skillId }),
      }
    );
    //     console.log(data);
    const res = await data.json();
    //     console.log(res);

    if (res.status === 200) {
      // console.log(res);
      // history("/about");
    } else {
      // Handle errors, e.g., skill not found or server error
      console.error("Failed to delete skill");
      history("*");
    }
  };

  return (
    <>
      <div className="about">
        <div className="container">
          <div className="left">
            <h3>
              I'm <span>{userdata ? userdata.getData.name : "Loading"}</span>{" "}
              and{" "}
              <span className="show">
                {userdata
                  ? userdata.getData.Heading.map((heading, index) => (
                      <div key={index} className="showData">
                        {index > 0 && <br />}
                        <div className="data">
                          {heading.headingSkill}
                          <div className="delete">
                            <i
                              onClick={() => deleteHeading(heading._id, index)}
                              className="fa-sharp fa-solid fa-trash"
                            ></i>
                          </div>
                        </div>
                      </div>
                    ))
                  : "Loading"}
              </span>
            </h3>
            <div className="editHeading">
              <button
                onClick={() => history("/editHeadingSkill")}
                // className="btn btn-primary"
              >
                Add Heading Skill
              </button>
            </div>
            <div className="paragraphAbout">
              <div className="show">
                {userdata
                  ? userdata.getData.editPararaph.map(
                      (editParagraph, index) => (
                        <div key={index}>
                          {index > 0 && <br />}
                          <div className="data">
                            {editParagraph.paragraph}
                            <div className="delete">
                              <i
                                onClick={() =>
                                  deleteParagraph(editParagraph._id, index)
                                }
                                className="fa-sharp fa-solid fa-trash"
                              ></i>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : "Loading"}
              </div>
              <div className="edit">
                <button onClick={() => history("/editParagraphAbout")}>
                  Add Paragraph
                </button>
              </div>
            </div>
          </div>

          <div className="personalInfo">
            <div className="showInfo">
              {userdata &&
              userdata.getData &&
              userdata.getData.personalInfo &&
              userdata.getData.personalInfo[0] ? (
                <div className="showInfo-data">
                  <p>Birthday: {userdata.getData.personalInfo[0].birthday}</p>
                  <p>Age: {userdata.getData.personalInfo[0].age}</p>
                  <p>Email: {userdata.getData.personalInfo[0].email}</p>
                  <p>Course: {userdata.getData.personalInfo[0].course}</p>
                  <p>Phone: {userdata.getData.personalInfo[0].phone}</p>
                  <p>City: {userdata.getData.personalInfo[0].city}</p>
                </div>
              ) : (
                "Loading"
              )}
            </div>
            <div className="editInfo">
              <button onClick={() => history("/personalInfo")}>
                Edit Personal Information
              </button>
            </div>
          </div>

          <div className="right">
            <div className="skill">
              <div className="showSkill">
                {userdata
                  ? userdata.getData.skills.map((skill, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}{" "}
                        {/* Add line break if index > 0 */}
                        <div className="skillCSSHandle">
                          <div className="handle">
                            {skill}{" "}
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteSkillData(skill)}
                            ></i>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                  : "Loading"}
              </div>
              <div className="addSkill">
                <button>
                  <NavLink to={"/skill"} className={"addskillButton"}>
                    Add Skill
                  </NavLink>
                </button>
              </div>
            </div>
          </div>

          <div className="education">
            <div className="education-part">
              <div className="show-education">
                {userdata
                  ? userdata.getData.education.map((education, index) => (
                      <div key={index} className="education-data">
                        <p>Duration: {education.duration}</p>
                        <p>Course: {education.course}</p>
                        <p>Description: {education.description}</p>
                        <div className="deleteIcon">
                          <i
                            onClick={() =>
                              deleteEducation(education._id, index)
                            }
                            className="fa-sharp fa-solid fa-trash"
                          ></i>
                        </div>
                      </div>
                    ))
                  : "Loading"}
              </div>
              <div className="edit-education">
                <button onClick={() => history("/editEducation")}>
                  Edit Education
                </button>
              </div>
            </div>
          </div>
          
          <div className="experience">
            <div className="experience-content">
              <div className="show-experience">
                {userdata
                  ? userdata.getData.experience.map((experience, index) => (
                      <div key={index} className="show-data">
                        <p>Duration: {experience.duration}</p>
                        <p>Department: {experience.department}</p>
                        <p>Describtion: {experience.description}</p>
                        <div className="icon">
                          <i
                            onClick={() =>
                              deleteExperience(experience._id, index)
                            }
                            className="fa-sharp fa-solid fa-trash"
                          ></i>
                        </div>
                      </div>
                    ))
                  : "Loading"}
              </div>
              <div className="edit-experience">
                <button onClick={() => history("/editExperience")}>
                  Edit Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
