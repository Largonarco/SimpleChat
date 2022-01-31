const UserData = ({ toggle, setToggle, userData, setUserData }) => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <form className="vstack gap-2">
        <div className="hstack gap-2">
          <input
            className="form-control"
            type="text"
            placeholder="User name"
            name="userName"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            required
          />
          <input
            className="form-control"
            type="text"
            placeholder="Room name"
            name="roomName"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            if (userData.userName != null && userData.roomName != null) {
              setToggle(!toggle);
            }
          }}
        >
          Chat
        </button>
      </form>
    </div>
  );
};

export default UserData;
