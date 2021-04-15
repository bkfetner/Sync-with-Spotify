import React, {
  Component,
  useState,
  Box,
  Flex,
  ImageBackground,
  View,
  Text,
} from "react";
import { Form, Input, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
import { CardDeck, Button, Container } from "react-bootstrap";
import Background from "../assets/bg.jpg";
import { Header } from "antd/lib/layout/layout";
import FAQ from "./FAQ";
import "../css/Landing.css";

const Landing = () => {
  return (
    <div>
      <figure className="position-relative">
        <img
          src={Background}
          alt="bg"
          className="img-fluid"
          style={{ filter: "brightness(30%)", width: "100%", height: "740px" }}
        />
        <figcaption className="banner">Welcome to Sync!</figcaption>
        <figcaption className="subtext1">
          Share your spotify songs in one of our listening rooms!
          <br />
          Listen to music and chat with friends and the community!
        </figcaption>
        <figcaption className="landingButton">
          <Button
            href="/Home"
            class="btn btn-dark sync-button-color"
            style={{ marginBottom: "30px" }}
            size="lg"
          >
            Log in with Spotify
          </Button>
        </figcaption>
      </figure>
      <FAQ />
    </div>
  );
};

export default Landing;
