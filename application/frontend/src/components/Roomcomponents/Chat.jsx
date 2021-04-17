import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List } from "antd";
import Axios from "axios";
import "../../css/Chat.css";
import Chatcard from "./Chatcard.jsx";

const Chat = (props) => {
  const [comments, setComments] = useState([{ userName: "", comment: "" }]);

  let roomName = "temp";

  const addChats = (newChat) => {
    setComments(newChat, { ...comments });
    return <Chatcard comments />;
  };

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 0,
    },
  };

  const otherItemLayout = {
    wrapperCol: {
      span: 0,
      offset: 5,
    },
  };

  return (
    <div className="chat-main">
      <div className="chat-box-and-form">
        <div className="chat-box-flex" id="chat-box-flex">
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <Chatcard />
          <div className="anchor"></div>
        </div>
        <Form
          className="text-color chat-form-flex"
          /*  style={{ marginTop: "150px", marginLeft: "400px" }} */
        >
          <Form.Item
            name="roomname"
            //rules={[{ required: true, message: "Please input your roomname!" }]}
          >
            <Input
              placeholder="Send a Message"
              onChange={() => console.log("onChange")}
              className="chat-input"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => console.log("onClick")}
              className="sync-button-color"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
