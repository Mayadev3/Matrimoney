import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login(props) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginCb(username, password);
  };
  return (
    <div className="Login">
      <h1>MATRIMONEY</h1>
      <p>Manage your wedding payment plan</p>
      <form onSubmit={handleSubmit}>
        <div className="input1">
          <input
            placeholder="username"
            className="input"
            type="text"
            name="usernameInput"
            required
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="input2">
          <input
            placeholder="password"
            onChange={handleChange}
            type="password"
            name="passwordInput"
            value={password}
            required
          />
        </div>
        <button className="login-button">
          <a href="">Login</a>
        </button>
      </form>
    </div>
  );
}
