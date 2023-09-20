import React, { createContext, useState } from "react";

export const ContextNavigate = createContext({
  userdata: "",
  setUserData: () => {},
});

const Context = ({ children }) => {
  const [userdata, setUserData] = useState("");

  return (
    <>
      <ContextNavigate.Provider value={{ userdata, setUserData }}>
        {children}
      </ContextNavigate.Provider>
    </>
  );
};

export default Context;
