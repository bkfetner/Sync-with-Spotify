import React, { Component, useState, setState, Link, useEffect } from "react";
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
  Card,
  Typography,
  Row,
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
      var data = {
        //user_id : userId,
        ban_comments : comment,
        ban_status : '1',
      }
      Axios.patch("http://localhost:8000/api/users/" + userId + "/", data)
        .then((res) => {
          console.log('banned')
        })
        .catch((er) => {
          {
          }
        });
    }
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showPopconfirm = () => {
        setVisible(true);
      };
    
      const handleOk = () => {
        setConfirmLoading(true);
        onClickFunks();
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };

      const [viewData, setViewData] = useState([]);
      const [userId, setUserId] = useState();
      const [comment, setComment] = useState();
  //const [userInfo, setUserInfo] = useState(retrieveCurrentUser);

  useEffect(() => {
    
        Axios.get("http://localhost:8000/api/users/")
          .then((res) => {
            console.log(res.data);
            setViewData(res.data);
          })
          .catch((er) => {
            console.log("get failed");
            console.log(er);
          });
     
  }, []);
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
                label="User Id"
                name="Userid"
                rules={[
                    {
                    required: true,
                    message: "Please input a user name.",
                    },
                ]}
                //rules={[{ required: true, message: "Please input your roomname!" }]}
                >
          <Input
            //placeholder="e.g. Bill's Room of Splendor"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
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
          
          <Input.TextArea
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
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
        <div className="spacer"></div>

        <div>
          <div class="main">
            <div
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className="home-top-text-block"
            >
              All Users
            </div>
          </div>
          <Row gutter={[40, 16]}>
            {viewData?.map((d, index) => (
              <Col className="gutter-row" span={6}>
                <Card
                  className="join_cards"
                  hoverable
                  bordered
                  style={{ width: "80%", marginLeft: "30px" }}
                 // cover={<img alt="example" src={d.roomImageUrl} />}
                >
                  <Row>
                    <Col xs={24} className="join_text">
                      User Id:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.user_id}
                      </Typography.Text>
                    </Col>

                    <Col xs={24} className="join_text">
                      User Name:
                      <Typography.Text
                        className="join_text"
                        style={{ float: "right" }}
                      >
                        {d.display_name}
                      </Typography.Text>
                    </Col>
                    
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    </div>
    
    );
}

export default Ban_User