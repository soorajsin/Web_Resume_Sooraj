import React, { useState, useContext, useEffect } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const Contact = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);

  const contactfetchdata = async () => {
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

    const data = await fetch(
      "https://web-resume-sooraj-server.vercel.app/deleteContact",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ contactId }),
      }
    );

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      console.log(res);
    } else {
      console.log("user not found");
      history("*");
    }
  };

  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const messageChangeValue = async (e) => {
    const { name, value } = e.target;

    setMessage({
      ...message,
      [name]: value,
    });
  };
  // console.log(message);

  const sendMessageOnEmail = async (e) => {
    e.preventDefault();

    const { name, email, subject, description } = message;

    if (name === "") {
      alert("Please Enter your name");
    } else if (email === "") {
      alert("please enter  email id");
    } else if (!email.includes("@")) {
      alert("enter a valid mail  eg: abc@gmail.com");
    } else if (subject === "") {
      alert("Enter the Subject");
    } else if (description === "") {
      alert("Enter Description ");
    } else {
      console.log("done");

      const token = await localStorage.getItem("userDataToken");
      // console.log(token);

      const data = await fetch(
        "https://web-resume-sooraj-server.vercel.app/messageSend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            description,
          }),
        }
      );

      const res = await data.json();
      console.log(res);
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
        <div className="anyQuestion">
          <h1>Welcome to Contact </h1>
          <p>
            <b>Ask any Question ?</b>
          </p>
          <br />
          <div className="form">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter your full name..."
              name="name"
              value={message.name}
              onChange={messageChangeValue}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={message.email}
              onChange={messageChangeValue}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="subject">Subject</label>
            <br />
            <input
              type="text"
              placeholder="Enter your subject..."
              name="subject"
              value={message.subject}
              onChange={messageChangeValue}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              cols="50"
              rows="2"
              placeholder="Enter your description..."
              name="description"
              value={message.description}
              onChange={messageChangeValue}
            ></textarea>
          </div>
          <div className="form">
            <button onClick={sendMessageOnEmail} className="btn btn-danger">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
