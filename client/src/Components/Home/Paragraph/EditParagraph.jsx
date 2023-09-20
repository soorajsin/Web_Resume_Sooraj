import React, { useState } from "react";
import "./EditParagraph.css";
import { useNavigate } from "react-router-dom";

const EditParagraph = () => {
  const history = useNavigate();

  const [paragraph, setParagraph] = useState([
    {
      content: "",
    },
  ]);

  const addParagraph = async () => {
    const newForm = {
      content: "",
    };
    setParagraph([...paragraph, newForm]);
  };
  console.log(paragraph);

  const saveParagraph = async () => {
    const emptyField = paragraph.some((form) => form.content === "");

    if (emptyField) {
      alert("Please Fill All fields");
    } else {
      console.log("done");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch(
        "https://web-resume-sooraj-server.vercel.app/editParagraph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ paragraph }),
        }
      );

      const res = await data.json();
      //       console.log(res);

      if (res.status === 205) {
        //         console.log(res);
        history("/home");
      } else {
        console.log("not save paragraph");
        history("*");
      }
    }
  };

  return (
    <>
      <div className="paragraph">
        <div className="main">
          <h1>Welcome to Edit Paragraph</h1>
          <br />
          {paragraph.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="paragraph">Paragraph</label>
                <br />
                <textarea
                  cols="50"
                  rows="2"
                  placeholder="Enter your paragraph"
                  value={subForm.content}
                  onChange={(e) => {
                    const contentChange = [...paragraph];
                    contentChange[index].content = e.target.value;
                    setParagraph(contentChange);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
          <br />
          <div className="form">
            <button onClick={addParagraph} className="btn btn-primary">
              Add Paragraph
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveParagraph} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditParagraph;
