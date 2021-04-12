import React, { Component } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Modal from "./components/Modal";
import Create from "./components/Create";
import Join from "./components/Join";
import Room from "./components/Room";
import NavBar from "./components/navbar";
import Contactus from "./components/Contactus"
import Aboutus from "./components/Aboutus"
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    const PagesWithNavBar = () => {
      return (
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/Create" exact component={Create} />
            <Route path="/Join" exact component={Join} />
            <Route path="/Room" exact component={Room} />
            <Route path="/Contact" exact component={Contactus}></Route>
            <Route path="/Aboutus" exact component={Aboutus}></Route>
          </Switch>
        </div>
      );
    };

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route component={PagesWithNavBar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
