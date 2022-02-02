import {
  Center,
  VStack,
  HStack,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

const UserData = ({ toggle, setToggle, userData, setUserData }) => {
  return (
    <Center height="100vh" bgColor="gray.900">
      <FormControl as="fieldset" p="1em">
        <VStack spacing="1em">
          <HStack spacing="1em">
            <Input
              type="text"
              placeholder="User name"
              name="userName"
              onChange={e =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              required
            />
            <Input
              type="text"
              placeholder="Room name"
              name="roomName"
              onChange={e =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              required
            />
          </HStack>
          <Button
            variant="outline"
            onClick={e => {
              e.preventDefault();
              if (userData.userName != null && userData.roomName != null) {
                setToggle(!toggle);
              }
            }}
          >
            Chat
          </Button>
        </VStack>
      </FormControl>
    </Center>
  );
};

export default UserData;
