const users = [];

const addUser = (id, userName, roomName) => {
  const user = { id, userName, roomName };
  users.push(user);

  return user;
};

const getCurrentUser = (id) => {
  const user = users.find((user) => user.id === id);

  return user;
};

const getRoomUsers = (roomName) => {
  const roomUsers = users.filter((user) => user.roomName === roomName);

  return roomUsers;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users.splice(index, 1);

  return user[0];
};

module.exports = {
  addUser,
  removeUser,
  getCurrentUser,
  getRoomUsers,
};
