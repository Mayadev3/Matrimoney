import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="Login">
      <h1>MATRIMONEY</h1>
      <p>
        Need getting your partner to say yes, show how in control you are of
        your funds
      </p>
      <form>
        <div className="input1">
          <input type="text" placeholder="username" className="input" />
        </div>
        <div className="input2">
          <input type="text" placeholder="password" />
        </div>
        <button className="login-button">
          <a href="#">Login</a>
        </button>
      </form>
    </div>
  );
}
