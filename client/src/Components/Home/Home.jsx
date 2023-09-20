import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Home = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata.getData);

  const history = useNavigate();

  const HomeFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
      // history("/home");
    } else {
      console.log("userData not found");
      history("*");
    }
  };

  useEffect(() => {
    HomeFetchData();
  });

  const deletePhoto = async (photoId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch("http://localhost:4000/deletePhoto", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ photoId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("not delete photot");
      history("*");
    }
  };

  return (
    <>
      <div className="home">
        <div className="tag">
          <h3>
            Hello, My name is{" "}
            <span>{userdata ? userdata.getData.name : "Loading"}</span>
          </h3>
        </div>
        <div className="tag">
          <p>I'm a website design, graphic design, and many more...</p>
        </div>
        <div className="tag">
          <button
            onClick={() => history("/contact")}
            className="btn btn-danger"
          >
            Contact
          </button>
        </div>
        <div className="img">
          <div className="show">
            <div className="data">
              {userdata
                ? userdata.getData.photo.map((photo, index) => (
                    <div key={index} className="data-sub">
                      <img src={photo.url} alt={photo.name} />
                      <div className="deleteIcon">
                        <i
                          onClick={() => deletePhoto(photo._id, index)}
                          className="fa-sharp fa-solid fa-trash"
                        ></i>
                      </div>
                    </div>
                  ))
                : "Loading"}
            </div>
          </div>
        </div>
        <div className="img">
          <div className="button">
            <button
              onClick={() => history("/editPhoto")}
              className="btn btn-primary"
            >
              Set Profile Photo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
