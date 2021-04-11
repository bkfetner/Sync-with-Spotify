import React, { Component } from "react";
import Search from "./components/Search";
import Modal from "./components/Modal";
import Create from "./components/Create";
import Join from "./components/Join";
import NavBar from "./components/navbar";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Search}></Route>
          <Route path="/Create" exact component={Create}></Route>
          <Route path="/Join" exact component={Join}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
