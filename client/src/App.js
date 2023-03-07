import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomeView from "./components/HomeView.js";
import Budget from "./components/Budget.js";
import Funds from "./components/Funds.js";
import "./App.css";
import ActualCost from "./components/ActualCost.js";
import Compare from "./components/Compare.js";
import EstimatedCost from "./components/EstimatedCost.js";
import FundsDisplay from "./components/FundsDisplay.js";
import FundsForm from "./components/FundsForm.js";
import Login from "./components/Login.js";
import ErrorView from "./components/ErrorView.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Local from "./helpers/Local";
import MatrimoneyApi from "./helpers/MatrimoneyApi";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [allIncome, setIncome] = React.useState([]);
  const [visibleAlert, setAlertVisible] = useState(false);

  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await MatrimoneyApi.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      //here i want all the tables to show up!!!
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  useEffect(() => {
    getIncome();
  }, []);

  const handleVisible = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  async function getIncome() {
    let uresponse = await MatrimoneyApi.getIncome();
    if (uresponse.ok) {
      setIncome(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  }

  async function addIncome(incomeObj) {
    let uresponse = await MatrimoneyApi.addIncome(incomeObj);
    if (uresponse.ok) {
      setIncome(uresponse.data);
      handleVisible();
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  }

  async function changeIncome(newIncome) {
    let id = Number(newIncome.income_id);
    let oldAmount = allIncome.find((i) => +i.id === +id);
    oldAmount = oldAmount.amount_used;
    let totalAmount = 0;
    if (oldAmount) {
      totalAmount = Number(oldAmount) + Number(newIncome.amount);
    } else {
      totalAmount = Number(newIncome.amount);
    }
    let patchObj = { text: newIncome.text, amount: totalAmount };
    let uresponse = await MatrimoneyApi.changeIncome(id, patchObj);
    if (uresponse.ok) {
      setIncome(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  }

  async function returnFunds(id, amountDeleted) {
    let oldAmtUsed = allIncome.find((i) => +i.id === +id);
    oldAmtUsed = oldAmtUsed.amount_used;
    let totalAmtUsed = 0;
    if (oldAmtUsed) {
      totalAmtUsed = Number(oldAmtUsed) - Number(amountDeleted);
    } else {
      totalAmtUsed = 0 - Number(amountDeleted);
    }
    let patchObj = { amount: totalAmtUsed };
    let uresponse = await MatrimoneyApi.changeIncome(id, patchObj);
    if (uresponse.ok) {
      setIncome(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  }

  const deleteIncome = async (id) => {
    let uresponse = await MatrimoneyApi.deleteIncome(id);
    if (uresponse.ok) {
      setIncome(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
      alert(`Cannot delete funds assigned to a cost`);
    }
  };
  //ROUTE CONNECTS COMPONENT TO ROUTE..LINKS CONNECT BUTTONS TO ROUTES
  //the homeview had the two buttons in the middle of the page leading to viewing budgets and adding funds
  //the budget component has the navbar
  //the estimatedCost component has estimate cost table and recommendation table
  //actualcosts component has the actual costs table and notes table
  //compare component has estimated costs and actual costs
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/login" onClick={doLogout}>
              <span className="logout">LOGOUT</span>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              loginCb={(username, password) => doLogin(username, password)}
              loginErrorMsg={loginErrorMsg}
            />
          }
        />
        {/* i am making the homeview private and only when they are logged in they will be able to see it..if they are not logged in it will redirect them to the login page */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeView />
            </PrivateRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <PrivateRoute>
              <Budget allIncome={allIncome} />
            </PrivateRoute>
          }
        >
          <Route index element={<EstimatedCost allIncome={allIncome} />} />
          <Route
            path="/budget/costs" //the ACTUAL button
            element={
              <PrivateRoute>
                <ActualCost
                  setIncomeCb={(newIncome) => changeIncome(newIncome)}
                  allIncome={allIncome}
                  returnFundsCb={(id, amountDeleted) =>
                    returnFunds(id, amountDeleted)
                  }
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget/compare"
            element={
              <PrivateRoute>
                <Compare allIncome={allIncome} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/funds"
          element={
            <PrivateRoute>
              <Funds />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <FundsForm
                  visibleAlert={visibleAlert}
                  addIncomeCb={(newIncome) => addIncome(newIncome)}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/funds/display"
            element={
              <PrivateRoute>
                <FundsDisplay
                  allIncome={allIncome}
                  deleteIncomeCb={(id) => deleteIncome(id)}
                />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={<ErrorView code="404" message="Page Not Found" />}
        />
      </Routes>
    </div>
  );
}

export default App;
