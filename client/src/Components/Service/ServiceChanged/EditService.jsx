import React, { useState } from "react";
import "./EditService.css";
import { useNavigate } from "react-router-dom";

const EditService = () => {
  const history = useNavigate();

  const [service, setService] = useState([
    {
      url: "",
      name: "",
      description: "",
    },
  ]);

  const addService = () => {
    const newForm = {
      url: "",
      name: "",
      description: "",
    };
    setService([...service, newForm]);
  };
  console.log(service);

  const saveServiceData = async () => {
    const emptyField = service.some(
      (form) => form.url === "" || form.name === "" || form.description === ""
    );

    if (emptyField) {
      alert("Please fill all fields");
    } else {
      const token = await localStorage.getItem("userDataToken");
      //     console.log(token);

      const data = await fetch("http://localhost:4000/editService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ service }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        history("/service");
      } else {
        console.log("not add service");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="editService">
        <h1>Edit Service</h1>
        <br />
        {service.map((subForm, index) => (
          <div key={index}>
            <div className="form">
              <label htmlFor="url">URL</label>
              <br />
              <input
                type="url"
                name="url"
                placeholder="Enter your service url"
                value={subForm.url}
                onChange={(e) => {
                  const updatedForm = [...service];
                  updatedForm[index].url = e.target.value;
                  setService(updatedForm);
                }}
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your service name"
                value={subForm.name}
                onChange={(e) => {
                  const updatedForm = [...service];
                  updatedForm[index].name = e.target.value;
                  setService(updatedForm);
                }}
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="describtion">Describtion</label>
              <br />
              <textarea
                placeholder="Enter your service describtion"
                rows={2}
                cols={50}
                value={subForm.description}
                onChange={(e) => {
                  const updatedForm = [...service];
                  updatedForm[index].description = e.target.value;
                  setService(updatedForm);
                }}
              />
            </div>
          </div>
        ))}
        <br />
        <div className="form">
          <button onClick={addService} className="btn btn-primary">
            Add Service
          </button>
        </div>
        <br />
      </div>
      <div className="saveService">
        <button onClick={saveServiceData} className="btn btn-success">
          Save
        </button>
      </div>
    </>
  );
};

export default EditService;
