import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditParagraphAbout = () => {
  const history = useNavigate();

  const [editPararaph, setEditParagraph] = useState([
    {
      paragraph: "",
    },
  ]);

  const addParagraph = async () => {
    const newForm = {
      paragraph: "",
    };
    setEditParagraph([...editPararaph, newForm]);
  };
  console.log(editPararaph);

  const saveParagraphAbout = async () => {
    const emptyFileds = editPararaph.some((form) => form.paragraph === "");

    if (emptyFileds) {
      alert("Please Enter all fields");
    } else {
      const token = await localStorage.getItem("userDataToken");

      const data = await fetch(
        "https://web-resume-sooraj-server.vercel.app/editParagraphAbout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ editPararaph }),
        }
      );

      const res = await data.json();
      // console.log(res);

      if (res.status === 205) {
        // console.log(res);
        history("/about");
      } else {
        console.log("not add paragraph");
      }
    }
  };

  return (
    <>
      <div className="paragraph">
        <div className="main">
          <h1>Welcome to Edit Paragraph</h1>
          <br />
          {editPararaph.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="paragraph">Pararaph</label>
                <br />
                <textarea
                  cols="50"
                  rows="2"
                  placeholder="Enter your paragraph..."
                  value={subForm.paragraph}
                  onChange={(e) => {
                    const updatedParagraph = [...editPararaph];
                    updatedParagraph[index].paragraph = e.target.value;
                    setEditParagraph(updatedParagraph);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addParagraph} className="btn btn-primary">
              Add Paragraph
            </button>
          </div>
        </div>
        <div className="save">
          <button onClick={saveParagraphAbout} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditParagraphAbout;
