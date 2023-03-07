import React, { useState, useParams } from "react";
import { matchRoutes } from "react-router-dom";
import MatrimoneyApi from "../helpers/MatrimoneyApi";

export default function ProfileView() {
  let [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { userId } = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let response = await MatrimoneyApi.getUserById(userId);
    if (response.ok) {
      setUser(response.data);
      setErrorMsg("");
    } else {
      setUser(null);
      setErrorMsg(`Error: ${response.status}: ${response.statusText}`);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return <div className="ProfileView"></div>;
}
