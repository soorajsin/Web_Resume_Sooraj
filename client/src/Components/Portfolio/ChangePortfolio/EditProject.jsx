import React, { useState } from "react";
import "./EditProject.css";
import { useNavigate } from "react-router-dom";

const EditProject = () => {
  const history = useNavigate();

  const [project, setProject] = useState([
    {
      url: "",
      projectURL: "",
      name: "",
      technology: "",
      description: "",
    },
  ]);

  const addProject = async () => {
    const newForm = {
      url: "",
      projectURL: "",
      name: "",
      technology: "",
      description: "",
    };
    setProject([...project, newForm]);
  };
  console.log(project);

  const saveProject = async () => {
    const emptyField = project.some(
      (form) =>
        form.url === "" ||
        form.projectURL === "" ||
        form.name === "" ||
        form.technology === "" ||
        form.description === ""
    );

    if (emptyField) {
      alert("Please Enter all fields");
    } else {
      console.log("save Project");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch("http://localhost:4000/editProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ project }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        history("/portfolio");
      } else {
        console.log("project not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="editProject">
        <div className="edit">
          <h1>Welcome to Edit Project</h1>
          <br />
          {project.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="url">Project Image URL</label>
                <br />
                <input
                  type="url"
                  placeholder="Enter your project img url..."
                  value={subForm.url}
                  onChange={(e) => {
                    const updatedProject = [...project];
                    updatedProject[index].url = e.target.value;
                    setProject(updatedProject);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="projectURL">Project URL</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your project url..."
                  value={subForm.projectURL}
                  onChange={(e) => {
                    const updatedProject = [...project];
                    updatedProject[index].projectURL = e.target.value;
                    setProject(updatedProject);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="name">Project Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your project name..."
                  value={subForm.name}
                  onChange={(e) => {
                    const updatedProject = [...project];
                    updatedProject[index].name = e.target.value;
                    setProject(updatedProject);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="technology">Technology</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your technology used in project..."
                  value={subForm.technology}
                  onChange={(e) => {
                    const updatedProject = [...project];
                    updatedProject[index].technology = e.target.value;
                    setProject(updatedProject);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  placeholder="Enter your project description"
                  value={subForm.description}
                  onChange={(e) => {
                    const updatedProject = [...project];
                    updatedProject[index].description = e.target.value;
                    setProject(updatedProject);
                  }}
                  cols="50"
                  rows="2"
                ></textarea>
              </div>
            </div>
          ))}
          <br />
          <div className="form">
            <button onClick={addProject} className="btn btn-primary">
              Add Project
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveProject} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProject;
