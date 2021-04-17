import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import "../../css/Chat.css";

function Chatcard(props) {
  let userName = "Frank";
  let message = "What is this song?";

  return (
    <div className="chat-card">
      <strong>{userName}</strong>: {message}
    </div>
  );
}

export default Chatcard;
