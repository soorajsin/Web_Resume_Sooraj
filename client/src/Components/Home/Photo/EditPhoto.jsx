import React, { useState } from "react";
import "./EditPhoto.css";
import { useNavigate } from "react-router-dom";

const EditPhoto = () => {
  const history = useNavigate();
  const [photo, setPhoto] = useState({
    name: "",
    url: "",
  });

  const setPhotoData = (e) => {
    const { name, value } = e.target;
    setPhoto({
      ...photo,
      [name]: value,
    });
  };
  console.log(photo);

  const savePhotoData = async (e) => {
    // Handle saving the photo data to your desired location (e.g., localStorage, database)
    // console.log(photo);

    const { name, url } = photo;

    if (name === "") {
      alert("Please name is required...");
    } else if (url === "") {
      alert("Please url is required");
    } else {
      console.log("photo");

      const token = await localStorage.getItem("userDataToken");
      // console.log(token);

      const data = await fetch("http://localhost:4000/editPhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ photo }),
      });

      const res = await data.json();
      // console.log(res);
      if (res.status === 205) {
        console.log(res);
        history("/home");
      } else {
        console.log("photo not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="editPhoto">
        <div className="edit">
          <h1>Welcome to Edit Photo</h1>
          <br />
          <div className="form">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter name..."
              name="name"
              value={photo.name}
              onChange={setPhotoData}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="url">Upload Photo</label>
            <br />
            <input
              type="url"
              placeholder="Enter your img url..."
              name="url"
              value={photo.url}
              onChange={setPhotoData}
            />
          </div>
        </div>
        <div className="save">
          <button onClick={savePhotoData} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPhoto;
