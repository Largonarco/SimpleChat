const Express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const {
  addUser,
  removeUser,
  getCurrentUser,
  getRoomUsers,
} = require("./utils/users");

const app = Express();

app.use(Express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Http server
const httpServer = http.createServer(app);

// WebSocket server
const io = new Server(httpServer, { cors: "*" });

io.on("connection", (socket) => {
  socket.on("userData", (data) => {
    const user = addUser(socket.id, data.userName, data.roomName);
    socket.join(user.roomName);
    socket.broadcast.to(user.roomName).emit("message", {
      user: "Server",
      message: `${user.userName} has joined the chat`,
    });

    const roomUsers = getRoomUsers(user.roomName);
    io.in(user.roomName).emit("users", roomUsers);
  });

  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    io.in(user.roomName).emit("message", {
      user: user.userName,
      message,
    });
  });

  socket.on("disconnecting", () => {
    const user = removeUser(socket.id);
    io.in(user.roomName).emit("message", {
      user: "Server",
      message: `${user.userName} has left the chat`,
    });

    const roomUsers = getRoomUsers(user.roomName);
    io.in(user.roomName).emit("users", roomUsers);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
