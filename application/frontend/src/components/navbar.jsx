import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";

const NavBar = () => {
  console.log("Navbar - Rendered");

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark-sync">
        <div class="container-fluid">
          {/*<a class="navbar-brand sync-type-color" href="{% url 'home' %}">
            Sync
            </a>*/}
          <Link to="/">Sync</Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link sync-toggler-color"
                  aria-current="page"
                  to="/Addroom"
                >
                  Create
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link sync-toggler-color" to="/">
                  Join
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
        crossorigin="anonymous"
      ></script>
    </div>
  );
};

export default NavBar;
