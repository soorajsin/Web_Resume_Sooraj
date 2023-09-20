import React, { useContext, useEffect } from "react";
import "./Portfolio.css";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const Portfolio = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const portfoliofetchdata = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (data.ok) {
      console.log("failed to fetch", data.status);
    }

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("not found user");
      history("*");
    }
  };

  useEffect(() => {
    portfoliofetchdata();
  });

  const deleteProject = async (projectId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/deleteProject", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ projectId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("not delete project");
      history("*");
    }
  };

  const deleteCertificate = async (certificateId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch("http://localhost:4000/deleteCertificate", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ certificateId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("not delete certificate");
      history("*");
    }
  };

  return (
    <>
      <div className="portfolio">
        <div className="project">
          <h1>Project</h1>
          <div className="show">
            {userdata
              ? userdata.getData.project.map((project, index) => (
                  <div key={index} className="data">
                    <a href={project.projectURL}>
                      <img src={project.url} alt={project.name} />
                    </a>
                    <h2>{project.name}</h2>
                    <h3>{project.technology}</h3>
                    <p>{project.description}</p>
                    <div className="deleteIcon">
                      <i
                        onClick={() => deleteProject(project._id, index)}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                ))
              : "Loading"}
          </div>
          <div className="add">
            <div
              className="box"
              onClick={() => {
                history("/editProject");
              }}
            >
              <i className="fa-regular fa-plus"></i>
            </div>
          </div>
        </div>
        <div className="certificate">
          <h1>Certificate</h1>
          <br />
          <div className="show">
            {userdata
              ? userdata.getData.certificate.map((certificate, index) => (
                  <div key={index} className="data">
                    <a href={certificate.certificateLiveURL}>
                      <img
                        src={certificate.certificateIMGURL}
                        alt={certificate.name}
                      />
                    </a>
                    <h3>{certificate.name}</h3>
                    <p>{certificate.description}</p>
                    <div className="deleteIcon">
                      <i
                        onClick={() => {
                          deleteCertificate(certificate._id, index);
                        }}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                ))
              : "Loading"}
          </div>
          <div className="add">
            <div className="box" onClick={() => history("/editCertificate")}>
              <i className="fa-regular fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
