import React, { Component } from "react";
import Modal from "./components/Modal";
import Addroom from "./components/Addroom";
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
          <Route path="/" exact component={Modal}></Route>
          <Route path="/Addroom" exact component={Addroom}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
