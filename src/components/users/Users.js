import React from "react";
import Useritem from "./Useritem";
import Spinner from "../layout/Spinner";

const Users = ({ users, loading }) => {
  return (
    <>
      {loading && <Spinner />}
      <div style={userStyle}>
        {users && users.map((user) => <Useritem key={user.id} user={user} />)}
      </div>
    </>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
export default Users;
