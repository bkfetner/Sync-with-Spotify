import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Modal}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;