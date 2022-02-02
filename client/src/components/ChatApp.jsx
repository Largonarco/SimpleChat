import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';

import {
  Box,
  Flex,
  HStack,
  FormControl,
  Input,
  Button,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

const socket = io("http://localhost:5000", { autoConnect: false });

const ChatApp = ({ userData, toggle, setToggle }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit('userData', userData);

    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on('message', data => {
    const msg = {
      user: data.user,
      message: data.message,
      time: moment().format('h:mm a'),
    };
    setMessages([...messages, msg]);
  });

  socket.on('users', users => {
    setUsers(users);
  });

  const sendMsg = e => {
    e.preventDefault();

    socket.emit('chatMessage', messageInput);
    setMessageInput('');
  };

  return (
    <Flex height="100vh" direction="column" p="1em" gap="1em">
      <Flex
        as="header"
        height="10vh"
        px="1em"
        justify="space-between"
        align="center"
        bgColor="red.400"
        borderRadius="0.25em"
      >
        <HStack>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            fill="currentColor"
            className="bi bi-chat-right-quote"
            viewBox="0 0 16 16"
          >
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
            <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
          </svg>
          <Text fontSize="2em">Chat App</Text>
        </HStack>
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => setToggle(!toggle)}
        >
          Leave room
        </Button>
      </Flex>
      <Flex direction="row" gap="1em" height="85vh">
        <Flex
          display={{ base: 'none', md: 'flex' }}
          direction="column"
          align="center"
          py="1em"
          gap="1em"
          flex={1}
          bgColor="red.400"
          borderRadius="0.25em"
        >
          <Text fontSize="1.2em" fontWeight={400}>
            Room
          </Text>
          <Box p="0.75em" bgColor="black" opacity={0.6}>
            <Text fontSize="1em" textColor="white">
              {userData.roomName}
            </Text>
          </Box>
          <HStack>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              className="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <Text fontSize="1.2em">Users</Text>
          </HStack>
          <List spacing="0.5em">
            {users.map((user, index) => {
              return <ListItem key={index}>{user.userName}</ListItem>;
            })}
          </List>
        </Flex>
        <Flex direction="column" gap="1em" flex={5}>
          <Flex
            direction="column"
            flex={12}
            p="1em"
            gap="1em"
            overflowY="scroll"
            bgColor="red.100"
            borderRadius="0.25em"
          >
            {messages.map((msg, index) => {
              return (
                <Flex
                  key={index}
                  direction="column"
                  p="0.5em"
                  gap="0.5em"
                  bgColor="gray.100"
                  borderRadius="0.25em"
                >
                  <Text fontSize="1em" fontWeight="semibold">
                    {msg.user === userData.userName ? 'Self' : msg.user}{' '}
                    {msg.time}
                  </Text>
                  <Text fontSize="1em" fontWeight="normal">
                    {msg.message}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Flex flex={1} p="1em" bgColor="red.400" borderRadius="0.25em">
            <FormControl as="fieldset">
              <HStack>
                <Input
                  type="text"
                  placeholder="Enter Message"
                  name="msg"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  required
                  autoComplete="off"
                />
                <Button
                  colorScheme="green"
                  variant="solid"
                  onClick={e => sendMsg(e)}
                >
                  Send
                </Button>
              </HStack>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatApp;
