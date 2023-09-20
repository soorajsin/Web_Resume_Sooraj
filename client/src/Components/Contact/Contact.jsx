import React, { useContext, useEffect } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const Contact = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);

  const contactfetchdata = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (data.ok) {
      console.log("failed to fetch", data.status);
    }

    const res = await data.json();

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
      history("*");
    }
  };

  useEffect(() => {
    contactfetchdata();
  });

  const deleteContact = async (contactId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/deleteContact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ contactId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("user not found");
      history("*");
    }
  };

  return (
    <>
      <div className="contact">
        <div className="edit">
          <div className="show">
            {userdata
              ? userdata.getData.contact.map((contact, index) => (
                  <div key={index} className="data">
                    <a href={contact.contactURL}>
                      <img src={contact.contactImgURL} alt={contact.name} />
                    </a>
                    <h3>{contact.name}</h3>
                    <div className="deleteIcon">
                      <i
                        onClick={() => {
                          deleteContact(contact._id, index);
                        }}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                ))
              : "Loading"}
          </div>
          <div className="contactEdit">
            <div
              className="box"
              onClick={() => {
                history("/editContact");
              }}
            >
              <i className="fa-regular fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
