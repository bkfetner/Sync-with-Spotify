import React, { Component, useState, setState, Link } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  message,
  Select,
  Radio,
  Col,
  Popup,
  Popover,
  Popconfirm,
} from "antd";
import Axios from "axios";
import "../css/banuser.css";

const Ban_User = () => {
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
    const onClickFunks = () => {

    }
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showPopconfirm = () => {
        setVisible(true);
      };
    
      const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };
    return (
        <div className="createpage-flex text-color">
      <div className="createpage-top-text-block">Ban a User!</div>
        <div className="create-main">
            <Form 
                {...formItemLayout}
                className="text-color"
            /*  style={{ marginTop: "150px", marginLeft: "400px" }} */
            >
                <Form.Item
                label="Username"
                name="Username"
                rules={[
                    {
                    required: true,
                    message: "Please input a user name.",
                    },
                ]}
                //rules={[{ required: true, message: "Please input your roomname!" }]}
                >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Comment"
          name="comment"
          rules={[
            {
              required: true,
              message: "Please add some comments on ban purpose.",
            },
          ]}
        //rules={[{ required: true, message: 'Province is required' }]}
        >
          
          <Input.TextArea/>
        </Form.Item>

    
        
        <Form.Item {...otherItemLayout} style={{ marginBottom: "0px" }}>
            <Popconfirm
            title="Are you sure you want to ban this user"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
             >
          <Button
            type="primary"
            htmlType="submit"
            /* href={"/Room/" + roomGenre + "/" + roomName} */
            onClick={showPopconfirm}
            className="sync-button-color"
          >
            Submit
          </Button>
          </Popconfirm>
        </Form.Item>
      </Form >
       
        </div>
    </div>
    );
}

export default Ban_User