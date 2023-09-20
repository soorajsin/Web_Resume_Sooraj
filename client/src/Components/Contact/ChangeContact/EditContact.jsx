import React, { useState } from "react";
import "./EditContact.css";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
  const history = useNavigate();

  const [contact, setContact] = useState([
    {
      contactImgURL: "",
      contactURL: "",
      name: "",
    },
  ]);

  const addContact = async () => {
    const newForm = {
      contactImgURL: "",
      contactURL: "",
      name: "",
    };
    setContact([...contact, newForm]);
  };
  console.log(contact);

  const saveContact = async () => {
    const emptyField = contact.some(
      (form) =>
        form.contactImgURL === "" || form.contactURL === "" || form.name === ""
    );

    if (emptyField) {
      alert("Please Enter all fields");
    } else {
      console.log("contact");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch("http://localhost:4000/editContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ contact }),
      });

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        console.log(res);
        history("/contact");
      } else {
        console.log("contact not added");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="editContact">
        <div className="edit">
          <h1>Welcome to Edit Contact</h1>
          <br />
          {contact.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="contactImgURL">Contact Image URL</label>
                <br />
                <input
                  type="url"
                  placeholder="Enter your img url..."
                  value={subForm.contactImgURL}
                  onChange={(e) => {
                    const updatedContact = [...contact];
                    updatedContact[index].contactImgURL = e.target.value;
                    setContact(updatedContact);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="contactURL">Contact URL</label>
                <br />
                <input
                  type="url"
                  placeholder="Enter your contact url..."
                  value={subForm.contactURL}
                  onChange={(e) => {
                    const updatedContact = [...contact];
                    updatedContact[index].contactURL = e.target.value;
                    setContact(updatedContact);
                  }}
                />
              </div>
              <br />
              <div className="form">
                <label htmlFor="name">Contact Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter contact name...."
                  value={subForm.name}
                  onChange={(e) => {
                    const updatedContact = [...contact];
                    updatedContact[index].name = e.target.value;
                    setContact(updatedContact);
                  }}
                />
              </div>
              <div className="line" />
            </div>
          ))}
          <br />
          <div className="form">
            <button onClick={addContact} className="btn btn-primary">
              Add Contact
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveContact} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditContact;
