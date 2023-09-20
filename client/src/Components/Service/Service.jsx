import React, { useEffect } from "react";
import "./Service.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextNavigate } from "../ContextProvider/Context";

const Service = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const serviceFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // if (!data.ok) {
    //   // Handle non-successful response (e.g., status code other than 200)
    //   throw new Error(`Request failed with status: ${data.status}`);
    // }

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("Not fetch data");
      history("*");
    }
  };

  useEffect(() => {
    serviceFetchData();
  });

  const deleteService = async (serviceId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/deleteService", {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: token },
      body: JSON.stringify({ serviceId }),
    });

    if (data.ok) {
      console.log("Failed to fetch", data.status);
    }

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      alert("Are you Sure");
      console.log(res);
    } else {
      console.log("not delete service");
      // history("*");
    }
  };

  return (
    <>
      <div className="service">
        <div className="show"></div>
        <div className="show">
          {userdata
            ? userdata.getData.service.map((service, index) => (
                <div key={index} className="data">
                  <img src={service.url} alt={service.name} />
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="deleteIcon">
                    <i
                      onClick={() => deleteService(service._id, index)}
                      className="fa-sharp fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
        <div className="edit">
          <div className="box" onClick={() => history("/editService")}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
