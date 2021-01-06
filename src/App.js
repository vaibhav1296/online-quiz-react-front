// import logo from './logo.svg';
// import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import LogInForm from "./components/LogInForm";
import LogOut from "./components/LogOut";
import NavBar from "./components/NavBar";
import Result from "./components/Result";
import SignUpForm from "./components/SignUpForm";
import Test from "./components/Test";
import Profile from "./components/Profile";
import TestDetails from "./components/TestDetail";
import "./index.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={LogInForm} />
            <Route path="/home" component={HomeContainer} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={SignUpForm} />
            <Route path="/result" component={Result} />
            <Route path="/test-details/:id" component={TestDetails} />
            <Route path="/test" component={Test} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
