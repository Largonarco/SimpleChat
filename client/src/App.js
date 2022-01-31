import { useState } from "react";
import UserData from "./components/UserData";
import ChatApp from "./components/ChatApp";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [userData, setUserData] = useState({ userName: null, roomName: null });
  
  return (
    <>
      {toggle ? (
        <UserData
          toggle={toggle}
          setToggle={setToggle}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <ChatApp userData={userData}/>
      )}
    </>
  );
};

export default App;
