import React, { Component, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Modal, message, Select } from "antd";
import Axios from "axios";
import "../css/Create.css";
import Room from "./Room";
import { withRouter, Route, useHistory } from "react-router-dom";

const { Option } = Select;

const Create = () => {
  const [roomName, setRoomName] = useState();
  const [roomGenre, setGenre] = useState();

  const insertData = () => {
    var data = {
      room_name: roomName,
      genre: roomGenre,
    };
    Axios.post("http://localhost:8000/api/adds/", data)
      .then((res) => {
        console.log("hi");
        setRoomName("");
        setGenre("");
      })
      .catch((er) => console.log(er));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const validateRN = (validRN) => {
    if (validRN && validRN.length > 0) {
      return true;
    }
    return false;
  };

  const genreList = ["Rock", "Pop", "Classical"];
  const validateRG = (validRG) => {
    console.log(validRG);
    console.log(genreList.includes(validRG));
    return genreList.includes(validRG);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const MoveToRoom = () => {
    console.log(this);
  };

  let history = useHistory();

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("ok");
    history.push("/Room");
    MoveToRoom();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [modalMessage, setModalMessage] = useState();

  const onClickFunks = () => {
    //insertData();
    if (!validateRN(roomName)) {
      setModalMessage("Invalid roomname, must input at least one character.");
      showModal();
    } else if (!validateRG(roomGenre)) {
      setModalMessage("You have selected an invalid genre.");
      showModal();
    } else {
      setModalMessage("");
      showModal();
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 8,
      offset: 4,
    },
  };

  return (
    <div>
      <Form {...formItemLayout} className="text-color">
        <Form.Item
          label="Roomname"
          name="roomname"
          //rules={[{ required: true, message: "Please input your roomname!" }]}
        >
          <Input
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          //rules={[{ required: true, message: "Please input your genre!" }]}
        >
          <Input
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Genre2"
          name="genre2"
          //rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select placeholder="Select genre">
            <Option value="Rock">Rock</Option>
            <Option value="Pop">Pop</Option>
            <Option value="Classical">Classical</Option>
            <Option value="Country">Country</Option>
          </Select>
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onClickFunks()}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        afterClose={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>Room Name: {roomName}</p>
        <p>Genre: {roomGenre}</p>
        <p style={{ color: "red" }}>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default Create;
