import React from "react";
import "./HomeView.css";
import Login from "./Login.js";
import { useNavigate, NavLink, Link } from "react-router-dom";

export default function HomeView(props) {
  return (
    <div className="HomeView">
      {/* {props.user} */}
      <div id="homepage-buttons">
        <Link to="/budget">
          <button type="button">VIEW MY BUDGET</button>
        </Link>
        <Link to="/funds">
          <button type="button">ADD FUNDS</button>
        </Link>
      </div>
      :
    </div>
  );
}
