import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Menu, Dropdown, Image } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Axios from "axios";
import Cookies from "js-cookie";
import "../css/navbar.css";

const NavBar = (props) => {
  const history = useHistory();
  const onClick = ({ key }) => {
    if (`${key}` == 1) {
      deleteCurrentUser();
      history.push("/");
    }
    if (`${key}` == 2) {
      history.push("/banuser");
    }
    if (`${key}` == 3) {
      history.push("/deleteroom");
    }
  };

  const deleteCurrentUser = () => {
    localStorage.removeItem("currentUser");
    Cookies.remove("spotifyAuthToken");
  }

  const updateCurrentUser = (updateUserInfo) => {
    const stringUpdateUserInfo = JSON.stringify(updateUserInfo);
    localStorage.setItem("currentUser", stringUpdateUserInfo);
  };

  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);

    return retrieveUserInfo;
  };

    

  const [userInfo, setUserInfo] = useState(retrieveCurrentUser);

  var updateUser = userInfo;
  Axios.get("http://localhost:8000/api/users/")
          .then((res) => {
            res.data.map((getUser) => {
              if(getUser.user_id === updateUser.userId) {
                updateUser.administratorStatus = getUser.admin_status;
                updateUser.banStatus = getUser.ban_status;
                updateUser.banComment = getUser.ban_comments;
              }
            })
            setUserInfo(updateUser);
            updateCurrentUser(updateUser);
          })
          .catch((er) => console.log(er));

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Logout</Menu.Item>
      <Menu.Item key="2">Ban a User</Menu.Item>
      <Menu.Item key="3">Delete Rooms</Menu.Item>

    </Menu>
  );
  if (!userInfo) {
    return (
      <Redirect to="/"/>
    )
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="bg-dark-sync">
        {" "}
        {/*fixed="top" TOOK THIS OFF, WAS ADDING SCROLL TO PAGES WHEN NOT NEEDED*/}
        <Navbar.Brand href="/Home">
        <div className="user-picture-name">
          <Image
            src="/assets/logoImage2.png"
            href="/Home"
            style={{ width: "65px", marginRight: "10px" }}
            preview={false}
          />
          SYNC
          </div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Createpage">Create</Nav.Link>
          <Nav.Link href="/Join">Join</Nav.Link>
          <Nav.Link href="/Chatroom">Chat</Nav.Link>
          {/* <Nav.Link href="/Room">Room</Nav.Link>
          <Nav.Link href="/Contact">Contact us</Nav.Link>
          <Nav.Link href="/Aboutus">About us</Nav.Link> */}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <div className="user-picture-name">
                  {(userInfo.profilePictureUrl !== "none") && <Image
                    width={50}
                    src={userInfo.profilePictureUrl}
                    style={{ borderRadius: "25px"}}
                    preview={false}
                  />}
                  <div style={{marginLeft: "10px"}}>
                  {userInfo.displayName}({userInfo.product})
                  </div>
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
