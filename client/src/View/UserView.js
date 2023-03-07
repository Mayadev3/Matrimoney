import React, { useState } from "react";
import MatrimoneyApi from "../helpers/MatrimoneyApi";
import Local from "../helpers/Local";

export default function UserView() {
  let [users, setUsers] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    let response = await MatrimoneyApi.getUsers();
    if (response.ok) {
      setUsers(response.data[0]);
      setErrorMsg("");
    } else {
      setUsers([]);
      setErrorMsg(`Error: ${response.status}, ${response.statusText}`);
    }
  }
  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!users) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="UserView">
      {/* <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul> */}
    </div>
  );
}
