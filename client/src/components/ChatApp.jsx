import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { autoConnect: false });

const ChatApp = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("userData", userData);

    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on("message", (data) => {
    setMessages([...messages, data]);
  });

  socket.on("users", (users) => {
    setUsers(users);
  });

  const sendMsg = (e) => {
    e.preventDefault();

    socket.emit("chatMessage", messageInput);
  };

  return (
    <div>
      <header className="chat-header">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            className="bi bi-chat-right-quote"
            viewBox="0 0 16 16"
          >
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
            <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
          </svg>{" "}
          Chat App
        </h1>
      </header>
      <div className="main-space">
        <div className="chat-sidebar">
          <h3>Room Name</h3>
          <h3 id="room-name">{userData.roomName}</h3>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              className="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>{" "}
            Users
          </h3>
          <ul className="users">
            {users.map((user, index) => {
              return <li key={index}>{user.userName}</li>;
            })}
          </ul>
        </div>
        <div className="chat-main">
          <div className="chat-messages">
            {messages.map((msg, index) => {
              return (
                <div key={index} className="message">
                  <p class="meta">
                    ${msg.user} ${msg.time}
                  </p>
                  <p class="text">${msg.message}</p>
                </div>
              );
            })}
          </div>
          <div className="chat-form-container">
            <form className="chat-form">
              <input
                className="msg"
                type="text"
                placeholder="Enter Message"
                name="msg"
                onChange={(e) => setMessageInput(e.target.value)}
                required
                autoComplete="off"
              />
              <button className="btn success-btn" onClick={(e) => sendMsg(e)}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
