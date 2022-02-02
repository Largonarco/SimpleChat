import { useState } from 'react';
import UserData from './components/UserData';
import ChatApp from './components/ChatApp';

import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [toggle, setToggle] = useState(true);
  const [userData, setUserData] = useState({ userName: null, roomName: null });

  return (
    <ChakraProvider>
      {toggle ? (
        <UserData
          toggle={toggle}
          setToggle={setToggle}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <ChatApp userData={userData} toggle={toggle} setToggle={setToggle} />
      )}
    </ChakraProvider>
  );
}

export default App;
