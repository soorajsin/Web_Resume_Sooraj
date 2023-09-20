import React, { useContext, useEffect } from "react";
import { ContextNavigate } from "../ContextProvider/Context";
import "./UpdateSKill.css";
import { useNavigate } from "react-router-dom";

const UpdateSkill = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const skillfetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    //     console.log(res);
    if (res.status === 205) {
      //       console.log(res);
      setUserData(res);
    } else {
      console.log("data not found");
    }
  };

  useEffect(() => {
    skillfetchData();
  });

  const deleteSkillData = async (skillId) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/deleteskill", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ skillId }),
    });
    //     console.log(data);
    const res = await data.json();
    //     console.log(res);

    if (data.status === 200) {
      // Skill successfully deleted, update the user data
      skillfetchData();
      console.log(res);
      history("/about");
    } else {
      // Handle errors, e.g., skill not found or server error
      console.error("Failed to delete skill");
      history("*");
    }
  };

  return (
    <>
      <div className="updateSkill">
        <div className="showSkill">
          {userdata
            ? userdata.getData.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />} {/* Add line break if index > 0 */}
                  <div className="skillCSSHandle">
                    <div className="handle">
                      {skill} <i className="fa-solid fa-pen-to-square"></i>
                      <br />
                      <i
                        onClick={() => deleteSkillData(skill)}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </div>
                </React.Fragment>
              ))
            : "Loading"}
        </div>
      </div>
    </>
  );
};

export default UpdateSkill;
