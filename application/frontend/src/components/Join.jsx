import React, { Component, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col,Card, Typography } from "antd";
import Axios from "axios";
import {  } from "@material-ui/core";


const Join = () => {

  const [viewData,setViewData] = useState([]);
  const viewRooms = () => {
    
  };
  
  useEffect(() =>{
      
      Axios.get("http://localhost:8000/api/adds/")
      .then((res) => {
        console.log("hi");
        
        setViewData(res.data)
        
      })
      .catch((er) => console.log(er));
  },[])
  return (
    <div> 
      <div class="main">
        <h1 style={{ marginTop: "30px", marginBottom: "30px" }}>
         Recommended Rooms
        </h1>
      </div>
      <Row gutter={[40, 16]}>
      {  viewData?.map((d,index) => <Col xs={24} md={8}>
          <Card 
              title="Room Details" 
              extra={<a href="#"></a>} 
              hoverable
              bordered
              style={{ width: "90%" }}
          >
          <Row>
              <Col xs={24}>
                Id:<Typography.Title style={{float: "right"}} level={5}>{d.id}</Typography.Title>                                        
              </Col>
          
              <Col xs={24}>
                Room Name:<Typography.Text style={{float: "right"}} >{d.room_name}</Typography.Text>                                        
              </Col>
          
              <Col xs={24}>
                Genre:<Typography.Text style={{float: "right"}} >{d.genre}</Typography.Text>                                        
              </Col>
          </Row>
        </Card>
        
        </Col>)}

      </Row>
      
        

    </div>
  );
};

export default Join;
