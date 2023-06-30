import react, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

export const Usercontext = react.createContext();

const UsercontextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  return (
    <Usercontext.Provider value={{ user, setUser }}>
      {children}
    </Usercontext.Provider>
  );
};

export default UsercontextProvider;
