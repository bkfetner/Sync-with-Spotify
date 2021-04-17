import React, { Component, useState, setState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Modal, message, Select } from "antd";
import Axios from "axios";
import "../css/Create.css";
import Room from "./Room";
import { withRouter, useHistory, useLocation } from "react-router-dom";

const { Option } = Select;

const Create = (props) => {
  console.log(props);

  const [roomName, setRoomName] = useState();
  const [roomGenre, setGenre] = useState();
  const [tosStatus, setTosStatus] = useState(false);

  const insertData = () => {
    console.log("roomName: " + roomName + ", roomGenre: " + roomGenre);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const history = useHistory();

  const updatePropHistory = () => {
    console.log(props);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (validateRN(roomName) && roomGenre && tosStatus) {
      props.history.push({
        pathname: "/Room",
        state: { roomName: roomName, roomGenre: roomGenre },
      });
    }
  };

  const [modalMessage, setModalMessage] = useState();
  const [successModalMessage, setSuccessModalMessage] = useState();

  const onClickFunks = () => {
    setModalMessage("");
    setSuccessModalMessage("");
    if (!validateRN(roomName)) {
      setModalMessage("Invalid roomname, must input at least one character.");
      showModal();
    } else if (!roomGenre) {
      setModalMessage("Please select a genre from the dropdown menu.");
      showModal();
    } else if (!tosStatus) {
      setModalMessage("You must accept the terms for service.");
      showModal();
    } else {
      setSuccessModalMessage(
        "You have successfully created a room! Press ok to continue."
      );
      insertData();
      showModal();
    }
  };

  const confirmTos = () => {
    setTosStatus(!tosStatus);
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
    <div className="create-main">
      <Form
        {...formItemLayout}
        className="text-color"
        /*  style={{ marginTop: "150px", marginLeft: "400px" }} */
      >
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
          //rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select
            placeholder="Select genre"
            onChange={(value) => {
              setGenre(value);
            }}
          >
            <Option value="Rock">Rock</Option>
            <Option value="Pop">Pop</Option>
            <Option value="Classical">Classical</Option>
            <Option value="Country">Country</Option>
          </Select>
        </Form.Item>

        <Form.Item {...otherItemLayout}>
          <Checkbox onChange={confirmTos} className="text-color">
            {" "}
            Click here to accept our Terms of Service.
          </Checkbox>
        </Form.Item>

        <Form.Item {...otherItemLayout} style={{ marginBottom: "0px" }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onClickFunks()}
            className="sync-button-color"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Room Creation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>
          <strong>Room Name:</strong> {roomName}
        </p>
        <p>
          <strong>Genre:</strong> {roomGenre}
        </p>
        <p>{successModalMessage}</p>
        <p style={{ color: "red" }}>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default withRouter(Create);
