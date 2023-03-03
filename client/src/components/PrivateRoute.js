import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

export default function PrivateRoute(props) {
  let userId = Local.getUserId();
  if (!userId) {
    return <Navigate to="/login" />;
  }

  return <div>{props.children}</div>; //return the component wrapped in private route
}
