const { Server } = require("socket.io");
const moment = require("moment");

const {
  addUser,
  removeUser,
  getCurrentUser,
  getRoomUsers,
} = require("./utils/users");

const PORT = 5000 || process.env.PORT;

// WebSocket server
const io = new Server(PORT, { cors: "*" });

io.on("connection", (socket) => {
  // When a client connects
  socket.on("userData", (data) => {
    const user = addUser(socket.id, data.userName, data.roomName);
    socket.join(user.roomName);
    socket.broadcast.to(user.roomName).emit("message", {
      user: "Server",
      message: `${user.userName} has joined the chat`,
      time: moment().format("h:mm a"),
    });

    const roomUsers = getRoomUsers(user.roomName);
    io.in(user.roomName).emit("users", roomUsers);
  });

  // On receiving a message from a client
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    socket.broadcast.to(user.roomName).emit("message", {
      user: user.userName,
      message,
      time: moment().format("h:mm a"),
    });
  });

  // When a client disconnects
  socket.on("disconnecting", () => {
    const user = removeUser(socket.id);
    io.in(user.roomName).emit("message", {
      user: "Server",
      message: `${user.userName} has left the chat`,
      time: moment().format("h:mm a"),
    });

    const roomUsers = getRoomUsers(user.roomName);
    io.in(user.roomName).emit("users", roomUsers);
  });
});
