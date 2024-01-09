import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { ContextNavigate } from "../ContextProvider/Context";
import apiURL from "../config";

const Home = () => {
  const url = apiURL.url;
  const { userdata } = useContext(ContextNavigate);
  // console.log(userdata);

  const history = useNavigate();

  const deletePhoto = async (photoId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(`${url}/ldeletePhoto`, {
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

  const paragraphDelete = async (paragraphId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(`${url}/paragraphDelete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ paragraphId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      console.log("done");
    } else {
      console.log("not delete paragraph");
      history("*");
    }
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="tag">
            <h3>
              Hello, My name is{" "}
              <span>{userdata ? userdata.getData.name : "Loading"}</span>
            </h3>
          </div>
          <div className="tag">
            <div className="paragraphDataId">
              <div className="showData">
                {userdata
                  ? userdata.getData.Paragraph.map((paragraph, index) => (
                      <div key={index} className="paragraphDataItem">
                        {index > 0 && <br />}
                        <div className="dataId">
                          {paragraph.content}
                          <div className="delete">
                            <i
                              onClick={() =>
                                paragraphDelete(paragraph._id, index)
                              }
                              className="fa-sharp fa-solid fa-trash"
                            ></i>
                          </div>
                        </div>
                      </div>
                    ))
                  : "Loading"}
              </div>

              <div className="editParagraph">
                <button
                  onClick={() => history("/editParagraph")}
                  // className="btn btn-primary"
                >
                  Paragraph Edit
                </button>
              </div>
            </div>
            {/* <p>I'm a website design, graphic design, and many more...</p> */}
          </div>
          <div className="tag">
            <button
              onClick={() => history("/contact")}
              // className="btn btn-danger"
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
                // className="btn btn-primary"
              >
                Set Profile Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
