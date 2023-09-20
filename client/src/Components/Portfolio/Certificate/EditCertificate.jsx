import React, { useState } from "react";
import "./EditCertificate.css";
import { useNavigate } from "react-router-dom";

const EditCertificate = () => {
  const history = useNavigate();

  const [certificate, setCertificate] = useState([
    {
      certificateIMGURL: "",
      certificateLiveURL: "",
      name: "",
      description: "",
    },
  ]);

  const addCertificate = async () => {
    const newForm = {
      certificateIMGURL: "",
      certificateLiveURL: "",
      name: "",
      description: "",
    };
    setCertificate([...certificate, newForm]);
  };
  console.log(certificate);

  const saveCertificate = async () => {
    const emptyFields = certificate.some(
      (form) =>
        form.certificateIMGURL === "" ||
        form.certificateLiveURL === "" ||
        form.name === "" ||
        form.description === ""
    );

    if (emptyFields) {
      alert("Please Enter All Fields");
    } else {
      console.log("certificate");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch("http://localhost:4000/editCertificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ certificate }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        history("/portfolio");
      } else {
        console.log("certificate not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="certificate">
        <div className="edit">
          <h1>Welcome to Edit Certificate</h1>
          <br />
          {certificate.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="certificateIMGURL">Certificate Image URL</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your certificate img..."
                  value={subForm.certificateIMGURL}
                  onChange={(e) => {
                    const updatedCertificate = [...certificate];
                    updatedCertificate[index].certificateIMGURL =
                      e.target.value;
                    setCertificate(updatedCertificate);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="certificateLiveURL">Certificate URL</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your certificate url..."
                  value={subForm.certificateLiveURL}
                  onChange={(e) => {
                    const updatedCertificate = [...certificate];
                    updatedCertificate[index].certificateLiveURL =
                      e.target.value;
                    setCertificate(updatedCertificate);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your certificate name..."
                  value={subForm.name}
                  onChange={(e) => {
                    const updatedCertificate = [...certificate];
                    updatedCertificate[index].name = e.target.value;
                    setCertificate(updatedCertificate);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  placeholder="Enter your description"
                  cols="50"
                  rows="2"
                  value={subForm.description}
                  onChange={(e) => {
                    const updatedCertificate = [...certificate];
                    updatedCertificate[index].description = e.target.value;
                    setCertificate(updatedCertificate);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
          <br />
          <div className="form">
            <button onClick={addCertificate} className="btn btn-primary">
              Add Certificate
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveCertificate} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCertificate;
